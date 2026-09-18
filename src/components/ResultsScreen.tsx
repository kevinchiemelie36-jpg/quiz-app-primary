import React, { useEffect } from 'react';
import { QuizResult } from '../types';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle,
  XCircle,
  Percent,
  ArrowCounterClockwise,
  ArrowRight,
  Sparkle,
  BookOpen,
  Eye,
} from '@phosphor-icons/react';

interface ResultsScreenProps {
  result: QuizResult;
  onReviewIncorrect: () => void;
  onTryAgain: () => void;
  onChooseAnotherTopic: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  onReviewIncorrect,
  onTryAgain,
  onChooseAnotherTopic,
}) => {
  const { percentage, correctCount, incorrectCount, totalQuestions, subject, topic } = result;

  useEffect(() => {
    // Fire celebratory confetti if score is solid
    if (percentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#06B6D4', '#F59E0B', '#22C55E'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [percentage]);

  // Performance message
  let performanceTitle = 'Keep practicing!';
  let performanceMessage = 'Keep practicing! Reviewing your mistakes will help you improve.';
  let badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';

  if (percentage >= 80) {
    performanceTitle = 'Excellent work! 🌟';
    performanceMessage = 'Excellent work! You have a strong understanding of this topic.';
    badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (percentage >= 60) {
    performanceTitle = 'Good work! 👏';
    performanceMessage = 'Good work! Review the questions you missed and try again.';
    badgeColor = 'bg-indigo-50 text-indigo-800 border-indigo-200';
  }

  // Circular progress calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-lg shadow-slate-200/40 text-center animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold text-[#4F46E5] border border-indigo-100 mb-4">
            <Sparkle size={14} weight="fill" className="text-[#F59E0B]" />
            Test Finished
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#172033] tracking-tight">
            Test Complete! 🎉
          </h1>

          <p className="mt-1.5 text-sm sm:text-base font-medium text-slate-500">
            {subject} • <span className="font-bold text-slate-700">{topic}</span>
          </p>

          {/* Circular Score Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#E2E8F0"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={percentage >= 80 ? '#22C55E' : percentage >= 60 ? '#4F46E5' : '#F59E0B'}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black text-[#172033]">
                  {percentage}%
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  {correctCount} / {totalQuestions}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Message Box */}
          <div className={`mt-6 rounded-2xl border p-4.5 text-center ${badgeColor}`}>
            <h2 className="text-base font-black">{performanceTitle}</h2>
            <p className="mt-1 text-sm font-medium leading-relaxed">
              {performanceMessage}
            </p>
          </div>

          {/* Three Statistics Cards */}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
              <div className="flex justify-center mb-1 text-[#22C55E]">
                <CheckCircle size={22} weight="fill" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Correct
              </p>
              <p className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">
                {correctCount}
              </p>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4">
              <div className="flex justify-center mb-1 text-[#EF4444]">
                <XCircle size={22} weight="fill" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-800">
                Incorrect
              </p>
              <p className="text-2xl sm:text-3xl font-black text-red-950 mt-1">
                {incorrectCount}
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4">
              <div className="flex justify-center mb-1 text-[#4F46E5]">
                <Percent size={22} weight="bold" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                Accuracy
              </p>
              <p className="text-2xl sm:text-3xl font-black text-indigo-950 mt-1">
                {percentage}%
              </p>
            </div>
          </div>

          {/* Results Actions */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col gap-3">
            {incorrectCount > 0 ? (
              <button
                id="results-review-incorrect-btn"
                onClick={onReviewIncorrect}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-50 border-2 border-indigo-200 py-3.5 px-6 text-base font-bold text-[#4F46E5] hover:bg-indigo-100 active:scale-98 transition-all"
              >
                <Eye size={20} weight="bold" />
                Review Incorrect Answers ({incorrectCount})
              </button>
            ) : (
              <button
                id="results-review-all-btn"
                onClick={onReviewIncorrect}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border-2 border-emerald-200 py-3.5 px-6 text-base font-bold text-emerald-700 hover:bg-emerald-100 active:scale-98 transition-all"
              >
                <Eye size={20} weight="bold" />
                Review All Questions (100% Score!)
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="results-try-again-btn"
                onClick={onTryAgain}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] py-3.5 px-6 text-base font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-98 transition-all"
              >
                <ArrowCounterClockwise size={18} weight="bold" />
                Try Again
              </button>

              <button
                id="results-choose-another-topic-btn"
                onClick={onChooseAnotherTopic}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3.5 px-6 text-base font-bold text-slate-700 hover:bg-slate-50 active:scale-98 transition-all"
              >
                <BookOpen size={18} weight="bold" />
                Choose Another Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
