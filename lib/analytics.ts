type AnalyticsValue = string | number | boolean;
type AnalyticsProperties = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, AnalyticsValue> }) => void;
    gtag?: (command: 'event', eventName: string, parameters?: Record<string, AnalyticsValue>) => void;
  }
}

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

export function trackEvent(eventName: string, properties?: AnalyticsProperties) {
  if (typeof window === 'undefined') return;

  const eventProperties = cleanProperties({
    source_page: getSourcePage(),
    ...getUtmProperties(),
    ...properties,
  });

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
}
