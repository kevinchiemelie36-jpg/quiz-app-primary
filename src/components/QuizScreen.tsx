import React, { useState } from 'react';
import { QuizConfig, QuizQuestion, UserAnswerRecord, QuizResult } from '../types';
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Lightbulb,
  Sparkle,
  ArrowCounterClockwise,
  ListNumbers,
  Trophy,
} from '@phosphor-icons/react';

interface QuizScreenProps {
  config: QuizConfig;
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
  onExit: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  config,
  questions,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answers, setAnswers] = useState<UserAnswerRecord[]>([]);
  const [showOverview, setShowOverview] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const questionNumber = currentIndex + 1;

  // Real-time scores
  const answeredCount = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const incorrectCount = answers.filter((a) => !a.isCorrect).length;
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  const handleSelectOption = (optionKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (hasAnswered) return; // Prevent multiple submissions for same question

    setSelectedOption(optionKey);
    setHasAnswered(true);

    const isCorrect = optionKey === currentQ.correctAnswer;
    const newRecord: UserAnswerRecord = {
      questionId: currentQ.id,
      question: currentQ.question,
      options: currentQ.options,
      selectedOption: optionKey,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      explanation: currentQ.explanation,
    };

    setAnswers((prev) => [...prev, newRecord]);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      // Completed last question
      const finalAnswers = answers;
      const finalCorrect = finalAnswers.filter((a) => a.isCorrect).length;
      const finalIncorrect = finalAnswers.filter((a) => !a.isCorrect).length;
      const finalPercentage = Math.round((finalCorrect / totalQuestions) * 100);

      const result: QuizResult = {
        id: `result-${Date.now()}`,
        subject: config.subjectName,
        topic: config.topic,
        difficulty: config.difficulty,
        totalQuestions,
        correctCount: finalCorrect,
        incorrectCount: finalIncorrect,
        percentage: finalPercentage,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        answers: finalAnswers,
      };

      onComplete(result);
    }
  };

  const optionKeys: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Top Header Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#4F46E5]">
                {config.subjectName}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#172033]">
                {config.topic}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowOverview(!showOverview)}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                title="Toggle question overview"
              >
                <ListNumbers size={16} weight="bold" />
                Overview
              </button>

              <button
                onClick={onExit}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              >
                Exit Test
              </button>
            </div>
          </div>

          {/* Progress & Live Score */}
          <div className="mt-4 flex items-center justify-between text-xs sm:text-sm font-bold">
            <span className="text-slate-700">
              Question <span className="text-[#4F46E5] font-black">{questionNumber}</span> of{' '}
              <span className="text-slate-900">{totalQuestions}</span>
            </span>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[#22C55E] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 font-extrabold">
                <Trophy size={14} weight="fill" />
                Score: {correctCount}
              </span>
              <span className="text-slate-400 font-medium">
                ({Math.round((correctCount / Math.max(answeredCount, 1)) * 100)}%)
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Overview Pills (Collapsible / Responsive Grid inspired by mockup) */}
          {showOverview && (
            <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Question Overview
                </span>
                <span className="text-xs text-slate-400">
                  {correctCount} Correct • {incorrectCount} Incorrect
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {questions.map((_, idx) => {
                  const answeredRecord = answers[idx];
                  let pillStyle = 'bg-slate-100 text-slate-600 border-slate-200';

                  if (idx === currentIndex) {
                    pillStyle = 'border-2 border-[#4F46E5] text-[#4F46E5] font-black bg-indigo-50';
                  } else if (answeredRecord) {
                    pillStyle = answeredRecord.isCorrect
                      ? 'bg-[#22C55E] text-white border-[#22C55E]'
                      : 'bg-[#EF4444] text-white border-[#EF4444]';
                  }

                  return (
                    <div
                      key={idx}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold ${pillStyle}`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Question Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
          {/* Question Text */}
          <div className="mb-6">
            <span className="inline-block rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-[#4F46E5] mb-2 border border-indigo-100">
              Question {questionNumber}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#172033] leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Five Large Answer Cards: A, B, C, D, E */}
          <div className="space-y-3" role="radiogroup" aria-label="Answer choices">
            {optionKeys.map((key) => {
              const optionText = currentQ.options[key];
              const isSelected = selectedOption === key;
              const isCorrectAnswer = key === currentQ.correctAnswer;

              let cardStyle =
                'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/60 text-slate-800';
              let badgeStyle = 'bg-slate-100 text-slate-700';

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  // Always highlight correct answer clearly in green
                  cardStyle =
                    'border-[#22C55E] bg-emerald-50/80 text-emerald-950 ring-2 ring-[#22C55E]/30';
                  badgeStyle = 'bg-[#22C55E] text-white';
                } else if (isSelected && !isCorrectAnswer) {
                  // User chose this wrong option
                  cardStyle =
                    'border-[#EF4444] bg-red-50/80 text-red-950 ring-2 ring-[#EF4444]/30';
                  badgeStyle = 'bg-[#EF4444] text-white';
                } else {
                  cardStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                  badgeStyle = 'bg-slate-200 text-slate-500';
                }
              }

              return (
                <button
                  key={key}
                  id={`quiz-option-${key}`}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(key)}
                  className={`w-full flex items-center justify-between rounded-2xl border p-4 sm:p-5 text-left transition-all ${cardStyle} ${
                    !hasAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black transition-colors ${badgeStyle}`}
                    >
                      {key}
                    </span>
                    <span className="text-base sm:text-lg font-bold leading-relaxed">
                      {optionText}
                    </span>
                  </div>

                  {hasAnswered && (
                    <div className="shrink-0 ml-3">
                      {isCorrectAnswer ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-[#22C55E]">
                          <CheckCircle size={22} weight="fill" />
                        </span>
                      ) : isSelected ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-[#EF4444]">
                          <XCircle size={22} weight="fill" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Panel (When an option is picked) */}
          {hasAnswered && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {selectedOption === currentQ.correctAnswer ? (
                /* Correct Answer Experience */
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-emerald-950">
                  <div className="flex items-center gap-2 text-base sm:text-lg font-black text-[#22C55E]">
                    <CheckCircle size={24} weight="fill" />
                    <span>✓ Correct! Great job! You got it right.</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-emerald-200/60">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1">
                      <Lightbulb size={14} weight="fill" />
                      Explanation
                    </h3>
                    <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              ) : (
                /* Incorrect Answer Experience */
                <div className="rounded-2xl border border-red-200 bg-red-50/80 p-5 text-red-950">
                  <div className="flex items-center gap-2 text-base sm:text-lg font-black text-[#EF4444]">
                    <XCircle size={24} weight="fill" />
                    <span>✕ Not quite!</span>
                  </div>

                  <div className="mt-2 text-sm sm:text-base font-bold text-slate-800">
                    Correct Answer:{' '}
                    <span className="text-[#22C55E] font-black underline decoration-2">
                      {currentQ.correctAnswer}. {currentQ.options[currentQ.correctAnswer]}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-red-200/60">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-1 flex items-center gap-1">
                      <Lightbulb size={14} weight="fill" />
                      Let's understand it
                    </h3>
                    <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              )}

              {/* Next Question Button */}
              <div className="mt-6 flex justify-end">
                <button
                  id="quiz-next-question-btn"
                  onClick={handleNext}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-[#4F46E5] px-8 py-4 text-base font-black text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-98 transition-all"
                >
                  <span>
                    {currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}
                  </span>
                  {currentIndex < totalQuestions - 1 ? (
                    <ArrowRight size={20} weight="bold" />
                  ) : (
                    <Sparkle size={20} weight="fill" className="text-[#F59E0B]" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
