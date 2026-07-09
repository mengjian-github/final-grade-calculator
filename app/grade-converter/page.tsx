import { Metadata } from 'next';
import GradeConverter from '@/components/GradeConverter';
import JsonLd from '@/components/JsonLd';
import { generateMetadata } from '@/lib/seo';
import { Globe2, Calculator, ArrowLeftRight, GraduationCap, ClipboardList, Share2 } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Grade Converter — Percentage, Letter & GPA (Free)',
  description:
    'Use our grade converter to translate percentages, letters, and GPA scales fast. Understand cutoffs, international conversions, and transcript planning tips.',
  keywords: [
    'grade converter',
    'percentage to letter grade',
    'gpa converter',
    'letter grade to percentage',
    'grade conversion tool',
  ],
  canonical: '/grade-converter/',
  appendSiteName: false,
});

export default function GradeConverterPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Final Grade Calculator', item: 'https://finalgradecalculator.app/' },
        { '@type': 'ListItem', position: 2, name: 'Grade Converter', item: 'https://finalgradecalculator.app/grade-converter/' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Grade Converter',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: 'https://finalgradecalculator.app/grade-converter/',
      description:
        'Free web calculator that converts percentage grades, letter grades, and GPA values for academic planning.',
      image: 'https://finalgradecalculator.app/product-screenshot.png',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to convert grades',
      description: 'Choose a grade scale, enter the known value, and copy the converted equivalents.',
      image: 'https://finalgradecalculator.app/product-screenshot.png',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Choose the input scale', text: 'Select percentage, letter grade, or GPA as the value you know.' },
        { '@type': 'HowToStep', position: 2, name: 'Enter the grade', text: 'Type the grade value and adjust the scale if your school differs.' },
        { '@type': 'HowToStep', position: 3, name: 'Copy the equivalents', text: 'Use the converted percentage, letter, or GPA result in your planning tools.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <JsonLd id="grade-converter-structured-data" data={structuredData} />
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Grade Converter
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Convert between percentage grades, letter grades, and GPA with our free grade converter.
        </p>
      </div>
      <GradeConverter />

      <article className="max-w-6xl mx-auto mt-16 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Students Rely on the Grade Converter
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ArrowLeftRight,
                title: 'Speak Every Grading Language',
                copy:
                  'Translate percentages, letters, and GPA instantly so scholarship forms and applications stay consistent.',
              },
              {
                icon: ClipboardList,
                title: 'Stay Organized Across Campuses',
                copy:
                  'Instead of memorizing cutoffs, keep thresholds inside the grade converter for quick auditing.',
              },
              {
                icon: Share2,
                title: 'Collaborate With Confidence',
                copy:
                  'Share clear conversions with classmates, tutors, or advisors so everyone works from the same data.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.5fr,1fr] items-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              How the Grade Converter Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enter the value you know—percentage, letter grade, or GPA—and the grade converter
              returns equivalents using standardized tables. Need to match a unique syllabus? Adjust
              the thresholds so the conversion mirrors your instructor’s policy precisely.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-200">
              {[
                'Toggle plus/minus grading with one click.',
                'Swap between GPA scales (4.0, 5.0, or custom).',
                'Download results for your records or advising meetings.',
              ].map((tip) => (
                <div
                  key={tip}
                  className="bg-gradient-to-br from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-xl p-4"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-b from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Quick Conversion Loop
            </h3>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-2 text-sm">
              <li>Input the score you know.</li>
              <li>Customize the scale if your syllabus differs.</li>
              <li>Copy the translated value into planning docs or the final grade calculator.</li>
            </ol>
          </div>
        </section>

        <section>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Plan Semesters With the Grade Converter
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Pair conversions with our final grade calculator to see how upcoming scores will
                appear on your transcript. Update the grade converter after quizzes and projects so
                you always know how close you are to honor-roll thresholds or scholarship minimums.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Milestone Checklist
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>Log conversions after each grading period.</li>
                  <li>Highlight subjects that need an extra GPA boost.</li>
                  <li>Share snapshots with advisors when planning course loads.</li>
                </ul>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-primary" /> International Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Preparing for exchange programs or global internships? Convert local grades into
                ECTS or British classifications so evaluators have apples-to-apples comparisons. The
                grade converter also lets you keep both the original and translated result in one
                export for clarity.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                For transfer dossiers, store your converted list alongside recommendation letters so
                admissions readers immediately understand academic rigor.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Grade Converter FAQ
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'Does the grade converter account for plus/minus systems?',
                a: 'Yes. Toggle the plus/minus option to display conversions such as B+, B, or B-, matching common 4.0 breakdowns.',
              },
              {
                q: 'Can I use custom GPA scales?',
                a: 'Absolutely. Enter your institution’s values and the grade converter recalculates every result using that schema.',
              },
              {
                q: 'Will my conversions be saved automatically?',
                a: 'Results reset when you refresh for privacy, so download a copy or add numbers to your planner after each session.',
              },
              {
                q: 'How does this help with tutoring or study groups?',
                a: 'Show teammates how percentages translate to letters so everyone understands expectations and can set realistic goals.',
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Next Steps with the Grade Converter
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Pair conversions with our final and weighted grade calculators to build a complete
                academic dashboard. Bookmark the grade converter so any question about percentages,
                letters, or GPA is always one click away.
              </p>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <a
                href="/weighted-grade-calculator/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <GraduationCap className="w-5 h-5" /> Weighted Calculator
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                <Calculator className="w-5 h-5" /> Final Grade Calculator
              </a>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
