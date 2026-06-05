'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { percentageToLetter } from '@/lib/gradeCalculations';
import { trackEvent } from '@/lib/analytics';

interface GradeItem {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

const isFiniteNumber = (value: number) => Number.isFinite(value) && !Number.isNaN(value);

const formatSafePercent = (value: number | null) => {
  if (value === null || !isFiniteNumber(value)) return '—';
  return `${value.toFixed(2)}%`;
};

const getWeightedResultState = (neededGrade: number | null, totalWeight: number) => {
  if (totalWeight <= 0) return 'invalid';
  if (neededGrade === null || !isFiniteNumber(neededGrade)) return 'current_only';
  if (neededGrade < 0) return 'already_achieved';
  if (neededGrade <= 100) return 'achievable';
  return 'unachievable';
};

export default function WeightedGradeCalculator() {
  const [items, setItems] = useState<GradeItem[]>([
    { id: '1', name: 'Homework', grade: '90', weight: '20' },
    { id: '2', name: 'Midterm', grade: '85', weight: '30' },
    { id: '3', name: 'Final Exam', grade: '', weight: '30' },
    { id: '4', name: 'Project', grade: '92', weight: '20' },
  ]);

  const [currentGrade, setCurrentGrade] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [targetGrade, setTargetGrade] = useState<string>('90');
  const [neededGrade, setNeededGrade] = useState<number | null>(null);
  const [calculationStatus, setCalculationStatus] = useState<string>(
    'Weighted calculator is live. Add grades and weights, then press Update Weighted Grade for confirmation.'
  );
  const hasTrackedStart = useRef(false);
  const lastResultSignature = useRef<string | null>(null);

  const trackStartCalculator = (source = 'input_change') => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent('start_calculator', {
      calculator_type: 'weighted_grade',
      input_mode: 'weighted_items',
      result_state: getWeightedResultState(neededGrade, totalWeight),
      items_count: items.length,
      source,
    });
  };

  const trackManualWeightedCalculation = () => {
    trackEvent('weighted_calculate', {
      calculator_type: 'weighted_grade',
      input_mode: 'weighted_items',
      result_state: getWeightedResultState(neededGrade, totalWeight),
      items_count: items.length,
      source: 'manual_cta',
    });

    if (totalWeight <= 0) {
      setCalculationStatus('Add at least one positive weight before calculating; invalid weighted results stay hidden.');
      return;
    }

    if (neededGrade === null) {
      setCalculationStatus(`Updated: current weighted grade is ${currentGrade.toFixed(2)}% across ${totalWeight.toFixed(0)}% total weight.`);
      return;
    }

    setCalculationStatus(
      neededGrade > 100
        ? `Updated: you need ${neededGrade.toFixed(2)}% on remaining items, which is above 100%.`
        : `Updated: you need ${neededGrade.toFixed(2)}% on remaining items.`
    );
  };

  useEffect(() => {
    let weightedSum = 0;
    let totalW = 0;
    let remainingWeight = 0;

    items.forEach((item) => {
      const grade = parseFloat(item.grade);
      const weight = parseFloat(item.weight);
      const hasPositiveWeight = isFiniteNumber(weight) && weight > 0;
      const hasGrade = isFiniteNumber(grade);

      if (hasPositiveWeight) {
        totalW += weight;
      }

      if (hasGrade && hasPositiveWeight) {
        weightedSum += grade * weight;
      } else if (hasPositiveWeight && (item.grade.trim() === '' || !hasGrade)) {
        remainingWeight += weight;
      }
    });

    setTotalWeight(totalW);

    if (totalW > 0) {
      setCurrentGrade(weightedSum / totalW);
    } else {
      setCurrentGrade(0);
    }

    // Calculate needed grade for remaining positive-weight items only.
    const target = parseFloat(targetGrade);
    if (remainingWeight > 0 && isFiniteNumber(target) && totalW > 0) {
      const needed = ((target * totalW) - weightedSum) / remainingWeight;
      setNeededGrade(isFiniteNumber(needed) ? needed : null);
    } else {
      setNeededGrade(null);
    }
  }, [items, targetGrade]);

  useEffect(() => {
    if (totalWeight <= 0 || !isFiniteNumber(currentGrade)) return;

    const resultValue = neededGrade !== null && isFiniteNumber(neededGrade) ? neededGrade : currentGrade;
    const signature = JSON.stringify({
      items: items.map((item) => [item.grade, item.weight]),
      targetGrade,
      totalWeight: totalWeight.toFixed(2),
      currentGrade: currentGrade.toFixed(2),
      neededGrade: neededGrade === null ? null : neededGrade.toFixed(2),
    });

    const timer = window.setTimeout(() => {
      if (lastResultSignature.current === signature) return;
      lastResultSignature.current = signature;
      trackEvent('result_view', {
        calculator_type: 'weighted_grade',
        input_mode: 'weighted_items',
        result_state: getWeightedResultState(neededGrade, totalWeight),
        result_value: Number(resultValue.toFixed(2)),
        items_count: items.length,
        source: 'auto_result',
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [currentGrade, items, neededGrade, targetGrade, totalWeight]);

  const addItem = () => {
    trackStartCalculator('add_item');
    const newItem: GradeItem = {
      id: Date.now().toString(),
      name: `Item ${items.length + 1}`,
      grade: '',
      weight: '10',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    trackStartCalculator('remove_item');
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof GradeItem, value: string) => {
    trackStartCalculator('input_change');
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const updateTargetGrade = (value: string) => {
    trackStartCalculator('target_change');
    setTargetGrade(value);
  };

  const copyWeightedResult = async () => {
    if (totalWeight <= 0) return;

    const text = neededGrade === null
      ? `Weighted Grade Calculator: my current weighted grade is ${currentGrade.toFixed(2)}% across ${totalWeight.toFixed(0)}% total weight.`
      : `Weighted Grade Calculator: current grade ${currentGrade.toFixed(2)}%; needed on remaining items ${neededGrade.toFixed(2)}%.`;

    try {
      await navigator.clipboard.writeText(text);
      setCalculationStatus('Copied weighted grade result to clipboard.');
      trackEvent('copy_result', {
        calculator_type: 'weighted_grade',
        input_mode: 'weighted_items',
        result_state: getWeightedResultState(neededGrade, totalWeight),
        result_value: Number((neededGrade ?? currentGrade).toFixed(2)),
        items_count: items.length,
        source: 'result_cta',
      });
    } catch {
      setCalculationStatus('Copy failed. You can still select the result text manually.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Grade Items
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Add all your assignments, exams, and projects with their respective weights.
          </p>
        </div>

        {/* Grade Items List */}
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-end bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-4 rounded-lg"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="Assignment name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grade (%)
                </label>
                <input
                  type="number"
                  value={item.grade}
                  onChange={(e) => updateItem(item.id, 'grade', e.target.value)}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="0-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weight (%)
                </label>
                <input
                  type="number"
                  value={item.weight}
                  onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                  min="0"
                  max="100"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  placeholder="0-100"
                />
              </div>
              <div>
                <button
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        <button
          onClick={addItem}
          className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary dark:hover:border-primary-light transition-colors text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-medium flex items-center justify-center gap-2 mb-4"
        >
          <Plus className="w-5 h-5 text-primary dark:text-primary-light" />
          Add Grade Item
        </button>

        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={trackManualWeightedCalculation}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 active:scale-[0.98]"
          >
            <Calculator className="h-4 w-4" />
            Update Weighted Grade
          </button>
        </div>

        <div
          aria-live="polite"
          className="mb-8 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-gray-800 dark:border-primary-light/30 dark:bg-primary/10 dark:text-gray-100"
        >
          {calculationStatus}
        </div>

        {totalWeight <= 0 && (
          <div className="mb-8 rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Add positive category weights to calculate a weighted grade. Invalid weighted results stay hidden until enough data is available.
          </div>
        )}

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Grade */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calculator className="w-6 h-6 text-primary dark:text-primary-light" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Current Grade
              </h3>
            </div>
            <div className="text-4xl font-bold text-primary dark:text-primary-light mb-2">
              {formatSafePercent(currentGrade)}
            </div>
            <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {percentageToLetter(currentGrade)}
            </div>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Total Weight: {totalWeight.toFixed(0)}%
              {totalWeight !== 100 && (
                <span className="ml-2 text-warning">
                  (Should be 100%)
                </span>
              )}
            </div>
          </div>

          {/* Target Grade Calculator */}
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 dark:from-secondary/30 dark:to-primary/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Grade Needed on Remaining Items
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Final Grade (%)
              </label>
              <input
                type="number"
                value={targetGrade}
                onChange={(e) => updateTargetGrade(e.target.value)}
                min="0"
                max="100"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>
            {neededGrade !== null && (
              <div>
                <div className="text-3xl font-bold text-secondary dark:text-primary-light mb-2">
                  {formatSafePercent(neededGrade)}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {percentageToLetter(neededGrade)}
                </div>
                {neededGrade > 100 && (
                  <p className="mt-3 text-sm text-error">
                    Target grade is not achievable with current scores.
                  </p>
                )}
                {neededGrade < 0 && (
                  <p className="mt-3 text-sm text-success">
                    You can score 0% and still achieve your target!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={copyWeightedResult}
            disabled={totalWeight <= 0}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/40 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:text-primary-light"
          >
            Copy result
          </button>
        </div>

        {/* Breakdown Table */}
        <div className="mt-8 overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Grade Breakdown
          </h3>
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-900/40">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Grade
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Weight
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Contribution
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => {
                const grade = parseFloat(item.grade);
                const weight = parseFloat(item.weight);
                const contribution = isFiniteNumber(grade) && isFiniteNumber(weight) && weight > 0 && totalWeight > 0
                  ? ((grade * weight) / totalWeight).toFixed(2)
                  : '—';

                return (
                  <tr
                    key={item.id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-900/30"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {item.grade || '—'}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {item.weight}%
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-primary dark:text-primary-light">
                      {contribution}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
