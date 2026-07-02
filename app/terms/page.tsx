import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Terms of Use',
  description:
    'Terms of use for Final Grade Calculator. Educational estimates, no official academic advice, and liability limitations.',
  canonical: '/terms/',
  keywords: ['final grade calculator terms', 'grade calculator terms of use'],
});

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Use
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: {currentYear}
          </p>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Educational Purpose Only
              </h2>
              <p>
                Final Grade Calculator provides estimates based on the information you enter. It is
                designed for educational and planning purposes. Results are not official academic
                records and should not be submitted to schools, employers, or institutions as
                verified grades.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2. No Academic or Legal Advice
              </h2>
              <p>
                Nothing on this site constitutes academic, admissions, financial, or legal advice.
                Always consult your school&apos;s official grading policy, academic advisor, or
                qualified professional for decisions that affect your academic standing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3. Accuracy and Limitations
              </h2>
              <p>
                We aim for mathematical accuracy, but we do not guarantee that every grading
                scenario is covered. Different schools use different rounding policies, weighting
                schemes, and extra-credit rules. The calculator may not reflect your institution&apos;s
                exact methodology.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4. Privacy and Data
              </h2>
              <p>
                Grade values you enter are processed locally in your browser. We do not store
                personal grades on our servers. For details on analytics and cookies, see our{' '}
                <Link href="/privacy/" className="text-primary hover:text-primary-dark dark:text-primary-light">
                  Privacy Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                5. Liability Limitation
              </h2>
              <p>
                To the fullest extent permitted by law, Final Grade Calculator and its operators are
                not liable for any direct, indirect, incidental, or consequential damages arising
                from the use of this site or reliance on its calculations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                6. Changes to These Terms
              </h2>
              <p>
                We may update these terms at any time. Continued use of the site after changes
                constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                7. Contact
              </h2>
              <p>
                For questions about these terms, contact us at{' '}
                <span className="text-primary dark:text-primary-light font-medium">
                  support [at] finalgradecalculator.app
                </span>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
