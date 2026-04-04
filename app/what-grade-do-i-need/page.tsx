import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import Link from 'next/link';
import { HelpCircle, Calculator } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'What Grade Do I Need on My Final? — Free Calculator',
  description:
    'Enter your current grade and exam weight to find the exact score needed. Visual scenario chart shows achievable vs stretch goals.',
  keywords: [
    'what grade do i need',
    'grade questions',
    'final exam faq',
    'grade calculator faq',
    'academic planning',
  ],
  canonical: '/what-grade-do-i-need',
});

export default function WhatGradeDoINeedPage() {
  const faqs = [
    {
      question: 'What grade do I need on my final exam to get an A?',
      answer:
        'Start by opening our calculator and entering your current grade, the weight of your final exam, and your target (typically 90% or 93% for an A, depending on your school). The calculator instantly shows you the precise score you need.',
    },
    {
      question: 'How do I calculate what I need on my final?',
      answer:
        'Use the formula: Needed Grade = (Target Grade - Current Grade × (100 - Final Weight)) ÷ Final Weight. For example, with an 85% current grade, a 90% target, and a 30% final: (90 - 85 × 0.70) ÷ 0.30 = 101.67%. Our calculator handles the math instantly.',
    },
    {
      question: 'What if I need more than 100% on my final exam?',
      answer:
        'Sometimes the required score is higher than 100%, meaning your target is mathematically impossible with your current performance. Adjust your goal, ask about extra credit, or talk to your professor about retakes. Revisit the calculator after each new opportunity is confirmed.',
    },
    {
      question: 'Can I still pass if I fail my final exam?',
      answer:
        'Whether you pass after a poor final depends on weight and current average. Enter several hypothetical final scores to see if you can stay above the passing threshold. If your current grade is strong and the final has lower weight, passing may still be within reach.',
    },
    {
      question: 'How accurate is the calculator?',
      answer:
        'The calculator is mathematically accurate based on the data you enter. Actual results can vary if your professor curves grades, drops the lowest score, or offers bonus points. Update the inputs anytime policies change to maintain accuracy.',
    },
    {
      question: 'What is a weighted grade?',
      answer:
        'A weighted grade means assignments, labs, quizzes, and exams each count differently. Enter each category and its percentage into our weighted grade calculator to see what you need in every remaining category to reach your target.',
    },
    {
      question: 'How do I convert my percentage to a letter grade?',
      answer:
        'Use our grade converter to switch between percentages, letter grades, and GPA ranges. Once you know the cutoff, plug it back into the calculator to confirm the score you need.',
    },
    {
      question: 'What do I need to maintain my GPA?',
      answer:
        'To keep your GPA steady, identify the required grade in each class based on its credit hours. Higher credit courses influence your cumulative GPA more, so prioritize those. Revisit weekly to stay on track.',
    },
    {
      question: 'What do I need to keep my scholarship?',
      answer:
        'Scholarships often specify a GPA floor. Enter each course into the calculator, mark credit hours, and run scenarios until you have a concrete list you can share with advisors or family members.',
    },
    {
      question: 'What do I need after missing an assignment?',
      answer:
        'A zero can feel devastating, but the calculator quickly shows your recovery path. Set the missing assignment to zero, adjust weights, and see what you need on upcoming tests or projects to offset the setback.',
    },
    {
      question: 'What do I need to raise my average before break?',
      answer:
        'Progress reports highlight weak spots. Input the remaining assignments, and the calculator displays what you need in each category. Plan study sessions, tutoring, or extra credit around those targets.',
    },
    {
      question: 'What do I need on group projects?',
      answer:
        'Group work adds variables you can\'t control. Calculate your target individually and share the data with teammates. When everyone knows the goal, you can divide tasks strategically and monitor progress.',
    },
    {
      question: 'What if grading scales change?',
      answer:
        'Syllabus updates can reshape your targets overnight. Enter the new percentages as soon as they\'re announced, confirm the math with your professor, and document the revised plan.',
    },
    {
      question: 'What do I need to offset a poor quiz average?',
      answer:
        'If quizzes are dragging you down, run the calculator to find what you need on upcoming quizzes or alternative assessments to bounce back. Share the results with your instructor for feedback on study strategies.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
            <HelpCircle className="w-8 h-8 text-primary dark:text-primary-light" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Grade Do I Need? FAQ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            This question shows up every time deadlines approach. Use this page to translate worry
            into actionable numbers, whether you're preparing for finals, protecting a scholarship,
            or balancing multiple courses.
          </p>
        </header>

        <section className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p>
            Before diving into individual questions, take a moment to outline each class, the weight
            of remaining assignments, and any bonus opportunities. When you write down these details,
            the task starts to feel manageable instead of overwhelming.
          </p>
          <p>
            You can evaluate each course separately, understand where you stand, and prioritize the
            assessments that affect your outcome the most.
          </p>
          <p>
            Another helpful step is converting your concerns into a time-based plan. Create a calendar
            that marks when projects, labs, and exams occur. For every entry, note the score you need
            to feel comfortable with the outcome. This forward-looking approach encourages steady
            progress and keeps you from cramming at the last minute.
          </p>
          <div className="not-prose mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Setup Checklist</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li>Gather syllabi and highlight category weights.</li>
                <li>List bonus or replacement opportunities.</li>
                <li>Record current scores before opening the calculator.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Planning Grid</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li>Mark exam dates and note required scores.</li>
                <li>Block study time proportional to assessment weight.</li>
                <li>Share the schedule with tutors or study partners.</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-6 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {faq.question}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Calculate Your Grade Now
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Use our free calculator to find out exactly what grade you need on upcoming assignments,
            finals, and bonus work so you can stay in control from start to finish.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Use Final Grade Calculator
          </Link>
        </div>

        <section className="prose prose-lg dark:prose-invert max-w-none mt-12">
          <p>
            After every major submission, pause to reassess your targets. Update the numbers, capture
            your new goal, and reflect on what helped you hit the previous milestone. Making this a
            habit keeps you proactive instead of reactive.
          </p>
          <p>
            Share your plan with classmates, tutors, or family members so they understand your goals.
            Accountability transforms stress into a roadmap for consistent progress.
          </p>
          <p>
            Whenever anxiety spikes, pause and run the numbers again. The simple act of calculating
            restores control and keeps your energy focused on steps that move the scoreboard.
          </p>
          <div className="not-prose grid gap-4 md:grid-cols-3 mt-10">
            {[
              'Keep a running “next target” sticky note by your workspace.',
              'Celebrate when the needed score drops—proof your plan is working.',
              'Archive each course after finals for future scholarships or grad apps.',
            ].map((tip) => (
              <div
                key={tip}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-5 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
              >
                {tip}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
