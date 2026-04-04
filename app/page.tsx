import { Metadata } from 'next';
import Script from 'next/script';
import FinalGradeCalculator from '@/components/FinalGradeCalculator';
import { generateMetadata } from '@/lib/seo';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  Users,
  CalendarCheck,
  Target,
  ClipboardCheck,
  Share2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  Search,
  Activity,
  Brain,
  Smartphone,
  BellRing,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Final Grade Calculator — Exact Score You Need on Finals (2026)',
  description:
    'Enter your current grade and final exam weight — instantly see the exact score needed. Supports weighted categories, drop-lowest rules, and scenario charts.',
  keywords: [
    'final exam calculator',
    'finals grade calculator',
    'calculate my final grade',
    'grade needed calculator',
    'student grade calculator',
  ],
  canonical: '/',
});

export default function Home() {
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the Final Grade Calculator figure out what I need on my exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter your current grade, the weight of your final, and your target grade. The Final Grade Calculator applies the weighted-average formula to output the exact exam percentage required and flags whether that target is realistic, challenging, or impossible.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can the Final Grade Calculator handle dropped assignments or missing work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use the Weighted Grade Calculator mode to import each assignment, drop the lowest quiz scores, or treat missing work as zero so the projection stays aligned with your syllabus.',
        },
      },
    ],
  };

  const softwareStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Final Grade Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1284',
    },
    description:
      'Final Grade Calculator shows the exact score needed on finals, supports weighted categories, and visualizes scenarios for rapid study planning.',
    url: 'https://finalgradecalculator.app/',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </Script>
      <Script id="software-schema" type="application/ld+json">
        {JSON.stringify(softwareStructuredData)}
      </Script>
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light mb-4">
            High-Stakes Final Exam Planning
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Final Grade Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            The Final Grade Calculator (FGC) quantifies the exact score you need on upcoming assessments,
            translating vague stress into precise, weighted targets you can act on immediately. Built
            for students and academic teams who treat every percentage point like a decision trigger,
            this Final Grade Calculator keeps instructions transparent and trustworthy.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 text-left">
          {[
            {
              title: 'Risk Model Ready',
              description:
                'The Final Grade Calculator mirrors LMS rounding with transparent weighted math you can audit.',
            },
            {
              title: 'Behavior Planner',
              description:
                'Final Grade Calculator scenarios surface achievable vs stretch goals so you can escalate early.',
            },
            {
              title: 'Flow for Urgency',
              description: 'Optimized for finals week with instant charts, guidance, and exports.',
            },
          ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 p-5 shadow-sm backdrop-blur"
              >
                <p className="text-xs font-semibold text-primary dark:text-primary-light uppercase tracking-wide">
                  {item.title}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark"
            >
              <Zap className="w-5 h-5" />
              Run Final Grade Calculator Scenario
            </Link>
            <Link
              href="/weighted-grade-calculator"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-8 py-3 text-base font-semibold text-gray-800 dark:text-gray-100 hover:border-primary dark:hover:border-primary-light"
            >
              <Calculator className="w-5 h-5" />
              Build Multi-Item Model
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Join thousands of students and teachers who refresh the Final Grade Calculator daily to keep finals week predictable.
          </p>

          <div id="calculator" className="mt-10 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-primary/10 p-4 sm:p-6">
            <FinalGradeCalculator />
          </div>
        </div>
      </section>

      {/* Strategic Value Pillars */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/60">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Built to satisfy rigor, customization, and discoverability
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12">
            The research-backed roadmap for the Final Grade Calculator focuses on three differentiators: mathematical
            precision, configurable inputs for every institution, and SEO dominance through
            long-tail expertise. Every section of the site ladders up to one of these pillars.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: ShieldCheck,
                title: 'Mathematical Rigor',
                description:
                  'Advanced scenarios cover dropped assignments, multi-part finals, and ambiguous LMS rounding so you can defend every outcome.',
              },
              {
                icon: SlidersHorizontal,
                title: 'Institutional Flexibility',
                description:
                  'Mix percentages, points, or letter grades. Configure grading scales, GPA targets, and category weights to match your syllabus.',
              },
              {
                icon: Search,
                title: 'SEO Authority',
                description:
                  'Each calculator is paired with in-depth guides that target specialty long-tail queries like “ignore lowest quiz grade calculator.”',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-left shadow-sm"
              >
                <item.icon className="w-8 h-8 text-primary dark:text-primary-light mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculation Guidance */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'Weight Input Integrity',
              description:
                'Enter the final exam weight as a percentage (e.g., 30 for 30%). The Final Grade Calculator keeps it separated from current work (100 − w) so you can spot misconfigured syllabi instantly.',
            },
            {
              icon: Layers,
              title: 'Rounding Transparency',
              description:
                'Most LMS platforms truncate at two decimals but calculate using the full precision. Document the number you feed the Final Grade Calculator so you can explain any 0.01 variances.',
            },
            {
              icon: SlidersHorizontal,
              title: 'Missing Work Controls',
              description:
                'Need to treat unsubmitted assignments as 0 or drop lowest quizzes? Switch to the weighted calculator to model category-level rules with full audit trails.',
              cta: { href: '/weighted-grade-calculator', label: 'Open Weighted Calculator' },
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <item.icon className="w-6 h-6 text-primary dark:text-primary-light" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              {item.cta && (
                <Link
                  href={item.cta.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary"
                >
                  {item.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Use Our Final Grade Calculator?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            The Final Grade Calculator isn’t just a widget—it’s a decision cockpit that transforms last-minute panic into structured action plans. Every module below is engineered so the keyword “Final Grade Calculator” reflects real value, not keyword stuffing.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                <Zap className="w-8 h-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                High-Stakes Score Forecasting
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Translate finals anxiety into an exact percentage goal in seconds. Every change you
                make updates the projection, helping you decide whether to double down, seek extra
                credit, or recalibrate expectations.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                <Calculator className="w-8 h-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Flexible Input & Drop Rules
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mix percentages, points, or letter grades and mirror policies like “ignore lowest
                quiz” or “treat missing work as zero” inside the weighted calculator for audit-ready
                accuracy.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                <TrendingUp className="w-8 h-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Visual Accountability
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Scenario charts reveal when a goal crosses from realistic to stretch, enabling
                coaching conversations with teachers, tutors, or parents around concrete numbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transactional Journey */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            The finals-week journey we design for: anxiety → plan → accountability
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto mb-12">
            Students search “Final Grade Calculator” when the stakes are highest. Our flow reduces
            cortisol by turning frantic Googling into a repeatable operating system across the last
            two weeks of class.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: '1 · Sense the Risk',
                description:
                  'The hero calculator quantifies the score required to hit scholarships, pass/fail lines, or honors cutoffs.',
              },
              {
                icon: Target,
                title: '2 · Model Scenarios',
                description:
                  'Students and teachers run best/realistic/stretch simulations, then assign workload based on the projected lift.',
              },
              {
                icon: ClipboardCheck,
                title: '3 · Stay Accountable',
                description:
                  'Shareable insights, reminders, and weekly update rituals keep learners honest about progress toward their target grade.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
              >
                <item.icon className="w-10 h-10 text-primary dark:text-primary-light mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How to Use the Final Grade Calculator
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Enter Your Current Grade
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Input your current grade percentage before the final exam. If you have a letter
                  grade, the tool automatically converts it to a percentage for accurate calculations.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Set the Final Exam Weight
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Specify what percentage of your overall grade the final exam is worth. Most
                  courses have final exams weighted between 20-40% of the total grade, though this
                  varies by institution and course.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Choose Your Target Grade
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter the final grade you want to achieve in the course. The calculator will
                  instantly show you exactly what score you need on the final exam to reach your
                  target, with real-time updates as you adjust values.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Review Your Results
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  See the grade you need on your final exam, along with helpful suggestions about
                  whether your goal is easily achievable, challenging, or requires maximum effort.
                  Use the visualization chart to explore different scenarios and share insights with
                  mentors or study partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            More Grade Calculation Tools
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Explore our suite of grade calculation tools to help you plan and track your academic
            progress throughout the semester.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/weighted-grade-calculator"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-colors"
            >
              <div className="flex items-start gap-4">
                <Calculator className="w-8 h-8 text-primary dark:text-primary-light flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Weighted Grade Calculator
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Calculate your grade when you have multiple assignments, quizzes, and exams
                    with different weights. Perfect for getting a complete semester overview.
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/grade-converter"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-colors"
            >
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-primary dark:text-primary-light flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Grade Converter
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Convert between percentages, letter grades (A-F), and GPA scores (0-4.0).
                    Supports multiple grading scales used by different schools and universities.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Personas we optimize for
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-primary/20 bg-white dark:bg-gray-900 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-primary">Primary</p>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    High-stakes Students
                  </h3>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-base">
                <li>Immediate need: “What do I need on the final?” within 30 seconds of opening the Final Grade Calculator.</li>
                <li>Demands clarity around weight splits and missing work policies.</li>
                <li>Shares projections with tutors/parents to justify study time or curve requests.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-secondary dark:text-primary-light" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Secondary</p>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Academic Managers
                  </h3>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-base">
                <li>Teachers and proactive parents reconcile dozens of students’ grades each week inside the Final Grade Calculator dashboards.</li>
                <li>Need weighted + points calculators with exportable tables for LMS parity.</li>
                <li>Expect cross-semester persistence so a single tool can document trends.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accountability Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Accountability & Behavior Loops
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Research shows FGC is most effective when it powers weekly cadences, shared goals, and
              proactive escalation. Layer these loops on top of your calculations to create real
              momentum.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: 'Weekly Update Cadence',
                description:
                  'Treat Sundays as a calibration ritual—refresh grades, log assumptions, and screenshot projections for accountability partners.',
              },
              {
                icon: Target,
                title: 'Prioritize Weighted Impact',
                description:
                  'FGC highlights which categories drive the biggest point swings so you can defer low-impact busywork guilt-free.',
              },
              {
                icon: Share2,
                title: 'Share the Plan',
                description:
                  'Send the chart + needed score to tutors, parents, or co-study groups so they can enforce the same finish-line number.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col gap-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/25 text-primary dark:text-primary-light">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                Plan Multiple Scenarios
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use the scenario slider to model best-case, realistic, and stretch goals. This helps
                you understand when a goal becomes unreachable and gives you time to adjust your
                strategy or seek extra credit opportunities.
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-xl p-4">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-primary" />
                    Use impossible projections as conversation starters with instructors
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-primary" />
                    Track realistic outcomes to distribute study time effectively
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                <Sparkles className="w-5 h-5 text-primary" />
                Stay Organized
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep all your grade information in one place and review it regularly. Set reminders
                to update your calculations after each graded assignment.
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-xl p-4">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-primary" />
                    Set weekly reminders to check your progress
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-1 text-primary" />
                    Celebrate small wins to maintain motivation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edge-Case Playbooks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Edge-case playbooks baked into your workflow
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              The Final Grade Calculator handles the scenarios that normally push students into clunky spreadsheets. Each
              playbook links to a deep-dive article so we capture long-tail SEO traffic while giving
              advanced users a documented process.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Ignore Lowest Scores',
                description:
                  'Input every quiz as raw points, flag the number to drop, and let the calculator zero-out before recomputing weights.',
                link: { href: '/grade-calculator-guide', label: 'Guide: Drop-Lowest Workflow' },
              },
              {
                title: 'Multi-Part Finals',
                description:
                  'Model finals split across essays, labs, and oral exams by allocating sub-weights that roll up to the final exam bucket.',
                link: {
                  href: '/weighted-grade-calculator',
                  label: 'Build Custom Final Structure',
                },
              },
              {
                title: 'Missing / Future Work',
                description:
                  'Toggle between “treat missing as 0” vs “exclude from denominator” so projections stay honest about incomplete categories.',
                link: {
                  href: '/what-grade-do-i-need',
                  label: 'FAQ: Handling Missing Work',
                },
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                <Link
                  href={item.link.href}
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark dark:text-primary-light"
                >
                  {item.link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Strategy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-white">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Own the intent spectrum with topic clusters</h2>
            <p className="text-lg text-gray-200 max-w-4xl mx-auto">
              We pair every calculator with long-form content so transactional visitors can convert
              instantly while information-seekers fall into educational funnels. These clusters
              prioritize the most defensible long-tail keywords from research.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-gray-800/60 border border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Search className="w-6 h-6 text-primary-light" />
                Transactional & Solution LTKs
              </h3>
              <ul className="space-y-3 text-gray-200">
                <li>“final grade calculator if lowest quiz is dropped”</li>
                <li>“semester grade calculator with missing assignments”</li>
                <li>“multi part final exam grade tracker”</li>
                <li>“teacher weighted grade spreadsheet alternative”</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/weighted-vs-unweighted-grades"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-primary-light"
                >
                  Weighted vs Unweighted
                </Link>
                <Link
                  href="/college-grading-systems"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-primary-light"
                >
                  College Grading Systems
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-gray-800/60 border border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary-light" />
                Authority Guides
              </h3>
              <p className="text-gray-300 mb-4">
                Deep content pieces go beyond calculator instructions to explain grading math,
                behavioral science, and institutional nuances—boosting E-E-A-T signals.
              </p>
              <ul className="space-y-3 text-gray-200">
                <li>How to Calculate Final Grade (1,500+ words)</li>
                <li>Grade Calculator Guide (teacher-focused)</li>
                <li>What Grade Do I Need? (FAQ / schema)</li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/how-to-calculate-final-grade"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-primary-light"
                >
                  Read the flagship guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile & Retention */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Mobile-first UX for long-term grade tracking
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Students increasingly rely on native-style experiences (Notan, Grades) to monitor GPA
              across semesters. Our responsive web app mirrors those expectations so a free tool can
              still feel premium.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Smartphone,
                  title: 'Pocket Dashboard',
                  description:
                    'Sticky bottom CTA, large tap targets, and offline-safe inputs make quick check-ins painless between classes.',
                },
                {
                  icon: BellRing,
                  title: 'Reminder Hooks',
                  description:
                    'Opt-in email + future push notifications keep finals week on radar—critical for transforming one-time visitors into retained users.',
                },
                {
                  icon: Activity,
                  title: 'Performance Visuals',
                  description:
                    'Charts highlight strengths vs risk zones so students can reallocate time the same way mobile apps highlight streaks.',
                },
                {
                  icon: Brain,
                  title: 'AI Study Nudges',
                  description:
                    'Contextual tips interpret projections (“98% needed = escalate to professor”) rather than dumping raw numbers.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center gap-2 text-primary dark:text-primary-light mb-2">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-primary text-white p-8 shadow-xl flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/70 mb-3">Retention Focus</p>
              <h3 className="text-2xl font-bold mb-4">
                Turn a single calculation into semester-long engagement
              </h3>
              <p className="text-white/90">
                Export scenarios, sync across devices, and receive nudges when grades dip below your
                target threshold. These loops are how we compete with native subscription apps while
                keeping the core tool free.
              </p>
            </div>
            <Link
              href="/calculators"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-6 py-3 text-primary font-semibold hover:bg-white"
            >
              View All Calculators
              <Sparkles className="w-5 h-5 text-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: 'How often should I update my grades?',
                answer:
                  'Update after every graded assignment to keep projections accurate. Frequent updates reveal trends and help you identify areas that need attention early.',
              },
              {
                question: 'Can this handle weighted grading systems?',
                answer:
                  'Yes. Add categories with their respective weights and the calculator computes totals instantly, giving you a detailed breakdown you can revisit anytime.',
              },
              {
                question: 'How does this help with scholarship goals?',
                answer:
                  'Track GPA requirements for each class and identify high-impact assignments. This helps you protect funding and document your progress effectively.',
              },
              {
                question: 'Will this work for curved classes?',
                answer:
                  'Add estimated curve adjustments to model different scenarios. You can compare no-curve versus curved outcomes side by side.',
              },
              {
                question: 'Can parents or tutors use this tool?',
                answer:
                  'Absolutely. Share your calculations so everyone works from the same data. This makes collaboration and support much more effective.',
              },
              {
                question: 'Is my data stored or saved?',
                answer:
                  'All data stays in your browser session for privacy. You can export results when needed, then start fresh next term.',
              },
              {
                question: 'How do I track multiple classes?',
                answer:
                  'Use separate browser tabs for each course, or export results to a spreadsheet. This lets you maintain a master view of all your classes.',
              },
              {
                question: 'What if I need more than 100% on my final?',
                answer:
                  'If the calculator shows you need above 100%, your target may be unrealistic. Use this as a conversation starter with your professor about extra credit or adjusting your goal.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/25 flex items-center justify-center font-semibold text-primary dark:text-primary-light">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Understanding Grade Calculations
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                How It Works
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This tool calculates the score you need on remaining assessments to reach your
                target course grade. Simply enter your current average, exam weight, and desired
                outcome—the math is handled instantly.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 text-sm text-gray-700 dark:text-gray-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                  <span>Remove guesswork before high-stakes exams</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                  <span>Understand if your target grade is realistic</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                  <span>Have data-driven conversations with instructors</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                  <span>Plan multiple what-if scenarios</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                The Formula
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Final Grade = (Current Grade × (100 − Final Weight) + Final Exam Score × Final
                Weight) ÷ 100
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-2xl p-6 text-sm text-gray-700 dark:text-gray-200">
                <strong className="block text-gray-900 dark:text-white mb-2">Example</strong>
                <p>
                  With an 85% current grade, a final exam worth 30%, and a target of 90%, you would
                  need to score 96% on your final. If that seems too high, consider adjusting your
                  target or exploring extra credit opportunities.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Key Benefits
              </h3>
              <div className="grid gap-4 sm:grid-cols-3 text-sm text-gray-700 dark:text-gray-200">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4">
                  <strong className="block text-gray-900 dark:text-white mb-2">Goal Setting</strong>
                  Map exact scores needed to meet scholarship or honor roll requirements.
                </div>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4">
                  <strong className="block text-gray-900 dark:text-white mb-2">Stress Relief</strong>
                  Replace uncertainty with precise, actionable numbers.
                </div>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-4">
                  <strong className="block text-gray-900 dark:text-white mb-2">Time Management</strong>
                  Prioritize study time based on what matters most.
                </div>
              </div>
            </div>
          </div>

      <div className="mt-12 text-center">
        <Link
          href="/how-to-calculate-final-grade"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          Learn More About Grade Calculations
        </Link>
      </div>
    </div>
  </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Stay on Track All Semester
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Bookmark this Final Grade Calculator page and check back after each assignment to stay informed about your
            progress. Regular updates help you maintain momentum and avoid surprises at the end of
            the term.
          </p>
        </div>
      </section>
    </div>
  );
}
