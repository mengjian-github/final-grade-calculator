type AnalyticsValue = string | number | boolean;
type AnalyticsProperties = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, AnalyticsValue> }) => void;
    gtag?: (command: 'event', eventName: string, parameters?: Record<string, AnalyticsValue>) => void;
    clarity?: (command: 'event', eventName: string) => void;
  }
}

const REVIEW_BATCH = 'site-review-20260722-fullcycle';
const EVENT_SCHEMA_VERSION = '2';
const FUNNEL_RUN_STORAGE_KEY = 'fgc_funnel_run_id';

const EVENT_ALIASES: Record<string, string> = {
  start_calculator: 'tool_start',
  weighted_calculate: 'calculate_click',
  user_result: 'tool_result',
  user_result_view: 'tool_result',
  user_weighted_result_view: 'tool_result',
  default_result: 'calculator_default_view',
  default_result_view: 'calculator_default_view',
  default_weighted_result_view: 'calculator_default_view',
  result_view: 'calculator_default_view',
};

const FUNNEL_STAGE_BY_EVENT: Record<string, string> = {
  tool_start: 'start',
  calculate_click: 'confirm',
  tool_result: 'result',
  calculator_default_view: 'default_prefill',
  copy_result_click: 'copy_intent',
  copy_result: 'copy',
  share_result_click: 'share_intent',
  share_result: 'share',
  result_next_action_click: 'next_action',
  search_intent_click: 'intent_route',
  primary_calculator_cta_click: 'intent_route',
  sticky_calculator_cta_click: 'intent_route',
  open_weighted_calculator: 'intent_route',
  contact_click: 'contact',
};

const CANONICAL_FUNNEL_EVENTS = new Set([
  'tool_start',
  'calculate_click',
  'tool_result',
  'copy_result',
  'share_result',
  'result_next_action_click',
]);

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

function createEventId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getFunnelRunId() {
  if (typeof window === 'undefined') return 'unknown';

  try {
    const existing = window.sessionStorage.getItem(FUNNEL_RUN_STORAGE_KEY);
    if (existing) return existing;

    const created = createEventId();
    window.sessionStorage.setItem(FUNNEL_RUN_STORAGE_KEY, created);
    return created;
  } catch {
    return createEventId();
  }
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

function getDeviceType() {
  if (typeof window === 'undefined') return 'unknown';
  const width = window.innerWidth || document.documentElement.clientWidth || 0;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getReferrerHost() {
  if (typeof document === 'undefined' || !document.referrer) return 'direct';
  try {
    return new URL(document.referrer).hostname || 'direct';
  } catch {
    return 'unknown';
  }
}

function getTrafficSource() {
  if (typeof window === 'undefined') return 'unknown';
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  if (utmSource) return utmSource;

  const referrerHost = getReferrerHost();
  if (referrerHost === 'direct') return 'direct';
  if (referrerHost.includes('google.')) return 'google_organic_or_referral';
  if (referrerHost.includes('bing.')) return 'bing_organic_or_referral';
  return referrerHost;
}

export function getSourcePage() {
  if (typeof window === 'undefined') return 'unknown';
  return window.location.pathname || '/';
}

function dispatchAnalyticsEvent(eventName: string, eventProperties: Record<string, AnalyticsValue>) {
  if (typeof window === 'undefined') return;

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
  try {
    if (typeof window === 'undefined') return;

    const canonicalEventName = EVENT_ALIASES[eventName] || eventName;
    const funnelEligible = CANONICAL_FUNNEL_EVENTS.has(canonicalEventName);

    const eventProperties = cleanProperties({
      review_batch: REVIEW_BATCH,
      event_schema_version: EVENT_SCHEMA_VERSION,
      event_id: createEventId(),
      source_page: getSourcePage(),
      route_path: getSourcePage(),
      device_type: getDeviceType(),
      referrer_host: getReferrerHost(),
      traffic_source: getTrafficSource(),
      funnel_stage: FUNNEL_STAGE_BY_EVENT[canonicalEventName] || 'engagement',
      funnel_eligible: funnelEligible,
      funnel_run_id: funnelEligible ? getFunnelRunId() : undefined,
      source_event: canonicalEventName === eventName ? undefined : eventName,
      ...getUtmProperties(),
      ...properties,
    });

    dispatchAnalyticsEvent(canonicalEventName, eventProperties);
  } catch {
    // Track event failures must never block the calculator UI.
  }
}
