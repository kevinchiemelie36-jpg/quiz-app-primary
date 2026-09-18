import React, { useState } from 'react';
import { QuizResult } from '../types';
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowCounterClockwise,
  BookOpen,
  Lightbulb,
} from '@phosphor-icons/react';

interface ReviewScreenProps {
  result: QuizResult;
  onBackToResults: () => void;
  onTryAgain: () => void;
  onChooseAnotherTopic: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  result,
  onBackToResults,
  onTryAgain,
  onChooseAnotherTopic,
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect'>('incorrect');

  const incorrectAnswers = result.answers.filter((a) => !a.isCorrect);
  const displayAnswers = filter === 'incorrect' && incorrectAnswers.length > 0
    ? incorrectAnswers
    : result.answers;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Navigation / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={onBackToResults}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors mb-2"
            >
              <ArrowLeft size={14} weight="bold" /> Back to Results
            </button>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
              Review Questions
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {result.subject} — {result.topic} ({result.correctCount}/{result.totalQuestions} • {result.percentage}%)
            </p>
          </div>

          {/* Filter toggle if there are both correct and incorrect */}
          {incorrectAnswers.length > 0 && incorrectAnswers.length < result.answers.length && (
            <div className="flex items-center rounded-xl bg-slate-200/70 p-1 text-xs font-bold self-start sm:self-auto">
              <button
                onClick={() => setFilter('incorrect')}
                className={`rounded-lg px-3 py-1.5 transition-all ${
                  filter === 'incorrect'
                    ? 'bg-white text-red-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Incorrect ({incorrectAnswers.length})
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`rounded-lg px-3 py-1.5 transition-all ${
                  filter === 'all'
                    ? 'bg-white text-[#4F46E5] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({result.answers.length})
              </button>
            </div>
          )}
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {displayAnswers.map((item, idx) => {
            const yourChoiceText = item.options[item.selectedOption];
            const correctChoiceText = item.options[item.correctAnswer];

            return (
              <div
                key={item.questionId || idx}
                className={`rounded-3xl border bg-white p-6 sm:p-8 shadow-xs transition-all ${
                  item.isCorrect
                    ? 'border-emerald-200'
                    : 'border-red-200 ring-1 ring-red-100'
                }`}
              >
                {/* Status pill & index */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Question {idx + 1}
                  </span>
                  {item.isCorrect ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-[#22C55E] border border-emerald-200">
                      <CheckCircle size={14} weight="fill" />
                      Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-black text-[#EF4444] border border-red-200">
                      <XCircle size={14} weight="fill" />
                      Incorrect
                    </span>
                  )}
                </div>

                {/* Question */}
                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-[#172033] leading-snug">
                    {item.question}
                  </h2>
                </div>

                {/* Compare Your Answer vs Correct Answer */}
                <div className="grid gap-3 sm:grid-cols-2 mb-6">
                  {/* Your Answer */}
                  <div
                    className={`rounded-2xl border p-4 ${
                      item.isCorrect
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-red-200 bg-red-50/40'
                    }`}
                  >
                    <span className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                      Your Answer
                    </span>
                    <p
                      className={`text-base font-bold flex items-center justify-between ${
                        item.isCorrect ? 'text-emerald-900' : 'text-red-900'
                      }`}
                    >
                      <span>
                        {item.selectedOption}. {yourChoiceText}
                      </span>
                      {item.isCorrect ? (
                        <span className="text-[#22C55E] font-black">✓</span>
                      ) : (
                        <span className="text-[#EF4444] font-black">❌</span>
                      )}
                    </p>
                  </div>

                  {/* Correct Answer */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                    <span className="block text-xs font-black uppercase tracking-wider text-emerald-800 mb-1">
                      Correct Answer
                    </span>
                    <p className="text-base font-bold text-emerald-950 flex items-center justify-between">
                      <span>
                        {item.correctAnswer}. {correctChoiceText}
                      </span>
                      <span className="text-[#22C55E] font-black">✓</span>
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-indigo-700 mb-1">
                    <Lightbulb size={16} weight="fill" className="text-[#F59E0B]" />
                    Explanation
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToResults}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Results
          </button>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onTryAgain}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-98 transition-all"
            >
              <ArrowCounterClockwise size={16} weight="bold" />
              Try Again
            </button>

            <button
              onClick={onChooseAnotherTopic}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <BookOpen size={16} weight="bold" />
              Choose Another Topic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
