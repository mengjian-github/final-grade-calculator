import assert from 'node:assert/strict';

const url = process.argv[2] || 'http://127.0.0.1:4173/';
const port = process.env.CDP_PORT || '9227';
const base = `http://127.0.0.1:${port}`;

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
await send('Page.navigate', { url });
await new Promise((resolve) => setTimeout(resolve, 1500));

const expression = `
(async () => {
  window.__analyticsSmokeEvents = [];
  window.gtag = (command, eventName, properties) => {
    if (command === 'event') window.__analyticsSmokeEvents.push({ channel: 'ga4', eventName, properties });
  };
  window.plausible = (eventName, options) => {
    window.__analyticsSmokeEvents.push({ channel: 'plausible', eventName, properties: options?.props || {} });
  };
  window.clarity = () => {};

  const input = document.querySelector('input[type="number"]');
  if (!input) throw new Error('current grade input not found');
  const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  valueSetter.call(input, '87');
  input.dispatchEvent(new Event('input', { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const calculate = [...document.querySelectorAll('button')].find((button) => button.textContent.trim() === 'Calculate');
  if (!calculate) throw new Error('Calculate button not found');
  calculate.click();
  await new Promise((resolve) => setTimeout(resolve, 300));

  const copyResult = [...document.querySelectorAll('button')].find((button) => button.textContent.trim() === 'Copy result');
  if (!copyResult) throw new Error('Copy result button not found');
  copyResult.click();
  await new Promise((resolve) => setTimeout(resolve, 200));

  return window.__analyticsSmokeEvents;
})()
`;

const evaluation = await send('Runtime.evaluate', {
  expression,
  awaitPromise: true,
  returnByValue: true,
});

if (evaluation.exceptionDetails) {
  throw new Error(evaluation.exceptionDetails.exception?.description || evaluation.exceptionDetails.text);
}

const events = evaluation.result.value;
for (const channel of ['ga4', 'plausible']) {
  const channelEvents = events.filter((event) => event.channel === channel);
  const count = (eventName) => channelEvents.filter((event) => event.eventName === eventName).length;

  assert.equal(count('tool_start'), 1, `${channel}: expected one tool_start`);
  assert.equal(count('tool_result'), 1, `${channel}: expected one tool_result`);
  assert.equal(count('calculate_click'), 1, `${channel}: expected one calculate_click`);
  assert.equal(count('result_next_action_click'), 1, `${channel}: expected one result_next_action_click`);

  for (const forbidden of [
    'start_calculator',
    'user_result',
    'default_result',
    'conversion_goal',
    'engagement_time_seconds',
  ]) {
    assert.equal(count(forbidden), 0, `${channel}: legacy/amplified event emitted: ${forbidden}`);
  }

  const runScopedEvents = channelEvents.filter((event) => ['tool_start', 'tool_result', 'calculate_click', 'result_next_action_click'].includes(event.eventName));
  const runIds = new Set(runScopedEvents.map((event) => event.properties.funnel_run_id));
  assert.equal(runIds.size, 1, `${channel}: run-scoped events must share one funnel_run_id`);
  assert.equal([...runIds][0].length > 8, true, `${channel}: funnel_run_id missing`);
  for (const event of runScopedEvents) {
    assert.equal(event.properties.review_batch, 'site-review-20260723-fullcycle');
    assert.equal(typeof event.properties.event_id, 'string');
  }

  assert.equal(
    channelEvents.find((event) => event.eventName === 'calculate_click').properties.funnel_eligible,
    false,
    `${channel}: calculate_click must remain diagnostic`
  );

  const canonicalSequence = channelEvents
    .filter((event) => ['tool_start', 'tool_result', 'result_next_action_click'].includes(event.eventName))
    .map((event) => event.eventName);
  assert.deepEqual(
    canonicalSequence,
    ['tool_start', 'tool_result', 'result_next_action_click'],
    `${channel}: canonical funnel order mismatch`
  );
}

socket.close();
console.log(`OK: browser analytics smoke; channels=2; events=${events.length}; canonical sequence tool_start/tool_result/result_next_action_click; calculate_click diagnostic`);
