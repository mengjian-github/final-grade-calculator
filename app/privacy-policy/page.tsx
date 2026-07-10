import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy Alias',
  description: 'Privacy policy alias for Final Grade Calculator. The canonical privacy page is /privacy/.',
  canonical: '/privacy/',
  appendSiteName: true,
});

export default function PrivacyPolicyAliasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
          Privacy policy alias
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          Final Grade Calculator Privacy Policy
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          This legacy privacy-policy URL is kept for external directories and audit tools. The canonical privacy page lives at /privacy/.
        </p>
        <Link
          href="/privacy/"
          className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Open canonical privacy page
        </Link>
      </div>
    </main>
  );
}
