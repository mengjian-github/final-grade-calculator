'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import {
  calculateNeededGrade,
  calculateFinalGrade,
  getGradeSuggestion,
  isValidPercentage,
  percentageToLetter,
} from '@/lib/gradeCalculations';
import { Calculator, TrendingUp, Award, AlertCircle, Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const FinalGradeChart = dynamic(() => import('./FinalGradeChart'), { ssr: false });

const suggestionToneStyles: Record<
  string,
  { icon: string; border: string; background: string }
> = {
  'text-success': {
    icon: 'text-success',
    border: 'border-success',
    background: 'bg-success/10 dark:bg-success/20',
  },
  'text-warning': {
    icon: 'text-warning',
    border: 'border-warning',
    background: 'bg-warning/10 dark:bg-warning/20',
  },
  'text-error': {
    icon: 'text-error',
    border: 'border-error',
    background: 'bg-error/10 dark:bg-error/20',
  },
};

const getFinalGradeResultState = (mode: 'needed' | 'predict', result: number) => {
  if (mode === 'predict') return 'predict';
  if (result < 0) return 'already_achieved';
  if (result <= 100) return 'achievable';
  return 'unachievable';
};

const quickActions = [
  {
    id: 'need-a-minus',
    label: 'I need an A- (90%)',
    currentGrade: '82',
    desiredGrade: '88',
    finalWeight: '25',
  },
  {
    id: 'need-to-pass',
    label: 'I just need to pass (70%)',
    currentGrade: '64',
    desiredGrade: '70',
    finalWeight: '25',
  },
  {
    id: 'final-worth-40',
    label: 'My final is worth 40%',
    currentGrade: '78',
    desiredGrade: '85',
    finalWeight: '40',
  },
  {
    id: 'extra-credit-check',
    label: 'Check impossible / extra credit',
    currentGrade: '85',
    desiredGrade: '90',
    finalWeight: '30',
  },
];

type QuickAction = (typeof quickActions)[number];

export default function FinalGradeCalculatorComponent() {
  const [currentGrade, setCurrentGrade] = useState<string>('86');
  const [desiredGrade, setDesiredGrade] = useState<string>('88');
  const [finalWeight, setFinalWeight] = useState<string>('25');
  const [mode, setMode] = useState<'needed' | 'predict'>('needed');
  const [finalExamGrade, setFinalExamGrade] = useState<string>('');

  const [result, setResult] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [calculationStatus, setCalculationStatus] = useState<string>(
    'Live result is already updated for the default 86 / 88 / 25 example.'
  );
  const resultRef = useRef<HTMLDivElement>(null);
  const hasTrackedStart = useRef(false);
  const lastResultSignature = useRef<string | null>(null);
  const lastUserResultSignature = useRef<string | null>(null);

  const getResultEventSource = () => (hasTrackedStart.current ? 'user_input' : 'default_auto');

  const buildResultSignature = (resultValue: number) => [
    mode,
    currentGrade,
    desiredGrade,
    finalWeight,
    finalExamGrade,
    resultValue.toFixed(2),
  ].join('|');

  const trackStartCalculator = (inputMode: 'needed' | 'predict' = mode, source = 'input_change') => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent('tool_start', {
      calculator_type: 'final_grade',
      input_mode: inputMode,
      result_state: result === null ? 'invalid' : getFinalGradeResultState(inputMode, result),
      source,
    });
  };

  const updateField = (setter: (value: string) => void, value: string) => {
    trackStartCalculator(mode, 'input_change');
    setter(value);
  };

  const updateMode = (nextMode: 'needed' | 'predict') => {
    trackStartCalculator(nextMode, 'mode_switch');
    setMode(nextMode);
  };

  useEffect(() => {
    const current = parseFloat(currentGrade);
    const desired = parseFloat(desiredGrade);
    const weight = parseFloat(finalWeight);
    const finalGrade = parseFloat(finalExamGrade);

    if (mode === 'needed') {
      if (
        isValidPercentage(current) &&
        isValidPercentage(desired) &&
        weight >= 0 &&
        weight <= 100
      ) {
        const needed = calculateNeededGrade(current, desired, weight);
        setResult(needed);
        setCalculationStatus(
          needed > 100
            ? `Updated: you need ${needed.toFixed(2)}%, so this target requires extra credit or a lower goal.`
            : `Updated: you need ${needed.toFixed(2)}% on the final exam.`
        );

        // Generate chart data
        const data = [];
        for (let i = 0; i <= 100; i += 5) {
          const finalGrade = calculateFinalGrade(current, i, weight);
          data.push({
            finalExam: i,
            finalGrade: finalGrade,
          });
        }
        setChartData(data);
      } else {
        setResult(null);
        setChartData([]);
        setCalculationStatus('Enter a current grade, target grade, and final weight from 0 to 100 to calculate.');
      }
    } else {
      if (
        isValidPercentage(current) &&
        isValidPercentage(finalGrade) &&
        weight >= 0 &&
        weight <= 100
      ) {
        const final = calculateFinalGrade(current, finalGrade, weight);
        setResult(final);
        setCalculationStatus(`Updated: your projected course grade is ${final.toFixed(2)}%.`);
      } else {
        setResult(null);
        setCalculationStatus('Enter a current grade, final exam score, and final weight from 0 to 100 to predict.');
      }
    }
  }, [currentGrade, desiredGrade, finalWeight, finalExamGrade, mode]);

  useEffect(() => {
    if (result === null || !Number.isFinite(result)) return;

    const signature = buildResultSignature(result);

    const timer = window.setTimeout(() => {
      if (lastResultSignature.current === signature) return;
      lastResultSignature.current = signature;
      const source = getResultEventSource();

      const resultPayload = {
        calculator_type: 'final_grade',
        input_mode: mode,
        result_state: getFinalGradeResultState(mode, result),
        result_value: Number(result.toFixed(2)),
        source,
      };

      if (source === 'default_auto') {
        trackEvent('calculator_default_view', {
          ...resultPayload,
          result_origin: 'default_prefill',
        });
        return;
      }

      if (lastUserResultSignature.current === signature) return;
      lastUserResultSignature.current = signature;
      trackEvent('tool_result', {
        ...resultPayload,
        result_origin: 'user_input',
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [currentGrade, desiredGrade, finalWeight, finalExamGrade, mode, result]);

  const suggestion =
    mode === 'needed' && result !== null ? getGradeSuggestion(result) : null;

  const getResultStatus = (result: number, mode: 'needed' | 'predict'): 'achievable' | 'stretch' | 'impossible' | 'predict' => {
    if (mode === 'predict') return 'predict';
    if (result < 0) return 'achievable';
    if (result <= 60) return 'achievable';
    if (result <= 100) return 'stretch';
    return 'impossible';
  };

  const statusConfig: Record<string, { badge: string; badgeColor: string; bg: string; border: string; icon: string; headline: string; cta: string; actionType: string }> = {
    achievable: {
      badge: 'Achievable',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: 'text-emerald-500',
      headline: 'Target is within reach',
      cta: 'Copy result & plan study time',
      actionType: 'plan_study',
    },
    stretch: {
      badge: 'Stretch',
      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'text-amber-500',
      headline: 'High effort needed',
      cta: 'Explore weighted scenarios',
      actionType: 'explore_weighted',
    },
    impossible: {
      badge: 'Impossible',
      badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-500',
      headline: 'Target not reachable',
      cta: 'Adjust target or check extra credit',
      actionType: 'adjust_target',
    },
    predict: {
      badge: 'Projected',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-500',
      headline: 'Your projected course grade',
      cta: 'Copy result & compare with target',
      actionType: 'compare_target',
    },
  };

  const trackManualCalculation = () => {
    trackStartCalculator(mode, 'manual_cta');

    if (result === null) {
      trackEvent('calculate_click', {
        calculator_type: 'final_grade',
        input_mode: mode,
        result_state: 'invalid',
        source: 'manual_cta',
      });
      return;
    }

    trackEvent('calculate_click', {
      calculator_type: 'final_grade',
      input_mode: mode,
      result_state: getFinalGradeResultState(mode, result),
      source: 'manual_cta',
    });

    const signature = buildResultSignature(result);
    if (lastUserResultSignature.current !== signature) {
      lastUserResultSignature.current = signature;
      trackEvent('tool_result', {
        calculator_type: 'final_grade',
        input_mode: mode,
        result_state: getFinalGradeResultState(mode, result),
        result_value: Number(result.toFixed(2)),
        result_origin: 'manual_confirmation',
        source: 'manual_cta',
      });
    }

    setCalculationStatus(
      mode === 'needed'
        ? result > 100
          ? `Confirmed: ${result.toFixed(2)}% is the correct needed score, and it is above 100%.`
          : `Confirmed: ${result.toFixed(2)}% is the needed final exam score.`
        : `Confirmed: ${result.toFixed(2)}% is the projected final course grade.`
    );

    // Mobile scroll-to-result: ensure result is visible after manual calculate
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const trackNextAction = (actionType: string, target?: string) => {
    if (result === null) return;
    trackEvent('result_next_action_click', {
      calculator_type: 'final_grade',
      input_mode: mode,
      result_state: getFinalGradeResultState(mode, result),
      result_value: Number(result.toFixed(2)),
      action_type: actionType,
      target: target || 'inline',
      source: getResultEventSource(),
    });
  };

  const copyResult = async () => {
    if (result === null) return;

    const status = getResultStatus(result, mode);
    const isAchievable = mode === 'needed' ? result <= 100 : true;
    const nextStep = mode === 'needed'
      ? result > 100
        ? 'Target may need extra credit or a lower goal.'
        : 'Focus your study time on reaching this score.'
      : 'Compare with your target and adjust if needed.';

    const text =
      mode === 'needed'
        ? `Final Grade Calculator
Current grade: ${currentGrade}%
Target grade: ${desiredGrade}%
Final weight: ${finalWeight}%
Result: I need ${result.toFixed(2)}% on the final exam.
Status: ${statusConfig[status].badge}
Achievable: ${isAchievable ? 'Yes' : 'No'}
Next step: ${nextStep}
https://finalgradecalculator.app`
        : `Final Grade Calculator
Current grade: ${currentGrade}%
Final exam score: ${finalExamGrade || '—'}%
Final weight: ${finalWeight}%
Result: My projected final course grade is ${result.toFixed(2)}%.
Status: ${statusConfig[status].badge}
Next step: ${nextStep}
https://finalgradecalculator.app`;

    trackEvent('copy_result_click', {
      calculator_type: 'final_grade',
      input_mode: mode,
      result_state: getFinalGradeResultState(mode, result),
      result_value: Number(result.toFixed(2)),
      source: getResultEventSource(),
    });

    try {
      await navigator.clipboard.writeText(text);
      setCalculationStatus('Copied result to clipboard.');
      trackEvent('copy_result', {
        calculator_type: 'final_grade',
        input_mode: mode,
        result_state: getFinalGradeResultState(mode, result),
        result_value: Number(result.toFixed(2)),
        source: getResultEventSource(),
      });
    } catch {
      setCalculationStatus('Copy failed. You can still select the result text manually.');
    }
  };

  const getShareText = () => {
    if (result === null) return '';

    return mode === 'needed'
      ? `I need ${result.toFixed(2)}% on my final exam to finish with ${desiredGrade}%.`
      : `My projected final course grade is ${result.toFixed(2)}%.`;
  };

  const shareResult = async () => {
    if (result === null) return;

    const shareText = getShareText();
    trackEvent('share_result_click', {
      calculator_type: 'final_grade',
      input_mode: mode,
      result_state: getFinalGradeResultState(mode, result),
      result_value: Number(result.toFixed(2)),
      source: getResultEventSource(),
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Final Grade Calculator result',
          text: shareText,
          url: 'https://finalgradecalculator.app/',
        });
        setCalculationStatus('Shared result successfully.');
        trackEvent('share_result', {
          calculator_type: 'final_grade',
          input_mode: mode,
          result_state: getFinalGradeResultState(mode, result),
          result_value: Number(result.toFixed(2)),
          source: 'native_share',
        });
        return;
      } catch {
        // Fall back to clipboard below when native share is cancelled or unavailable.
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText} https://finalgradecalculator.app/`);
      setCalculationStatus('Share text copied to clipboard.');
      trackEvent('share_result', {
        calculator_type: 'final_grade',
        input_mode: mode,
        result_state: getFinalGradeResultState(mode, result),
        result_value: Number(result.toFixed(2)),
        source: 'clipboard_fallback',
      });
    } catch {
      setCalculationStatus('Share failed. You can still copy the result manually.');
    }
  };

  const applyQuickAction = (action: QuickAction) => {
    setMode('needed');
    setCurrentGrade(action.currentGrade);
    setDesiredGrade(action.desiredGrade);
    setFinalWeight(action.finalWeight);
    setFinalExamGrade('');
    trackStartCalculator('needed', 'quick_action');
    trackEvent('quick_action_click', {
      calculator_type: 'final_grade',
      quick_action_id: action.id,
      current_grade: action.currentGrade,
      desired_grade: action.desiredGrade,
      final_weight: action.finalWeight,
    });
    setCalculationStatus(`Loaded: ${action.label}. The result updates automatically.`);
  };

  return (
    <div className="mx-auto w-full max-w-5xl min-w-0 overflow-hidden">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        {/* Mode Toggle */}
        <div className="mb-5 grid grid-cols-2 gap-2 sm:gap-3">
          <button
            onClick={() => updateMode('needed')}
            className={`min-w-0 rounded-lg px-2 py-3 text-xs font-medium transition-all sm:px-6 sm:text-base ${
              mode === 'needed'
                ? 'bg-primary text-white shadow-lg ring-2 ring-primary/20'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <div className="flex min-w-0 items-center justify-center gap-1 sm:gap-2">
              <Calculator className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              <span className="truncate sm:whitespace-normal">What Do I Need?</span>
            </div>
          </button>
          <button
            onClick={() => updateMode('predict')}
            className={`min-w-0 rounded-lg px-2 py-3 text-xs font-medium transition-all sm:px-6 sm:text-base ${
              mode === 'predict'
                ? 'bg-primary text-white shadow-lg ring-2 ring-primary/20'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <div className="flex min-w-0 items-center justify-center gap-1 sm:gap-2">
              <TrendingUp className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              <span className="truncate sm:whitespace-normal">Predict My Grade</span>
            </div>
          </button>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current grade (%)
            </label>
            <input
              type="number"
              value={currentGrade}
              onChange={(e) => updateField(setCurrentGrade, e.target.value)}
              min="0"
              max="100"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder="85"
            />
            <p className="mt-1 hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
              Enter the exact value shown in your gradebook (usually truncated to two decimals). Letter grade:{' '}
              {percentageToLetter(parseFloat(currentGrade) || 0)}
            </p>
          </div>

          {mode === 'needed' ? (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target grade (%)
              </label>
              <input
                type="number"
                value={desiredGrade}
                onChange={(e) => updateField(setDesiredGrade, e.target.value)}
                min="0"
                max="100"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="90"
              />
              <p className="mt-1 hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
                Target: {percentageToLetter(parseFloat(desiredGrade) || 0)}
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Final exam score (%)
              </label>
              <input
                type="number"
                value={finalExamGrade}
                onChange={(e) => updateField(setFinalExamGrade, e.target.value)}
                min="0"
                max="100"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="88"
              />
              <p className="mt-1 hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
                Score: {percentageToLetter(parseFloat(finalExamGrade) || 0)}
              </p>
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Final weight (%)
            </label>
            <input
              type="number"
              value={finalWeight}
              onChange={(e) => updateField(setFinalWeight, e.target.value)}
              min="0"
              max="100"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder="30"
            />
            <input
              type="range"
              value={finalWeight}
              onChange={(e) => updateField(setFinalWeight, e.target.value)}
              min="0"
              max="100"
              step="1"
              className="w-full mt-2"
            />
            <p className="mt-1 hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
              Input 30 if your syllabus says the final is 30% (no decimal conversion needed). Current work weight:{' '}
              {isNaN(parseFloat(finalWeight)) ? '—' : 100 - parseFloat(finalWeight)}%
            </p>
            <p className="mt-1 hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
              Need to drop lowest quizzes or treat missing work as zero? Use the{' '}
              <Link
                href="/weighted-grade-calculator/"
                onClick={() => trackEvent('open_weighted_calculator', { source: 'input_hint', calculator_type: 'final_grade' })}
                className="text-primary hover:text-primary-dark"
              >
                weighted calculator
              </Link>{' '}
              for full category control.
            </p>
          </div>
        </div>

        <div className="mb-4 flex justify-center sm:mb-6">
          <button
            type="button"
            onClick={trackManualCalculation}
            disabled={result === null}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Calculator className="h-4 w-4" />
            Calculate
          </button>
        </div>

        {result !== null && (
          <div
            aria-live="polite"
            className="mb-4 rounded-2xl border border-primary/30 bg-white p-4 shadow-lg shadow-primary/10 dark:border-primary-light/30 dark:bg-gray-900 sm:hidden"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
              Live answer
            </p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <div>
                <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                  {result.toFixed(2)}%
                </p>
                <p className="mt-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {mode === 'needed' ? 'needed on the final' : 'projected course grade'}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:bg-primary-light/20 dark:text-primary-light">
                {getResultStatus(result, mode) === 'impossible' ? 'Extra credit' : getResultStatus(result, mode)}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
              {mode === 'needed'
                ? result > 100
                  ? 'This target is above 100%; lower the goal or add extra credit.'
                  : `You need ${result.toFixed(2)}% on the final exam.`
                : `Your projected course grade is ${result.toFixed(2)}%.`}
            </p>
          </div>
        )}

        <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-left dark:border-primary-light/30 dark:bg-primary/10" id="quick-actions">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
            Quick student questions
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => applyQuickAction(action)}
                className="rounded-xl border border-primary/20 bg-white px-3 py-2 text-left text-sm font-semibold text-gray-800 transition hover:border-primary hover:bg-primary/10 dark:border-primary-light/30 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-primary-light"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div
          aria-live="polite"
          className="mb-8 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-gray-800 dark:border-primary-light/30 dark:bg-primary/10 dark:text-gray-100"
        >
          {calculationStatus}
        </div>

        {/* Result Display */}
        {result !== null && (
          <div ref={resultRef} className="mb-8">
            {(() => {
              const status = getResultStatus(result, mode);
              const cfg = statusConfig[status];
              return (
                <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-5 sm:p-6`}>
                  {/* Status badge + headline */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${cfg.badgeColor}`}>
                      {cfg.badge}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {cfg.headline}
                    </h3>
                  </div>

                  {/* Required score first */}
                  <div className="text-center mb-4">
                    <div className="break-words text-4xl font-black text-gray-900 dark:text-white mb-1 sm:text-6xl">
                      {result.toFixed(2)}%
                    </div>
                    <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                      {mode === 'needed' ? 'Required on final exam' : 'Projected course grade'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Letter equivalent: {percentageToLetter(result)}
                    </div>
                  </div>

                  {/* One-line interpretation */}
                  {suggestion && mode === 'needed' && (
                    <p className="text-sm text-center text-gray-700 dark:text-gray-200 mb-4">
                      {suggestion.message}
                    </p>
                  )}

                  <div className="mb-4 rounded-xl border border-white/70 bg-white/70 p-3 text-center text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-950/40 dark:text-gray-200">
                    {mode === 'needed' ? (
                      <span>
                        Formula used: ({desiredGrade} − {currentGrade} × (1 − {finalWeight}%)) ÷ {finalWeight}% ={' '}
                        <strong>{result.toFixed(2)}%</strong>
                      </span>
                    ) : (
                      <span>
                        Projection used: {currentGrade}% × (100 − {finalWeight}%) + {finalExamGrade || 'final'}% × {finalWeight}% ={' '}
                        <strong>{result.toFixed(2)}%</strong>
                      </span>
                    )}
                  </div>

                  {/* Primary next action */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        trackNextAction(cfg.actionType, 'copy');
                        copyResult();
                      }}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm transition hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Copy result
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        trackNextAction('share_result', 'share');
                        shareResult();
                      }}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary hover:bg-primary/15 dark:border-primary-light/40 dark:bg-primary-light/10 dark:text-primary-light"
                    >
                      <Share2 className="h-4 w-4" />
                      Share result
                    </button>
                    {mode === 'needed' && status === 'stretch' && (
                      <Link
                        href="/weighted-grade-calculator/"
                        onClick={() => trackNextAction('explore_weighted', 'weighted_link')}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
                      >
                        Explore weighted scenarios
                      </Link>
                    )}
                    {mode === 'needed' && status === 'impossible' && (
                      <button
                        type="button"
                        onClick={() => {
                          trackNextAction('adjust_target', 'lower_target');
                          setDesiredGrade(String(Math.max(0, parseFloat(desiredGrade) - 5)));
                        }}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
                      >
                        Lower target by 5%
                      </button>
                    )}
                    {mode === 'predict' && (
                      <button
                        type="button"
                        onClick={() => {
                          trackNextAction('switch_needed', 'mode_toggle');
                          updateMode('needed');
                        }}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
                      >
                        What do I need on the final?
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Chart */}
        {mode === 'needed' && chartData.length > 0 && (
          <FinalGradeChart chartData={chartData} desiredGrade={desiredGrade} result={result} />
        )}

        <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-6 text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p className="font-semibold text-gray-900 dark:text-white">Accuracy checklist</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The Final Grade Calculator treats weights as percentages; current coursework automatically receives 100 − w%.</li>
            <li>Results keep full precision before rounding to two decimals, mirroring LMS math.</li>
            <li>Missing assignments are assumed complete; model 0s or drops in the weighted calculator.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
