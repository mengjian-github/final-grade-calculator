type AnalyticsValue = string | number | boolean;
type AnalyticsProperties = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, AnalyticsValue> }) => void;
    gtag?: (command: 'event', eventName: string, parameters?: Record<string, AnalyticsValue>) => void;
    clarity?: (command: 'event', eventName: string) => void;
  }
}

const REVIEW_BATCH = 'site-review-20260705-fullcycle';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

function cleanProperties(properties: AnalyticsProperties = {}) {
  const cleaned: Record<string, AnalyticsValue> = {};

  Object.entries(properties).forEach(([key, value]) => {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  });

  return cleaned;
}

function getUtmProperties() {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return UTM_KEYS.reduce<Record<string, string>>((acc, key) => {
    const value = params.get(key);
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export function getSourcePage() {
  if (typeof window === 'undefined') return 'unknown';
  return window.location.pathname || '/';
}

function dispatchAnalyticsEvent(eventName: string, eventProperties: Record<string, AnalyticsValue>) {
  if (window.gtag) {
    try {
      window.gtag('event', eventName, eventProperties);
    } catch {
      // Analytics failures must never interrupt calculator interactions.
    }
  }

  if (window.plausible) {
    try {
      window.plausible(eventName, { props: eventProperties });
    } catch {
      // Keep existing Plausible behavior best-effort while preserving GA4 dispatch.
    }
  }

  if (window.clarity) {
    try {
      window.clarity('event', eventName);
    } catch {
      // Clarity custom events are best-effort and must not affect the calculator.
    }
  }
}

export function trackEvent(eventName: string, properties?: AnalyticsProperties) {
  if (typeof window === 'undefined') return;

  const eventProperties = cleanProperties({
    review_batch: REVIEW_BATCH,
    source_page: getSourcePage(),
    ...getUtmProperties(),
    ...properties,
  });

  dispatchAnalyticsEvent(eventName, eventProperties);

  if (eventName === 'start_calculator') {
    dispatchAnalyticsEvent('tool_start', {
      ...eventProperties,
      canonical_event: eventName,
    });
  }

  if (eventName === 'user_result' || eventName === 'default_result') {
    dispatchAnalyticsEvent('tool_result', {
      ...eventProperties,
      canonical_event: eventName,
      result_origin: eventName === 'default_result' ? 'default_prefill' : 'user_input',
    });
  }
}
