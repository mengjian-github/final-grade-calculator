'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

type ChartTooltipPayload = {
  value: number;
  payload: {
    finalExam: number;
    finalGrade: number;
  };
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayload[];
  label?: number;
}

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload || payload.length === 0 || label === undefined) {
    return null;
  }

  const gradeValue = payload[0].value;

  return (
    <div className="rounded-lg border border-primary/40 bg-white px-4 py-3 text-sm text-gray-900 shadow-lg dark:border-primary/60 dark:bg-gray-900 dark:text-gray-100">
      <p className="font-semibold">Final Exam: {label}%</p>
      <p className="text-gray-600 dark:text-gray-300">
        Final Grade: {gradeValue.toFixed(2)}%
      </p>
    </div>
  );
};

interface FinalGradeChartProps {
  chartData: { finalExam: number; finalGrade: number }[];
  desiredGrade: string;
  result: number | null;
}

export default function FinalGradeChart({ chartData, desiredGrade, result }: FinalGradeChartProps) {
  return (
    <div className="mt-8">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Final Grade Projection
      </h4>
      <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="finalExam"
              label={{ value: 'Final Exam Score (%)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: 'Final Grade (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<ChartTooltip />} wrapperStyle={{ outline: 'none' }} />
            <ReferenceLine
              y={parseFloat(desiredGrade)}
              stroke="#10B981"
              strokeDasharray="3 3"
              label="Target"
            />
            {result !== null && result >= 0 && result <= 100 && (
              <ReferenceLine
                x={result}
                stroke="#F59E0B"
                strokeDasharray="3 3"
                label="Needed"
              />
            )}
            <Line
              type="monotone"
              dataKey="finalGrade"
              stroke="#0EA5E9"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
