import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import { Calculator, Award, BarChart3, BookOpen, HelpCircle, GraduationCap } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'All Grade Calculators | Final Grade Calculator',
  description:
    'Browse all grade calculators, guides, and planning tools. Compare final grade calculators, weighted grade calculators, and step-by-step study resources.',
  keywords: [
    'grade calculators',
    'all calculators',
    'grade tools',
    'student calculators',
    'academic tools',
  ],
  canonical: '/calculators/',
});

export default function CalculatorsPage() {
  const calculatorTools = [
    {
      title: 'Final Grade Calculator',
      description:
        'Calculate what grade you need on your final exam. Enjoy real-time calculations, visual projections, and quick links to companion tools.',
      href: '/',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Weighted Grade Calculator',
      description:
        'Calculate your course grade when assignments, quizzes, and exams carry different weights. Excels at complex grading systems and integrates seamlessly with other tools.',
      href: '/weighted-grade-calculator/',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Grade Converter',
      description:
        'Convert between percentages, letter grades (A-F), and GPA scores (0-4.0). Complements our other tools by keeping every scale in sync.',
      href: '/grade-converter/',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const resources = [
    {
      title: 'How to Calculate Final Grade',
      description:
        'Comprehensive step-by-step guide on calculating your final grade with practical strategies.',
      href: '/how-to-calculate-final-grade/',
      icon: BookOpen,
    },
    {
      title: 'Grade Calculator Guide',
      description:
        'Complete guide to effective grade tracking, including best practices and strategies for academic success.',
      href: '/grade-calculator-guide/',
      icon: GraduationCap,
    },
    {
      title: 'Weighted vs Unweighted Grades',
      description:
        'Understand the difference between weighted and unweighted grading systems and how to work with each.',
      href: '/weighted-vs-unweighted-grades/',
      icon: BarChart3,
    },
    {
      title: 'College Grading Systems',
      description:
        'Explore different grading systems used worldwide and learn how to translate between scales.',
      href: '/college-grading-systems/',
      icon: GraduationCap,
    },
    {
      title: 'What Grade Do I Need? FAQ',
      description:
        'Frequently asked questions about grade calculations, final exams, and academic planning with step-by-step guidance.',
      href: '/what-grade-do-i-need/',
      icon: HelpCircle,
    },
  ];

  const itemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Grade calculators and resources',
    itemListElement: [...calculatorTools, ...resources].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: `https://finalgradecalculator.app${item.href}`,
    })),
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Final Grade Calculator',
        item: 'https://finalgradecalculator.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: 'https://finalgradecalculator.app/calculators/',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <JsonLd id="calculators-breadcrumb-schema" data={breadcrumbStructuredData} />
      <JsonLd id="calculators-itemlist-schema" data={itemListStructuredData} />
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Grade Calculators & Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Access our complete suite of free grade calculators and educational resources. Plan
            targets, monitor progress, and stay confident from the first quiz to the final exam.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bookmark this hub so our tools are always a tap away, whether you need quick homework
            projections or long-term scholarship planning.
          </p>
          <div className="mx-auto mt-8 max-w-4xl space-y-4 rounded-3xl border border-gray-200 bg-white/80 p-6 text-left text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
            <p>
              This calculator hub is designed for students who need more than one quick formula. Start
              with the final grade calculator when the question is “what score do I need on my final,”
              then move to the weighted grade calculator when homework, quizzes, labs, projects, and
              attendance all carry different percentages. Use the grade converter when your school or
              scholarship application asks for letters, percentages, or GPA values in a different scale.
            </p>
            <p>
              The best workflow is simple: collect the numbers from your syllabus, calculate the
              current risk, convert the result into a study target, and revisit the hub after each new
              grade posts. Keeping the tools connected prevents small mistakes, such as entering 0.30
              instead of 30 for a final weight, from becoming a bad plan during finals week.
            </p>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Unlock the Full Power of Grade Calculators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Pair consistent routines with smart visual tools so every course stays on track, even
              when deadlines pile up.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Weekly Rhythm',
                copy: 'Block 10 minutes on your calendar to update each calculator and note action items.',
              },
              {
                title: 'Advisor Ready',
                copy: 'Bring screenshots to advising meetings so course selections align with data-driven goals.',
              },
              {
                title: 'Group Accountability',
                copy: 'Host quick syncs where teammates load projections, compare expectations, and divide tasks.',
              },
              {
                title: 'Post-Exam Updates',
                copy: 'Log scores immediately; seeing the needle move keeps motivation high and reveals next steps.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Bookmark this hub on every device so grade calculators are always one tap away—no more
              scrambling to find the right tool during finals week.
            </p>
          </div>
        </div>
      </section>
      {/* Calculator Tools Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Grade Calculator Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {calculatorTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${tool.color} mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Educational Resources & Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-8 h-8 text-primary dark:text-primary-light" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Use Our Grade Calculators?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                <Calculator className="w-6 h-6 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                100% Free
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All our tools are completely free to use. Share with classmates—no registration, no
                hidden fees, no limitations.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                <BarChart3 className="w-6 h-6 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Instant Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get real-time calculations as you type. Results refresh instantly so you can adjust
                inputs on the fly and trust the projections.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                <BookOpen className="w-6 h-6 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Educational Content
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn while you calculate with comprehensive guides that pair calculations with study
                strategies and real classroom situations.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                <Award className="w-6 h-6 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Accurate & Reliable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our tools use precise formulas to ensure accurate results you can trust for academic
                planning, semester reviews, and advisor meetings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Build Your Study Plan with Grade Calculators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Treat each calculator as part of a connected toolkit—final grade, weighted grade, and
              converter working together to keep every class on track.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Course Kickoff',
                copy: 'Enter each syllabus at the start of term so baseline targets are ready from day one.',
              },
              {
                title: 'Trend Spotting',
                copy: 'Weekly check-ins reveal categories that dip early, giving you time to reallocate effort.',
              },
              {
                title: 'Advisor Sync',
                copy: 'Share summaries before meetings so conversations become action-oriented.',
              },
              {
                title: 'Scholarship Guardrail',
                copy: 'Export GPA projections to confirm you meet financial aid thresholds all semester.',
              },
              {
                title: 'Portfolio Ready',
                copy: 'Archive end-of-term snapshots for internship statements or graduate applications.',
              },
              {
                title: 'Family Visibility',
                copy: 'Show parents or mentors dashboards so they can celebrate wins and offer help when needed.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/20 dark:via-transparent dark:to-primary/20 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Seasonal Adjustments
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li>Use condensed timelines for summer or mini-mester courses.</li>
                <li>Sync calculator reminders with athletic or work schedules to prevent conflicts.</li>
                <li>Review archived terms to spot habits that led to GPA jumps or dips.</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Reduce Uncertainty
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Any time you wonder how close you are to a goal, open the calculators, plug in the
                latest scores, and watch the roadmap update instantly. The clarity keeps stress low
                and momentum high.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Start Calculating Your Grades Today
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Choose the tools that fit your needs and take control of your academic success with a
            customized toolkit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
            >
              <Calculator className="w-6 h-6" />
              Final Grade Calculator Tool
            </Link>
            <Link
              href="/weighted-grade-calculator/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-primary dark:text-primary-light border-2 border-primary dark:border-primary-light rounded-lg font-semibold text-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
            >
              <BarChart3 className="w-6 h-6" />
              Weighted Grade Calculators
            </Link>
          </div>
          <p className="text-md text-gray-600 dark:text-gray-300 mt-6">
            Rotate through the toolkit each week so insights stay fresh and priorities stay clear.
          </p>
        </div>
      </section>
    </div>
  );
}
