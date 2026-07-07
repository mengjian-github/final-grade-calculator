'use client';

import { useState } from 'react';
import {
  percentageToLetter,
  percentageToGPA,
  letterToPercentage,
  gpaToPercentage,
} from '@/lib/gradeCalculations';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function GradeConverterComponent() {
  const [conversionType, setConversionType] = useState<
    'percentToLetter' | 'percentToGpa' | 'letterToPercent' | 'gpaToPercent'
  >('percentToLetter');

  const [percentInput, setPercentInput] = useState('85');
  const [letterInput, setLetterInput] = useState('B');
  const [gpaInput, setGpaInput] = useState('3.0');

  const trackConverterType = (nextType: typeof conversionType) => {
    setConversionType(nextType);
    trackEvent('converter_type_change', {
      calculator_type: 'grade_converter',
      input_mode: nextType,
      result_state: 'type_selected',
    });
  };

  const trackConverterInput = (field: string, value: string) => {
    trackEvent('converter_input_change', {
      calculator_type: 'grade_converter',
      input_mode: conversionType,
      result_state: 'input_updated',
      field,
      has_value: value.trim().length > 0,
    });
  };

  const renderConverter = () => {
    switch (conversionType) {
      case 'percentToLetter':
        return (
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Percentage
              </label>
              <input
                type="number"
                value={percentInput}
                onChange={(e) => {
                  setPercentInput(e.target.value);
                  trackConverterInput('percentage', e.target.value);
                }}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg"
              />
            </div>
            <ArrowRight className="w-8 h-8 text-gray-400 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Letter Grade
              </label>
              <div className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-900 dark:text-gray-100 text-lg font-bold">
                {percentageToLetter(parseFloat(percentInput) || 0)}
              </div>
            </div>
          </div>
        );

      case 'percentToGpa':
        return (
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Percentage
              </label>
              <input
                type="number"
                value={percentInput}
                onChange={(e) => {
                  setPercentInput(e.target.value);
                  trackConverterInput('percentage', e.target.value);
                }}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg"
              />
            </div>
            <ArrowRight className="w-8 h-8 text-gray-400 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GPA (4.0 Scale)
              </label>
              <div className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-900 dark:text-gray-100 text-lg font-bold">
                {percentageToGPA(parseFloat(percentInput) || 0).toFixed(2)}
              </div>
            </div>
          </div>
        );

      case 'letterToPercent':
        return (
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Letter Grade
              </label>
              <select
                value={letterInput}
                onChange={(e) => {
                  setLetterInput(e.target.value);
                  trackConverterInput('letter', e.target.value);
                }}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg"
              >
                {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'].map(
                  (grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  )
                )}
              </select>
            </div>
            <ArrowRight className="w-8 h-8 text-gray-400 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Percentage
              </label>
              <div className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-900 dark:text-gray-100 text-lg font-bold">
                {letterToPercentage(letterInput).toFixed(2)}%
              </div>
            </div>
          </div>
        );

      case 'gpaToPercent':
        return (
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GPA (4.0 Scale)
              </label>
              <input
                type="number"
                value={gpaInput}
                onChange={(e) => {
                  setGpaInput(e.target.value);
                  trackConverterInput('gpa', e.target.value);
                }}
                min="0"
                max="4.0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-lg"
              />
            </div>
            <ArrowRight className="w-8 h-8 text-gray-400 flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Percentage
              </label>
              <div className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-900 dark:text-gray-100 text-lg font-bold">
                {gpaToPercentage(parseFloat(gpaInput) || 0).toFixed(2)}%
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        {/* Conversion Type Selector */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => trackConverterType('percentToLetter')}
            className={`py-3 px-4 rounded-lg font-medium transition-all border ${
              conversionType === 'percentToLetter'
                ? 'bg-primary text-white border-primary shadow-lg'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            % → Letter
          </button>
          <button
            onClick={() => trackConverterType('percentToGpa')}
            className={`py-3 px-4 rounded-lg font-medium transition-all border ${
              conversionType === 'percentToGpa'
                ? 'bg-primary text-white border-primary shadow-lg'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            % → GPA
          </button>
          <button
            onClick={() => trackConverterType('letterToPercent')}
            className={`py-3 px-4 rounded-lg font-medium transition-all border ${
              conversionType === 'letterToPercent'
                ? 'bg-primary text-white border-primary shadow-lg'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            Letter → %
          </button>
          <button
            onClick={() => trackConverterType('gpaToPercent')}
            className={`py-3 px-4 rounded-lg font-medium transition-all border ${
              conversionType === 'gpaToPercent'
                ? 'bg-primary text-white border-primary shadow-lg'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            GPA → %
          </button>
        </div>

        {/* Converter */}
        <div className="mb-8">{renderConverter()}</div>

        {/* Conversion Table */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Standard Grading Scale
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-900/40">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Letter
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Percentage Range
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    GPA (4.0)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { letter: 'A+', range: '97-100', gpa: '4.0' },
                  { letter: 'A', range: '93-96', gpa: '4.0' },
                  { letter: 'A-', range: '90-92', gpa: '3.7' },
                  { letter: 'B+', range: '87-89', gpa: '3.3' },
                  { letter: 'B', range: '83-86', gpa: '3.0' },
                  { letter: 'B-', range: '80-82', gpa: '2.7' },
                  { letter: 'C+', range: '77-79', gpa: '2.3' },
                  { letter: 'C', range: '73-76', gpa: '2.0' },
                  { letter: 'C-', range: '70-72', gpa: '1.7' },
                  { letter: 'D+', range: '67-69', gpa: '1.3' },
                  { letter: 'D', range: '63-66', gpa: '1.0' },
                  { letter: 'D-', range: '60-62', gpa: '0.7' },
                  { letter: 'F', range: '0-59', gpa: '0.0' },
                ].map((row, index) => (
                  <tr
                    key={row.letter}
                    className={`${
                      index % 2 === 0
                        ? 'bg-white dark:bg-gray-900/40'
                        : 'bg-gray-50 dark:bg-gray-900/20'
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {row.letter}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {row.range}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {row.gpa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
