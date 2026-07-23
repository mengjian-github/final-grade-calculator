import assert from 'node:assert/strict';

const url = process.argv[2] || 'http://127.0.0.1:4173/';
const port = process.env.CDP_PORT || '9227';
const base = `http://127.0.0.1:${port}`;
const viewports = [
  { width: 390, height: 844, mobile: true },
  { width: 430, height: 932, mobile: true },
  { width: 1440, height: 1100, mobile: false },
];

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function inspectViewport(viewport) {
  const target = await fetch(`${base}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' }).then((response) => {
    assert.equal(response.ok, true, `unable to create Chrome target: ${response.status}`);
    return response.json();
  });

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  const pending = new Map();
  let nextId = 0;

  socket.addEventListener('message', (message) => {
    const payload = JSON.parse(message.data);
    if (!payload.id) return;
    const handler = pending.get(payload.id);
    if (!handler) return;
    pending.delete(payload.id);
    if (payload.error) handler.reject(new Error(payload.error.message));
    else handler.resolve(payload.result);
  });

  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });
  await send('Page.navigate', { url });
  await wait(1800);

  const evaluation = await send('Runtime.evaluate', {
    expression: `
      (async () => {
        const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
        const finalWeightLabel = [...document.querySelectorAll('label')]
          .find((label) => label.textContent.trim() === 'Final weight (%)');
        const finalWeightInput = finalWeightLabel?.parentElement?.querySelector('input[type="number"]');
        if (!finalWeightInput) throw new Error('Final weight input not found');

        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
        await wait(150);
        const bottomSticky = [...document.querySelectorAll('a')]
          .find((link) => link.textContent.trim() === 'Continue to calculator');
        const bottomStickyVisible = Boolean(
          bottomSticky && getComputedStyle(bottomSticky.parentElement).display !== 'none'
        );

        finalWeightInput.scrollIntoView({ block: 'center', behavior: 'instant' });
        await wait(150);

        const inputRect = finalWeightInput.getBoundingClientRect();
        const visibleSticky = [...document.querySelectorAll('a')]
          .find((link) => link.textContent.trim() === 'Continue to calculator');
        const stickyRect = visibleSticky?.parentElement?.getBoundingClientRect() || null;
        const overlap = Boolean(
          stickyRect && inputRect.bottom > stickyRect.top && inputRect.top < stickyRect.bottom
        );
        const pointTarget = document.elementFromPoint(
          inputRect.left + inputRect.width / 2,
          inputRect.top + inputRect.height / 2
        );

        return {
          bottomStickyVisible,
          inputTop: Math.round(inputRect.top),
          inputBottom: Math.round(inputRect.bottom),
          stickyVisibleAtInput: Boolean(
            visibleSticky && getComputedStyle(visibleSticky.parentElement).display !== 'none'
          ),
          overlap,
          inputHitTarget: pointTarget === finalWeightInput || finalWeightInput.contains(pointTarget),
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      })()
    `,
    awaitPromise: true,
    returnByValue: true,
  });

  if (evaluation.exceptionDetails) {
    throw new Error(evaluation.exceptionDetails.exception?.description || evaluation.exceptionDetails.text);
  }

  socket.close();
  await fetch(`${base}/json/close/${target.id}`).catch(() => undefined);
  return evaluation.result.value;
}

const results = [];
for (const viewport of viewports) {
  const result = await inspectViewport(viewport);
  assert.equal(result.overlap, false, `${viewport.width}x${viewport.height}: sticky CTA overlaps Final weight input`);
  assert.equal(result.stickyVisibleAtInput, false, `${viewport.width}x${viewport.height}: sticky CTA must hide while calculator is visible`);
  assert.equal(result.inputHitTarget, true, `${viewport.width}x${viewport.height}: Final weight input is not hit-testable`);
  assert.equal(result.horizontalOverflow, false, `${viewport.width}x${viewport.height}: horizontal overflow detected`);
  if (viewport.mobile) {
    assert.equal(result.bottomStickyVisible, true, `${viewport.width}x${viewport.height}: continuation CTA should appear below calculator`);
  }
  results.push({ viewport: `${viewport.width}x${viewport.height}`, ...result });
}

console.log(`OK: responsive calculator smoke; ${results.map((result) => `${result.viewport}:input=${result.inputTop}-${result.inputBottom},overlap=${result.overlap},sticky_at_input=${result.stickyVisibleAtInput}`).join('; ')}`);
