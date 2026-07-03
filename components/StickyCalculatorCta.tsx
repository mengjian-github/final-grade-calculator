'use client';

import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function StickyCalculatorCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/20 bg-white/95 px-4 py-3 shadow-2xl shadow-primary/20 backdrop-blur dark:border-primary-light/20 dark:bg-gray-950/95 sm:hidden">
      <Link
        href="#calculator"
        onClick={() => {
          trackEvent('sticky_calculator_cta_click', {
            calculator_type: 'final_grade',
            input_mode: 'sticky_mobile_cta',
            result_state: 'navigate_to_calculator',
            destination: '#calculator',
          });
        }}
        className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition active:scale-[0.98]"
      >
        <Calculator className="h-4 w-4" />
        Calculate my final grade
      </Link>
    </div>
  );
}
