import { Metadata } from 'next';
import WeightedGradeCalculator from '@/components/WeightedGradeCalculator';
import JsonLd from '@/components/JsonLd';
import { generateMetadata } from '@/lib/seo';
import Link from 'next/link';
import {
  Calculator,
  BarChart3,
  Target,
  CalendarCheck,
  ClipboardCheck,
  Share2,
  TrendingUp,
  PieChart,
  FileSpreadsheet,
  Users,
} from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Weighted Grade Calculator | Category Grade Planner',
  description:
    'Calculate weighted grades across assignments, quizzes, and exams. Supports drop-lowest rules, missing work as zero, and custom category weights.',
  keywords: [
    'weighted grade calculator',
    'grade weight calculator',
    'calculate weighted average',
    'weighted average calculator',
    'course grade calculator',
  ],
  canonical: '/weighted-grade-calculator/',
  appendSiteName: false,
});

export default function WeightedGradeCalculatorPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Final Grade Calculator', item: 'https://finalgradecalculator.app/' },
        { '@type': 'ListItem', position: 2, name: 'Weighted Grade Calculator', item: 'https://finalgradecalculator.app/weighted-grade-calculator/' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Weighted Grade Calculator',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: 'https://finalgradecalculator.app/weighted-grade-calculator/',
      description:
        'Free web calculator for planning weighted course grades across assignments, quizzes, labs, projects, and exams.',
      image: 'https://finalgradecalculator.app/product-screenshot.png',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to calculate a weighted grade',
      description:
        'Add each grade category, enter syllabus weights, and review the weighted average projection.',
      image: 'https://finalgradecalculator.app/product-screenshot.png',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Add each category', text: 'Enter assignments, quizzes, labs, projects, and exams as separate categories.' },
        { '@type': 'HowToStep', position: 2, name: 'Enter weights', text: 'Type the percentage weight from your syllabus for each category.' },
        { '@type': 'HowToStep', position: 3, name: 'Review the projection', text: 'Check the weighted average and adjust upcoming scores to model your target.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <JsonLd id="weighted-grade-structured-data" data={structuredData} />
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Weighted Grade Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Calculate weighted grades across homework, quizzes, labs, and exams with custom category
            weights. See your current average, spot weak categories, and model exactly what you need
            to reach your target grade.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bookmark this tool so you can update it every time a score posts and keep insights close
            during study sessions.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <WeightedGradeCalculator />
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related grade planning pages</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-primary hover:text-primary dark:hover:text-primary-light">
              Final Grade Calculator
            </Link>
            <Link href="/what-grade-do-i-need/" className="rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-primary hover:text-primary dark:hover:text-primary-light">
              What Grade Do I Need on My Final?
            </Link>
            <Link href="/grade-converter/" className="rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-primary hover:text-primary dark:hover:text-primary-light">
              Grade Converter
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Why Students Rely on the Weighted Grade Calculator
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Turn complex syllabi into a dashboard that highlights priorities, reveals risks, and keeps
            every weighted category easy to read at a glance.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Calculator,
                title: 'Unlimited Grade Items',
                copy:
                  'Track homework, labs, exams, and extra credit with custom weights that mirror your syllabus.',
              },
              {
                icon: BarChart3,
                title: 'Transparent Breakdown',
                copy:
                  'See exactly how each category shapes your overall average so you can invest time where it pays off most.',
              },
              {
                icon: Target,
                title: 'Goal-Based Planning',
                copy:
                  'Set a target grade and let the calculator show the scores you need on upcoming assignments to stay on track.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/20 dark:via-transparent dark:to-primary/20 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/25 text-primary dark:text-primary-light mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1.6fr,1fr]">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm space-y-5">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Understand Weighted Categories
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Weighted systems assign different percentages to homework, labs, projects, and exams.
                Keep this tool open while you review feedback so you can adjust priorities the moment
                grades post.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                If you only need the exact score required on one upcoming exam, jump to our{' '}
                <Link href="/" className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-white underline underline-offset-4">
                  Final Grade Calculator
                </Link>{' '}
                for a faster single-final workflow.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 text-sm text-gray-700 dark:text-gray-200">
                {[
                  'Sample mix: Homework 20%, Quizzes 30%, Final Exam 50%.',
                  'Add participation or attendance as separate categories when they count.',
                  'Use alerts to catch weights that do not total 100% before they skew results.',
                  'Log comments next to categories so you remember instructor feedback.',
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
            <div className="bg-gradient-to-b from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-2xl p-6 space-y-4 h-fit">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-5 h-5" /> Core Formula
              </h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm">
                Weighted Grade = (Grade₁ × Weight₁ + Grade₂ × Weight₂ + … + Gradeₙ × Weightₙ) ÷
                Total Weight. Let the calculator crunch these numbers so you can double-check manual
                math before emailing professors or advisors.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Plan Your Semester with Confidence
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: CalendarCheck,
                  title: 'Weekly Reset',
                  copy: 'Add new grades every Friday so projections stay accurate.',
                },
                {
                  icon: TrendingUp,
                  title: 'Scenario Builder',
                  copy: 'Leave future assignments blank to see the scores required to hit your goal.',
                },
                {
                  icon: Share2,
                  title: 'Advisor Snapshot',
                  copy: 'Export the dashboard before meetings to turn conversations into action steps.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/25 flex items-center justify-center text-primary dark:text-primary-light">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Make the Most of the Weighted Grade Calculator
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Build a rhythm that keeps the dashboard clean, current, and ready for quick decisions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {[
                {
                  icon: CalendarCheck,
                  title: 'Semester Setup',
                  text: 'Load the syllabus on day one so category weights mirror your instructor’s plan.',
                },
                {
                  icon: ClipboardCheck,
                  title: 'Weekly Check-in',
                  text: 'Book a recurring 10-minute appointment to update scores and note takeaways.',
                },
                {
                  icon: Share2,
                  title: 'Advisor Snapshot',
                  text: 'Export a PDF before meetings to turn big-picture goals into actionable next steps.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/25 flex items-center justify-center text-primary dark:text-primary-light">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5" /> Collaboration Checklist
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li>Open the dashboard during group sessions so everyone sees real-time impact.</li>
                <li>Label shared folders “Weighted Targets” to keep resources easy to find.</li>
                <li>Archive each term to track progress across semesters and scholarships.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  Pair with Companion Tools
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  Combine the weighted grade calculator with our final grade calculator and grade
                  converter to build a complete academic command center.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  <Calculator className="w-5 h-5" /> Final Grade Tool
                </Link>
                <Link
                  href="/grade-converter/"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Users className="w-5 h-5" /> Grade Converter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Tips for Using the Weighted Grade Calculator
          </h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Check Your Course Syllabus
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Always reference your course syllabus to get the exact weight percentages for each
                grade category. Enter those numbers so every projection reflects real policies from
                day one, and update whenever instructors announce changes.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Keep Weights Equal to 100%
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                For accurate calculations, ensure all your grade item weights add up to exactly 100%.
                The calculator alerts you if totals fall short or exceed the requirement, keeping your
                projections trustworthy.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Update Regularly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Update your grades after every assignment result. Real-time updates keep projections
                aligned with your target and make this a reliable progress tracker.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Weighted Grade Calculator FAQ
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: 'How often should I update the calculator?',
                answer:
                  'Refresh the numbers every time a score posts. Frequent updates keep projections aligned with your true average and prevent last-minute surprises.',
              },
              {
                question: 'Can it handle dropped scores?',
                answer:
                  'Yes. Mark the lowest assignment as dropped and totals recalculate instantly. Add a short note so you remember which policy was applied.',
              },
              {
                question: 'What if the course uses points, not percentages?',
                answer:
                  'Convert points to percentages using the total possible score. The calculator will translate them into accurate weighted projections.',
              },
              {
                question: 'Does this help with group projects?',
                answer:
                  'Enter the project as its own category. Sharing the dashboard with teammates clarifies the score needed to hit your target grade.',
              },
              {
                question: 'Can it support scholarship planning?',
                answer:
                  'Track GPA minimums and watch the summary panel. When you are near a threshold, the calculator highlights where extra effort matters most.',
              },
              {
                question: 'What about planning a course retake?',
                answer:
                  'Duplicate the course and test potential retake scores. You will see how each scenario shifts your cumulative GPA before you commit.',
              },
              {
                question: 'Can parents or tutors view the data?',
                answer:
                  'Export a PDF or share a read-only link so supporters understand your progress and can offer focused feedback.',
              },
              {
                question: 'How do I keep the layout tidy?',
                answer:
                  'Group related categories, color-code columns, and archive finished terms. A clean layout makes weekly updates painless.',
              },
            ].map((item) => (
              <div
                key={item.question}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Related Grade Calculators
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Final Grade Calculator
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use this tool alongside the weighted calculator to determine what you need on your
                final exam to achieve your target grade.
              </p>
            </Link>
            <Link
              href="/grade-converter/"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Grade Converter
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Convert between percentages, letter grades, and GPA scores for comprehensive planning
                across all your courses.
              </p>
            </Link>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Stay Ahead with the Weighted Grade Calculator
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            Bookmark the dashboard, schedule a weekly reminder, and invite classmates so everyone
            benefits from consistent projections.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
          >
            <Calculator className="w-6 h-6" />
            Launch Weighted Grade Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
