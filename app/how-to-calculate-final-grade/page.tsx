import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import { Calculator, BookOpen, TrendingUp } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Final Grade Calculator: Formula & Examples',
  description:
    'Master the final-grade formula, walk through real examples, and use our Final Grade Calculator to see exactly what score you need on your last exam.',
  keywords: [
    'how to calculate final grade',
    'final grade formula',
    'calculate my final grade',
    'final exam grade calculation',
    'grade calculation steps',
  ],
  canonical: '/how-to-calculate-final-grade/',
});

export default function HowToCalculateFinalGrade() {
  const faqItems = [
    {
      question: 'Does the final count as a test or as its own category?',
      answer:
        'Use the final exam weight listed in your syllabus. If the final counts as a regular test, include it in the test category with the weighted grade calculator; if it has its own percentage, use the final grade calculator with that exact weight.',
    },
    {
      question: 'How do I calculate a two-part final exam?',
      answer:
        'Combine both parts into one final score first. For example, if the written final is 70% of the final and the presentation is 30%, calculate that blended final score, then enter the final category weight in the calculator.',
    },
    {
      question: 'What if I already took the final?',
      answer:
        'Switch from “what do I need” to a projected final grade calculation. Enter your current grade before the final, the final exam score you actually received, and the final weight to estimate the course grade.',
    },
    {
      question: 'How often should I recalculate my grades?',
      answer:
        'Update your projections every time a new score appears. Frequent recalculations keep your plan accurate and help you adjust quickly to stay motivated.',
    },
    {
      question: 'What if my goal changes mid-semester?',
      answer:
        'Adjust your target and run new scenarios. When your goal changes, update your study schedule accordingly to keep progress aligned.',
    },
    {
      question: 'Can participation points influence my grade?',
      answer:
        'Yes. Include participation percentages so your estimate reflects every graded category listed in the syllabus.',
    },
    {
      question: 'Do extra credit opportunities help?',
      answer:
        'Absolutely. Add extra credit to your calculator to see how those points raise your projection and bring you closer to your goal.',
    },
  ];

  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to calculate your final grade',
    description:
      'Calculate a needed final exam score from current grade, target grade, and final exam weight, including common test-category and two-part-final cases.',
    image: 'https://finalgradecalculator.app/product-screenshot.png',
    totalTime: 'PT2M',
    tool: [{ '@type': 'HowToTool', name: 'Final Grade Calculator' }],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Find your current grade before the final',
        text: 'Use the course grade shown before the final exam, including graded assignments already posted in the LMS.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Confirm how the final is weighted',
        text: 'Check whether the final counts as its own category or as a test. Enter the exact final exam weight from the syllabus.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Enter your target grade',
        text: 'Choose the course grade you want, such as the minimum percentage for an A or the passing grade required by your program.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Read the required final score',
        text: 'Use the returned percentage to decide whether the target is achievable, requires extra credit, or should be adjusted.',
      },
    ],
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
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
        name: 'How to Calculate Final Grade',
        item: 'https://finalgradecalculator.app/how-to-calculate-final-grade/',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <JsonLd id="howto-calculate-final-grade-schema" data={howToStructuredData} />
      <JsonLd id="howto-calculate-final-grade-faq-schema" data={faqStructuredData} />
      <JsonLd id="howto-calculate-final-grade-breadcrumb-schema" data={breadcrumbStructuredData} />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How to Calculate Your Final Grade: Complete Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Master the art of calculating your final grade with our step-by-step guide. Learn the
            formula, understand weighted grades, and discover how to calculate what you need on
            your final exam to achieve your target grade.
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Final Grade Calculations
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Calculating your final grade is essential for academic planning and success. Whether
              you want to know what score you need on your final exam to get an A, or you're
              curious about how your current performance will affect your overall outcome,
              understanding the calculation process is crucial.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Our calculator uses a straightforward formula that takes into account your current
              grade and exam weight to determine exactly what you need to achieve your target.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Most courses use a weighted grading system where different components contribute
              different percentages to your overall grade. For example, homework might be 20%,
              quizzes 20%, midterm 30%, and final exam 30%. To calculate accurately, you need to
              understand how each component contributes and what exam score is needed to reach your
              desired outcome.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Final Grade Calculation Formula
            </h2>
            <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Basic Formula
              </h3>
              <p className="text-gray-800 dark:text-gray-200 font-mono text-lg mb-2">
                Final Grade = (Current Grade × Current Weight) + (Final Exam Score × Final Weight)
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Where Current Weight = 100% - Final Exam Weight
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              To calculate your grade, multiply your current grade by the percentage it represents
              of your total, then add the final exam score multiplied by its weight.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              For instance, if your current grade is 85% and represents 70% of your total, and your
              final exam is worth 30%, the calculation would be: (85 × 0.70) + (Final Exam Score × 0.30).
              This formula is the foundation for understanding exactly how your exam performance will
              impact your overall outcome.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Step-by-Step: How to Calculate What You Need on Your Final Exam
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Determine Your Current Grade
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      First, calculate your current grade before the final exam. Add up all your
                      scores from homework, quizzes, tests, and projects according to their weights.
                      Many professors provide this information on your course portal, or you can
                      calculate it manually using a weighted grade calculator.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Find the Final Exam Weight
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Check your course syllabus to find what percentage of your total grade the
                      final exam represents. Common weights are 20%, 25%, 30%, or 40%. This weight
                      is crucial because it determines how much impact your exam score will have on
                      your overall outcome. A higher weight means the exam has more influence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Set Your Target Final Grade
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Decide what you want to achieve in the course. Do you need a 90% for an A? Or
                      would you be satisfied with an 80% for a B? Your target will determine what
                      score you need on the final exam. Be realistic—if you currently have a 70% and
                      the final is only worth 20%, getting an A might not be mathematically possible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Apply the Formula to Calculate Final Grade Needed
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Use this formula to calculate what you need on your final exam:
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-mono bg-gray-100 dark:bg-gray-900/40 p-3 rounded">
                      Needed Score = (Target Grade - Current Grade × (100 - Final Weight)) ÷ Final Weight
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-3">
                      For example, if you have an 85% current grade, want a 90% final grade, and
                      your final is worth 30%: (90 - 85 × 0.70) ÷ 0.30 = (90 - 59.5) ÷ 0.30 =
                      101.67%. This means you would need over 100% to reach your goal, so you might
                      need to adjust your target or look for extra credit opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Practical Examples of Final Grade Calculations
            </h2>

            <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Example 1: Achievable Goal
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Current Grade:</strong> 88%</li>
                <li><strong>Final Exam Weight:</strong> 25%</li>
                <li><strong>Target Grade:</strong> 90%</li>
                <li><strong>Calculation:</strong> (90 - 88 × 0.75) ÷ 0.25 = 96%</li>
                <li className="text-success font-semibold">
                  Result: You need to score 96% on your final exam to achieve a 90% final grade.
                  This is challenging but achievable with good preparation.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 dark:from-secondary/20 dark:to-primary/20 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Example 2: Easy Goal
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Current Grade:</strong> 92%</li>
                <li><strong>Final Exam Weight:</strong> 30%</li>
                <li><strong>Target Grade:</strong> 90%</li>
                <li><strong>Calculation:</strong> (90 - 92 × 0.70) ÷ 0.30 = 85.33%</li>
                <li className="text-success font-semibold">
                  Result: You only need 85.33% on your final exam to maintain a 90% final grade.
                  Your strong current performance gives you flexibility on the final.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-warning/10 to-accent/10 dark:from-warning/20 dark:to-accent/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Example 3: Difficult Goal
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><strong>Current Grade:</strong> 78%</li>
                <li><strong>Final Exam Weight:</strong> 20%</li>
                <li><strong>Target Grade:</strong> 85%</li>
                <li><strong>Calculation:</strong> (85 - 78 × 0.80) ÷ 0.20 = 113%</li>
                <li className="text-error font-semibold">
                  Result: You would need 113% on your final exam, which is impossible. Consider
                  adjusting your target grade or speaking with your professor about extra credit.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Final exam edge cases students search for
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  If the final counts as a test
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Some syllabi treat the final as one more test instead of a separate final-exam category. In that case, first calculate the test-category average with the final included, then use the weighted calculator to roll that category into the full course grade.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Two-part final exam
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When the final has a written exam plus a project, lab, presentation, or oral component, blend those parts into one final score using their sub-weights. Then enter that combined final category in the calculator.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Already took the final
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  If you already know your final exam score, use the prediction mode instead of the needed-score mode. Enter the final score you received to estimate the final course grade and compare it with the letter-grade cutoff.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Tips for Successful Final Grade Management
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary dark:text-primary-light" />
                  Calculate Early and Often
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Don't wait until the last minute to check your progress. Use a grade calculator
                  throughout the semester to track your standing and adjust your study habits
                  accordingly. Regular calculations help you stay on track and avoid surprises.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary dark:text-primary-light" />
                  Focus on High-Weight Items
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When planning your study strategy, prioritize assignments and exams with higher
                  weights. A 30% final exam has more impact than a 5% homework assignment, so
                  allocate your study time accordingly.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary dark:text-primary-light" />
                  Understand Your Grading Scale
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Different institutions use different grading scales. Know whether you need a 90%
                  or 93% for an A when you calculate your final grade. This affects your target
                  setting and final exam preparation strategy, ensuring the final grade lines up with your goals.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Plan for Multiple Scenarios
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use a final grade calculator to explore different scenarios. What if you get a B
                  on the final? What about an A? Understanding these possibilities helps you set
                  realistic expectations and prepare mentally for different outcomes, so the final grade never catches you off guard.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Common Mistakes When Calculating Final Grades
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-error pl-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Forgetting to Convert Weights to Decimals
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When you calculate your final grade, remember that 30% should be 0.30 in the
                  formula, not 30. This is one of the most common errors in final grade calculations,
                  and it can throw off your final grade by several points.
                </p>
              </div>
              <div className="border-l-4 border-warning pl-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Using the Wrong Current Grade
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Make sure your current grade reflects all completed work, not just your most
                  recent test. A final grade calculator needs accurate input to give you reliable
                  results, and an outdated average can drag your final grade lower than expected.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Ignoring Dropped Grades or Curves
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Some professors drop the lowest quiz or curve final grades. Factor these policies
                  into your calculations, as they can significantly affect what you need to achieve
                  your target final grade and can even boost your final grade without additional work.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Final Grade FAQ
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Calculate Your Final Grade?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Use our free final grade calculator to instantly determine what you need on your
              final exam. No more manual calculations - get accurate results in seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg"
            >
              <Calculator className="w-6 h-6" />
              Use Final Grade Calculator
            </Link>
          </section>

          <section className="py-16">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <h2>Stay Organized and Focused</h2>
              <p>
                Begin each week by reviewing your current standing and identifying tasks that will
                have the biggest impact. This ritual keeps your priorities organized and tied to
                measurable outcomes.
              </p>
              <p>
                Break large assignments into checkpoints and note the weight of each milestone. When
                you understand how much every step influences your outcome, you can schedule focused
                work sessions instead of rushing before deadlines.
              </p>
              <p>
                Share your academic roadmap with a mentor or tutor. Talking through your targets out
                loud often reveals hidden obstacles and sparks creative solutions.
              </p>
              <p>
                After every quiz or paper, pause to celebrate progress and adjust your tracker.
                Seeing trends in real time reinforces good habits and highlights areas that deserve
                extra attention.
              </p>
              <ul>
                <li>Log your goals at the top of every study session agenda</li>
                <li>Color-code planner entries based on assignment weights</li>
                <li>Celebrate progress, even small improvements</li>
                <li>Review your projections twice a month to stay on track</li>
              </ul>
              <p>
                Remember that success is the cumulative result of consistent effort. Keep refining
                your systems so your semester outcome reflects both skill and strategy.
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
