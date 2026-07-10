type AnalyticsValue = string | number | boolean;
type AnalyticsProperties = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, AnalyticsValue> }) => void;
    gtag?: (command: 'event', eventName: string, parameters?: Record<string, AnalyticsValue>) => void;
    clarity?: (command: 'event', eventName: string) => void;
  }
}

const REVIEW_BATCH = 'site-review-20260710-fullcycle';

const FUNNEL_STAGE_BY_EVENT: Record<string, string> = {
  start_calculator: 'start',
  tool_start: 'start',
  calculate_click: 'confirm',
  weighted_calculate: 'confirm',
  default_result: 'result',
  user_result: 'result',
  default_result_view: 'result',
  user_result_view: 'result',
  result_view: 'result',
  default_weighted_result_view: 'result',
  user_weighted_result_view: 'result',
  tool_result: 'result',
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

const CONVERSION_GOAL_EVENTS: Record<string, string> = {
  calculate_click: 'calculator_confirmed',
  quick_action_click: 'calculator_prefilled',
  copy_result: 'result_saved',
  copy_result_click: 'result_copy_intent',
  share_result: 'result_shared',
  share_result_click: 'result_share_intent',
  result_next_action_click: 'result_next_step',
  contact_click: 'contact_intent',
  sticky_calculator_cta_click: 'calculator_intent',
  open_weighted_calculator: 'calculator_deepening',
  search_intent_click: 'search_intent_routed',
  primary_calculator_cta_click: 'calculator_intent',
  converter_type_change: 'calculator_deepening',
  converter_input_change: 'calculator_deepening',
  weighted_calculate: 'calculator_confirmed',
};

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

const ENGAGEMENT_MARKS = [10, 30, 60, 120, 180, 300];

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

function startEngagementTimer() {
  if (typeof window === 'undefined') return;
  const marks = new Set<number>();
  let elapsed = 0;
  const interval = window.setInterval(() => {
    elapsed += 1;
    ENGAGEMENT_MARKS.forEach((mark) => {
      if (elapsed >= mark && !marks.has(mark)) {
        marks.add(mark);
        try {
          dispatchAnalyticsEvent('engagement_time_seconds', {
            review_batch: REVIEW_BATCH,
            source_page: getSourcePage(),
            route_path: getSourcePage(),
            device_type: getDeviceType(),
            referrer_host: getReferrerHost(),
            traffic_source: getTrafficSource(),
            funnel_stage: 'engagement',
            seconds: mark,
          });
        } catch {
          // Ignore engagement timer failures.
        }
      }
    });
  }, 1000);
  return interval;
}

export function trackEvent(eventName: string, properties?: AnalyticsProperties) {
  try {
    if (typeof window === 'undefined') return;

    const eventProperties = cleanProperties({
      review_batch: REVIEW_BATCH,
      source_page: getSourcePage(),
      route_path: getSourcePage(),
      device_type: getDeviceType(),
      referrer_host: getReferrerHost(),
      traffic_source: getTrafficSource(),
      funnel_stage: FUNNEL_STAGE_BY_EVENT[eventName] || 'engagement',
      ...getUtmProperties(),
      ...properties,
    });

    dispatchAnalyticsEvent(eventName, eventProperties);

    if (eventName === 'start_calculator') {
      dispatchAnalyticsEvent('tool_start', {
        ...eventProperties,
        canonical_event: eventName,
        funnel_stage: 'start',
      });
    }

    if (eventName === 'user_result' || eventName === 'default_result') {
      dispatchAnalyticsEvent('tool_result', {
        ...eventProperties,
        canonical_event: eventName,
        funnel_stage: 'result',
        result_origin: eventName === 'default_result' ? 'default_prefill' : 'user_input',
      });
    }

    const goalType = CONVERSION_GOAL_EVENTS[eventName];
    if (goalType) {
      dispatchAnalyticsEvent('conversion_goal', {
        ...eventProperties,
        canonical_event: eventName,
        goal_type: goalType,
      });
    }
  } catch {
    // Track event failures must never block the calculator UI.
  }
}

if (typeof window !== 'undefined') {
  startEngagementTimer();
}
