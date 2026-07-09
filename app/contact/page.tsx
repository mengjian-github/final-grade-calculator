import Link from 'next/link';
import { Mail, GraduationCap, ShieldAlert, Clock } from 'lucide-react';
import { generateMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateMetadata({
  title: 'Contact \u2014 Final Grade Calculator Support',
  description:
    'Contact Final Grade Calculator for feedback, corrections, privacy questions, and site safety reports.',
  canonical: '/contact/',
  keywords: ['contact final grade calculator', 'grade calculator feedback', 'site safety contact'],
  appendSiteName: false,
});

const contactReasons = [
  {
    icon: GraduationCap,
    title: 'Calculator feedback',
    text: 'Tell us if a calculator result, grade scale, or guide needs clarification.',
  },
  {
    icon: ShieldAlert,
    title: 'Privacy or safety',
    text: 'Report privacy questions, security concerns, or sensitive content removal requests.',
  },
  {
    icon: Clock,
    title: 'Site corrections',
    text: 'Flag broken links, accessibility issues, confusing wording, or outdated educational examples.',
  },
];

export default function ContactPage() {
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Final Grade Calculator', item: 'https://finalgradecalculator.app/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://finalgradecalculator.app/contact/' },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-950">
      <JsonLd id="contact-breadcrumb-schema" data={breadcrumbStructuredData} />
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/20 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-200 mb-6">
            <Mail className="h-4 w-4" />
            Contact & feedback
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
            Contact Final Grade Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-8">
            Final Grade Calculator is an independent, free educational calculator site. It is not an
            official school, university, district, or testing organization. Use this page for feedback,
            corrections, privacy questions, or site safety reports.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to reach us</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-7">
            Email:{' '}
            <span className="font-semibold text-primary dark:text-primary-light">
              support [at] finalgradecalculator.app
            </span>
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-6">
            Replace <span className="font-medium">[at]</span> with <span className="font-medium">@</span> when sending your message. Please avoid sharing student IDs, school login credentials,
            full transcripts, or other sensitive records. Include the page URL and a short description
            of the issue so we can review it.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 mb-12">
          {contactReasons.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
                <Icon className="h-6 w-6 text-primary dark:text-primary-light mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">{item.text}</p>
              </div>
            );
          })}
        </div>

        <section className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300">
          <h2>About this site</h2>
          <p>
            Final Grade Calculator helps students estimate final exam scores, weighted grades, grade
            conversions, and related academic planning scenarios. Results are estimates and depend on
            the grading rules you enter. Always confirm official requirements with your instructor,
            syllabus, registrar, or academic advisor.
          </p>

          <h2>What we cannot do</h2>
          <ul>
            <li>We cannot access or change school records.</li>
            <li>We cannot provide official academic, admissions, or legal advice.</li>
            <li>We cannot verify grades with a school or university.</li>
          </ul>

          <h2>Privacy</h2>
          <p>
            Read our <Link href="/privacy/">Privacy Policy</Link> for details about analytics, cookies,
            and how limited site usage data is used to improve the calculator experience.
          </p>
        </section>
      </main>
    </div>
  );
}
