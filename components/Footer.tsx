'use client';

import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    calculators: [
      { name: 'Final Grade Calculator', href: '/' },
      { name: 'Weighted Grade Calculator', href: '/weighted-grade-calculator/' },
      { name: 'Grade Converter', href: '/grade-converter/' },
      { name: 'All Calculators', href: '/calculators/' },
    ],
    resources: [
      { name: 'How to Calculate Final Grade', href: '/how-to-calculate-final-grade/' },
      { name: 'Grade Calculator Guide', href: '/grade-calculator-guide/' },
      { name: 'Weighted vs Unweighted Grades', href: '/weighted-vs-unweighted-grades/' },
      { name: 'College Grading Systems', href: '/college-grading-systems/' },
      { name: 'What Grade Do I Need?', href: '/what-grade-do-i-need/' },
    ],
    trust: [
      { name: 'Privacy Policy', href: '/privacy/' },
      { name: 'Terms of Use', href: '/terms/' },
      { name: 'Contact', href: '/contact/', eventName: 'contact_click' },
    ],
  };

  const trackFooterLink = (link: { name: string; href: string; eventName?: string }) => {
    if (!link.eventName) return;

    trackEvent(link.eventName, {
      calculator_type: 'site_navigation',
      input_mode: 'footer_link',
      result_state: 'contact_intent',
      destination: link.href,
    });
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-128.png"
                alt="Final Grade Calculator"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-primary dark:text-primary-light">
                Final Grade Calculator
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Calculate your final grade quickly and accurately. Free online tool for students to
              determine what they need to score on final exams to achieve their target grades.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Questions? Contact us at{' '}
              <a
                href="mailto:support@finalgradecalculator.app"
                onClick={() => trackEvent('contact_click', {
                  calculator_type: 'site_navigation',
                  input_mode: 'footer_email',
                  result_state: 'contact_intent',
                  destination: 'mailto:support@finalgradecalculator.app',
                })}
                className="text-primary dark:text-primary-light font-medium underline-offset-4 hover:underline"
              >
                support [at] finalgradecalculator.app
              </a>
              .
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Calculators
            </h3>
            <ul className="space-y-2">
              {footerLinks.calculators.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => trackFooterLink(link)}
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => trackFooterLink(link)}
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Trust
            </h3>
            <ul className="space-y-2">
              {footerLinks.trust.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => trackFooterLink(link)}
                    className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} Final Grade Calculator. All rights reserved. This calculator
            is for educational purposes and provides estimates based on the information you provide.
          </p>
        </div>
      </div>
    </footer>
  );
}
