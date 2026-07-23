import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8');

const [contractRaw, analytics, finalCalculator, weightedCalculator, stickyCalculatorCta] = await Promise.all([
  read('public/analytics-event-contract.json'),
  read('lib/analytics.ts'),
  read('components/FinalGradeCalculator.tsx'),
  read('components/WeightedGradeCalculator.tsx'),
  read('components/StickyCalculatorCta.tsx'),
]);

const contract = JSON.parse(contractRaw);
const expectedBatch = 'site-review-20260723-fullcycle';
const expectedCanonicalEvents = [
  'tool_start',
  'tool_result',
  'copy_result',
  'share_result',
  'result_next_action_click',
];
const expectedPrimarySequence = [
  'tool_start',
  'tool_result',
  'result_next_action_click',
];

assert.equal(contract.schema_version, 'analytics_event_contract.v3');
assert.equal(contract.review_batch, expectedBatch);
assert.deepEqual(contract.canonical_funnel_events, expectedCanonicalEvents);
assert.deepEqual(contract.primary_funnel_sequence, expectedPrimarySequence);
assert.match(analytics, new RegExp(`REVIEW_BATCH = '${expectedBatch}'`));
assert.match(analytics, /EVENT_SCHEMA_VERSION = '3'/);

for (const forbidden of [
  'startEngagementTimer',
  'CONVERSION_GOAL_EVENTS',
  "dispatchAnalyticsEvent('tool_start'",
  "dispatchAnalyticsEvent('tool_result'",
  "dispatchAnalyticsEvent('conversion_goal'",
]) {
  assert.equal(analytics.includes(forbidden), false, `legacy amplification remains: ${forbidden}`);
}

for (const [file, source] of [
  ['components/FinalGradeCalculator.tsx', finalCalculator],
  ['components/WeightedGradeCalculator.tsx', weightedCalculator],
]) {
  for (const legacyEvent of [
    "trackEvent('start_calculator'",
    "trackEvent('weighted_calculate'",
    "trackEvent('default_result'",
    "trackEvent('user_result'",
    "trackEvent('result_view'",
    "trackEvent('default_result_view'",
    "trackEvent('user_result_view'",
    "trackEvent('default_weighted_result_view'",
    "trackEvent('user_weighted_result_view'",
  ]) {
    assert.equal(source.includes(legacyEvent), false, `${file} emits legacy event: ${legacyEvent}`);
  }

  for (const canonicalEvent of ["'tool_start'", "'calculate_click'", "'tool_result'"]) {
    assert.equal(source.includes(canonicalEvent), true, `${file} is missing canonical event: ${canonicalEvent}`);
  }
}

assert.equal(contract.excluded_from_funnel.includes('calculator_default_view'), true);
assert.equal(contract.excluded_from_funnel.includes('calculate_click'), true);
assert.equal(contract.excluded_from_funnel.includes('engagement_time_seconds'), true);
assert.equal(contract.always_present_dimensions.includes('event_id'), true);
assert.equal(contract.optional_dimensions.includes('funnel_run_id'), true);
assert.equal(contract.counting_rules.explicit_confirmation.includes('diagnostic'), true);
assert.equal(stickyCalculatorCta.includes('IntersectionObserver'), true);
assert.equal(stickyCalculatorCta.includes('Continue to calculator'), true);
assert.equal(stickyCalculatorCta.includes('Calculate my final grade'), false);

console.log(`OK: analytics ${contract.schema_version}; batch=${contract.review_batch}; canonical=${expectedCanonicalEvents.length}; default/timer/alias amplification excluded`);
