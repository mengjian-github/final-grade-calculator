import Link from 'next/link';
import { ShieldCheck, BarChart3, Cookie, Mail } from 'lucide-react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Final Grade Calculator, including analytics, cookies, data use, and contact information.',
  canonical: '/privacy',
  keywords: ['privacy policy', 'analytics cookies', 'student grade calculator privacy'],
});

const analyticsTools = [
  'Google Analytics 4 (GA4)',
  'Microsoft Clarity',
  'Plausible Analytics (self-hosted)',
];

export default function PrivacyPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/20 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-200 mb-6">
            <ShieldCheck className="h-4 w-4" />
            Legal & trust
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-8">
            Final Grade Calculator is a free educational tool. We do not offer accounts, paid plans,
            school integrations, or payment processing. This policy explains what limited data may be
            collected when you use the site.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Last updated: June 5, 2026</p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300">
          <section>
            <h2>Information you enter into calculators</h2>
            <p>
              The grades, weights, target scores, and scenarios you enter are processed in your browser
              to calculate results. We do not require you to create an account, and we do not ask for
              names, student IDs, school credentials, or payment details.
            </p>
          </section>

          <section>
            <h2>Analytics and cookies</h2>
            <p>
              We use analytics to understand whether the calculators and guides are useful, find broken
              experiences, and improve page performance. The site may load these analytics providers:
            </p>
            <ul>
              {analyticsTools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <p>
              These tools may collect technical information such as page views, device/browser type,
              approximate location derived from IP address, referrer, clicks, scroll depth, and session
              diagnostics. Microsoft Clarity may record anonymized interaction data such as clicks and
              scroll behavior so we can identify usability issues. Analytics providers may set cookies
              or use similar technologies depending on your browser settings and their own policies.
            </p>
          </section>

          <section>
            <h2>How we use data</h2>
            <p>We use aggregated analytics data to:</p>
            <ul>
              <li>measure visits to calculator and guide pages;</li>
              <li>identify confusing layouts, dead clicks, or technical errors;</li>
              <li>improve calculator usability, content quality, and site speed;</li>
              <li>protect the site from abuse and troubleshoot reliability issues.</li>
            </ul>
            <p>
              We do not sell personal information. We do not use calculator inputs to make academic,
              admissions, financial, or eligibility decisions about users.
            </p>
          </section>

          <section>
            <h2>Third-party services</h2>
            <p>
              Analytics providers process data under their own privacy policies. You can limit cookies
              or tracking through your browser settings, privacy extensions, or platform-level controls.
              Some browser restrictions may reduce analytics accuracy without affecting calculator use.
            </p>
          </section>

          <section>
            <h2>Children and students</h2>
            <p>
              This website is designed as a general educational calculator and guide. It is not an
              official school service and does not intentionally collect student records or children&apos;s
              personal information. If you believe sensitive information was submitted through a contact
              channel, contact us so we can review the request.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For privacy questions, feedback, or safety reports, contact us at{' '}
              <span className="font-semibold text-primary dark:text-primary-light">
                support [at] finalgradecalculator.app
              </span>
              . You can also use the <Link href="/contact">Contact page</Link>.
            </p>
          </section>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-900">
            <BarChart3 className="h-6 w-6 text-primary dark:text-primary-light mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Analytics disclosed</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">GA4, Clarity, and Plausible are named clearly.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-900">
            <Cookie className="h-6 w-6 text-primary dark:text-primary-light mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Cookie notice</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Browser controls and third-party policies are explained.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-900">
            <Mail className="h-6 w-6 text-primary dark:text-primary-light mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Feedback path</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Users have a visible privacy and safety contact route.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
