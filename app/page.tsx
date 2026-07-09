import { Metadata } from 'next';
import FinalGradeCalculator from '@/components/FinalGradeCalculator';
import JsonLd from '@/components/JsonLd';
import StickyCalculatorCta from '@/components/StickyCalculatorCta';
import TrackedLink from '@/components/TrackedLink';
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
  title: 'Final Grade Calculator — What Score Do I Need on My Final? (Free & Instant)',
  description:
    'Get the exact score you need on your final exam in seconds. Free final grade calculator — no signup, no ads, works on mobile. Enter current grade, target grade, and final weight.',
  keywords: [
    'final grade calculator',
    'what score do i need on my final',
    'course grade calculator',
    'final exam calculator',
    'student grade calculator',
  ],
  canonical: '/',
  appendSiteName: false,
});

export default function Home() {
  const defaultAnswer = '94.00%';
  const defaultFormula = '(88 - 86 × 0.75) ÷ 0.25 = 94.00';
  const homeFaqs = [
    {
      question: 'How do I calculate what grade I need on my final?',
      answer:
        'Use required final score = (target grade - current grade × (1 - final weight)) ÷ final weight. Enter final weight as a decimal in the formula or as a percentage in the calculator.',
    },
    {
      question: 'What score do I need on my final to get an A?',
      answer:
        'Enter your current grade, set your target to the minimum A grade used by your school, and enter the final exam weight. The calculator returns the required final exam percentage.',
    },
    {
      question: 'What if I need more than 100% on the final?',
      answer:
        'Your target is not reachable from the current grade and final weight without extra credit, grade changes, or a lower target.',
    },
    {
      question: 'Should I use the final grade calculator or weighted grade calculator?',
      answer:
        'Use the final grade calculator for one final exam. Use the weighted calculator when homework, quizzes, labs, projects, missing work, or dropped assignments affect your grade.',
    },
    {
      question: 'Does the calculator use percentages or decimals?',
      answer:
        'Enter percentages in the tool, such as 30 for a final worth 30%. The formula treats 30% as 0.30.',
    },
  ];
  const finalGradeExamples = [
    {
      current: '82%',
      target: '90%',
      weight: '30%',
      needed: '108.67%',
      interpretation: 'You need extra credit or a lower target.',
    },
    {
      current: '86%',
      target: '88%',
      weight: '25%',
      needed: '94.00%',
      interpretation: 'Achievable if the final exam goes well.',
    },
    {
      current: '91%',
      target: '90%',
      weight: '20%',
      needed: '86.00%',
      interpretation: 'You have a small cushion before the final.',
    },
  ];
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
    image: 'https://finalgradecalculator.app/product-screenshot.png',
    isAccessibleForFree: true,
    description:
      'Final Grade Calculator shows the exact score needed on finals, supports weighted categories, and visualizes scenarios for rapid study planning.',
    url: 'https://finalgradecalculator.app/',
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
    ],
  };

  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to calculate the grade you need on your final exam',
    description:
      'Enter your current grade, target grade, and final exam weight to calculate the required final exam score.',
    image: 'https://finalgradecalculator.app/product-screenshot.png',
    totalTime: 'PT1M',
    supply: [
      { '@type': 'HowToSupply', name: 'Current course grade percentage' },
      { '@type': 'HowToSupply', name: 'Target course grade percentage' },
      { '@type': 'HowToSupply', name: 'Final exam weight percentage' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter your current grade',
        text: 'Type the current course grade shown in your gradebook as a percentage.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set the final exam weight',
        text: 'Enter the final exam weight as a percentage, such as 25 for a final worth 25%.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose your target grade',
        text: 'Enter the course grade you want to finish with.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Read the required score',
        text: 'Review the required final exam percentage and next-step recommendation.',
      },
    ],
  };

  const siteNavigationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Final Grade Calculator internal study paths',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'How to Calculate Final Grade',
        url: 'https://finalgradecalculator.app/how-to-calculate-final-grade/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Weighted Grade Calculator',
        url: 'https://finalgradecalculator.app/weighted-grade-calculator/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'What Grade Do I Need on My Final',
        url: 'https://finalgradecalculator.app/what-grade-do-i-need/',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Grade Converter',
        url: 'https://finalgradecalculator.app/grade-converter/',
      },
    ],
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Final Grade Calculator',
    url: 'https://finalgradecalculator.app/',
    inLanguage: 'en-US',
    description: 'Free final grade calculator and grade planning guides for students.',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 dark:from-gray-900 dark:to-gray-800 sm:pb-0">
      <JsonLd id="breadcrumb-schema" data={breadcrumbStructuredData} />
      <JsonLd id="faq-schema" data={faqStructuredData} />
      <JsonLd id="software-schema" data={softwareStructuredData} />
      <JsonLd id="howto-schema" data={howToStructuredData} />
      <JsonLd id="site-navigation-schema" data={siteNavigationStructuredData} />
      <JsonLd id="website-schema" data={websiteStructuredData} />
      <StickyCalculatorCta />
      {/* Hero Section */}
      <section className="overflow-hidden px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">
            Final Grade Calculator · updated July 9, 2026
          </p>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Final Grade Calculator
          </h1>
          <p className="mx-auto max-w-4xl text-base text-gray-600 dark:text-gray-300 sm:text-xl">
            What score do I need on my final? Enter your current course grade, target course grade, and final exam weight. The calculator gives the exact required final exam score first.
          </p>

          <div id="calculator" className="mt-6 min-w-0 overflow-hidden rounded-3xl border border-gray-200 bg-white p-2 shadow-xl shadow-primary/10 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
            <FinalGradeCalculator />
          </div>

          <div className="mt-6 rounded-3xl border border-primary/25 bg-primary/5 p-5 text-left shadow-sm dark:border-primary-light/30 dark:bg-primary/10 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
                  Search intent shortcut
                </p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Pick the path that matches your gradebook
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Most visitors either need one final-exam score, a weighted category plan, or a quick letter/GPA conversion. Choose the matching path before you scroll.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <TrackedLink
                  href="#calculator"
                  eventName="search_intent_click"
                  eventProps={{ calculator_type: 'final_grade', intent_type: 'single_final_exam', source: 'intent_shortcut' }}
                  className="rounded-2xl border border-primary/30 bg-white px-4 py-3 text-sm font-bold text-gray-900 transition hover:border-primary hover:bg-primary/10 dark:border-primary-light/30 dark:bg-gray-900 dark:text-white"
                >
                  I need one final exam score
                </TrackedLink>
                <TrackedLink
                  href="/weighted-grade-calculator/"
                  eventName="search_intent_click"
                  eventProps={{ calculator_type: 'weighted_grade', intent_type: 'weighted_categories', source: 'intent_shortcut' }}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-900 transition hover:border-primary hover:bg-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  My class uses weighted categories
                </TrackedLink>
                <TrackedLink
                  href="/grade-converter/"
                  eventName="search_intent_click"
                  eventProps={{ calculator_type: 'grade_converter', intent_type: 'convert_grade', source: 'intent_shortcut' }}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-900 transition hover:border-primary hover:bg-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  Convert percent, letter, or GPA
                </TrackedLink>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-primary/30 bg-white text-left shadow-xl shadow-primary/10 dark:border-primary-light/30 dark:bg-gray-900">
            <div className="grid gap-0 md:grid-cols-[1fr_1.4fr]">
              <div className="border-b border-gray-200 p-6 dark:border-gray-800 md:border-b-0 md:border-r">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">
                  Quick answer
                </p>
                <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
                  What score do I need on my final?
                </h2>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  Default example: current grade 86%, target grade 88%, final exam weight 25%.
                </p>
                <p className="mt-5 text-5xl font-black tracking-tight text-primary dark:text-primary-light">
                  {defaultAnswer}
                </p>
                <p className="mt-3 text-sm font-semibold text-success">
                  You need {defaultAnswer} on your final exam. This target is achievable—focus your study time on reaching this score.
                </p>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Answer-first formula</p>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  To find the score you need on your final exam, enter your current course grade, your target course grade, and the final exam weight.
                </p>
                <p className="mt-3 overflow-hidden break-words rounded-2xl bg-gray-50 p-4 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                  Required final score = (target grade - current grade × (1 - final weight)) ÷ final weight<br />
                  {defaultFormula}
                </p>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  Final weight is a decimal in the formula, so 30% becomes 0.30. The calculator above loads with the same values.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
                  Final grade examples
                </p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Common “what grade do I need on my final?” scenarios
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 sm:max-w-sm">
                Use these examples to sanity-check the calculator before entering your own syllabus numbers.
              </p>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-[0.14em] text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <th className="py-3 pr-4">Current</th>
                    <th className="py-3 pr-4">Target</th>
                    <th className="py-3 pr-4">Final weight</th>
                    <th className="py-3 pr-4">Needed on final</th>
                    <th className="py-3">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {finalGradeExamples.map((example) => (
                    <tr key={`${example.current}-${example.target}-${example.weight}`}>
                      <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">{example.current}</td>
                      <td className="py-3 pr-4 text-gray-700 dark:text-gray-200">{example.target}</td>
                      <td className="py-3 pr-4 text-gray-700 dark:text-gray-200">{example.weight}</td>
                      <td className="py-3 pr-4 font-bold text-primary dark:text-primary-light">{example.needed}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">{example.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="#calculator"
              eventName="primary_calculator_cta_click"
              eventProps={{ calculator_type: 'final_grade', source: 'hero_cta', destination: '#calculator' }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark"
            >
              <Zap className="w-5 h-5" />
              Calculate the Score I Need
            </TrackedLink>
            <TrackedLink
              href="/weighted-grade-calculator/"
              eventName="primary_calculator_cta_click"
              eventProps={{ calculator_type: 'weighted_grade', source: 'hero_cta', destination: '/weighted-grade-calculator/' }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-8 py-3 text-base font-semibold text-gray-800 dark:text-gray-100 hover:border-primary dark:hover:border-primary-light"
            >
              <Calculator className="w-5 h-5" />
              Use Weighted Grade Calculator
            </TrackedLink>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Free, private, and built around the real student question: “what score do I need on my final?”
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
            <p className="font-bold">After you get the score, take one clear next step:</p>
            <ul className="mt-2 grid gap-2 sm:grid-cols-3">
              <li>Copy the result for your study notes.</li>
              <li>Share it with a tutor, parent, or classmate.</li>
              <li>Switch to weighted scenarios if your gradebook has categories.</li>
            </ul>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 text-left">
            {[
              {
                href: '/what-grade-do-i-need/',
                title: 'What grade do I need on my final?',
                description: 'Quick answer page for single-exam intent.',
              },
              {
                href: '/weighted-grade-calculator/',
                title: 'Weighted Grade Calculator',
                description: 'Use this when your course has multiple categories and weights.',
              },
              {
                href: '/grade-converter/',
                title: 'Grade Converter',
                description: 'Convert percentages, letters, and GPA before planning your target.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 p-5 shadow-sm transition hover:border-primary dark:hover:border-primary-light"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-left dark:border-primary-light/30 dark:bg-primary/10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
              Start with the page that matches your syllabus
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: '/how-to-calculate-final-grade/',
                  label: 'Formula guide',
                  copy: 'Step-by-step final grade formula, examples, and edge cases.',
                },
                {
                  href: '/weighted-grade-calculator/',
                  label: 'Weighted categories',
                  copy: 'Use this when homework, quizzes, labs, or projects have separate weights.',
                },
                {
                  href: '/what-grade-do-i-need/',
                  label: 'Fast answer page',
                  copy: 'Answer the exact question “what grade do I need on my final?”',
                },
                {
                  href: '/grade-converter/',
                  label: 'Convert grades first',
                  copy: 'Turn letters, GPA, or percentages into the same scale before calculating.',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-primary/20 bg-white p-4 shadow-sm transition hover:border-primary hover:bg-primary/10 dark:border-primary-light/30 dark:bg-gray-900 dark:hover:border-primary-light"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</span>
                  <span className="mt-2 block text-xs leading-5 text-gray-600 dark:text-gray-300">{item.copy}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/60">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, free, and private grade math
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-10">
            Use the calculator without an account, understand the formula, and check the updated FAQ when your syllabus has edge cases.
          </p>
          <div className="grid md:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: ShieldCheck,
                title: 'Free to use',
                description:
                  'No signup wall. Open the page, enter three numbers, and get the required final exam score immediately.',
              },
              {
                icon: SlidersHorizontal,
                title: 'Private inputs',
                description:
                  'Your grade values stay in the browser. Analytics events track interaction quality, not personal course data.',
              },
              {
                icon: Calculator,
                title: 'Formula shown',
                description:
                  'Required final score = (target grade - current grade × (1 - final weight)) ÷ final weight.',
              },
              {
                icon: BookOpen,
                title: 'Updated FAQ',
                description:
                  'Answers cover impossible scores, percentage-vs-decimal weight, and when to use the weighted calculator.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-left"
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
              cta: { href: '/weighted-grade-calculator/', label: 'Open Weighted Calculator' },
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
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
            The Final Grade Calculator turns last-minute uncertainty into one clear number: the score you need on the final exam, plus the next action if that score is realistic or impossible.
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
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
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
              href="/weighted-grade-calculator/"
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
              href="/grade-converter/"
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
            Who this calculator helps
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
              playbook points you to the simplest next step, whether you need dropped scores, multi-part finals,
              or missing-work assumptions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Ignore Lowest Scores',
                description:
                  'Input every quiz as raw points, flag the number to drop, and let the calculator zero-out before recomputing weights.',
                link: { href: '/grade-calculator-guide/', label: 'Guide: Drop-Lowest Workflow' },
              },
              {
                title: 'Multi-Part Finals',
                description:
                  'Model finals split across essays, labs, and oral exams by allocating sub-weights that roll up to the final exam bucket.',
                link: {
                  href: '/weighted-grade-calculator/',
                  label: 'Build Custom Final Structure',
                },
              },
              {
                title: 'Missing / Future Work',
                description:
                  'Toggle between “treat missing as 0” vs “exclude from denominator” so projections stay honest about incomplete categories.',
                link: {
                  href: '/what-grade-do-i-need/',
                  label: 'FAQ: Handling Missing Work',
                },
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
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

      {/* Helpful Guides */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-white">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need more than one final-exam score?</h2>
            <p className="text-lg text-gray-200 max-w-4xl mx-auto">
              Start with the score you need today. If your class has missing assignments, dropped quizzes,
              or unusual grading rules, use these guide pages to choose the right calculator.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-gray-800/60 border border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Search className="w-6 h-6 text-primary-light" />
                Common student situations
              </h3>
              <ul className="space-y-3 text-gray-200">
                <li>Your final is not enough to reach the target without extra credit.</li>
                <li>Your course drops the lowest quiz or homework score.</li>
                <li>Your final has separate parts such as an exam, project, and lab.</li>
                <li>Your teacher reports grades by weighted categories instead of one average.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/weighted-vs-unweighted-grades/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-primary-light"
                >
                  Weighted vs Unweighted
                </Link>
                <Link
                  href="/college-grading-systems/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-primary-light"
                >
                  College Grading Systems
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-gray-800/60 border border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary-light" />
                Formula and FAQ guides
              </h3>
              <p className="text-gray-300 mb-4">
                If the answer looks surprising, read the formula and examples before changing your study plan.
                The guides explain percentages, course weights, and common LMS rounding differences.
              </p>
              <ul className="space-y-3 text-gray-200">
                <li>How to Calculate Final Grade (1,500+ words)</li>
                <li>Grade Calculator Guide (teacher-focused)</li>
                <li>What Grade Do I Need? (FAQ / schema)</li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/how-to-calculate-final-grade/"
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
              href="/calculators/"
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
            {homeFaqs.map((item, index) => (
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
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  With an 82% current grade, a final exam worth 25%, and a target of 88%, you would
                  need to score 90.00% on your final. If that feels high, try adjusting your target or
                  exploring extra credit opportunities.
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
          href="/how-to-calculate-final-grade/"
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
