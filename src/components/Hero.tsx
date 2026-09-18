import React, { useState } from 'react';
import { PlayCircle, Lightbulb, Sparkle, CheckCircle, Brain, ArrowRight } from '@phosphor-icons/react';

interface HeroProps {
  onStartPractice: () => void;
  onHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPractice, onHowItWorks }) => {
  const [demoSelected, setDemoSelected] = useState<string | null>('C');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-[#F8FAFC] to-[#F8FAFC] pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle ambient light accents */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="absolute -top-10 left-10 -z-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#4F46E5] shadow-xs border border-indigo-100 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              <Sparkle size={14} weight="fill" className="text-[#F59E0B]" />
              Smart Primary School Test Preparation
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-[#172033] sm:text-5xl lg:text-6xl leading-[1.12]">
              Learn Smarter. <br className="hidden sm:inline" />
              <span className="text-[#4F46E5]">Practice Better.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl font-medium leading-relaxed mx-auto lg:mx-0">
              Turn what you've studied into an interactive practice test with AI-powered questions designed for primary-school learners.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-start-practice-btn"
                onClick={onStartPractice}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-[#4F46E5] px-7 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-indigo-600/35 active:scale-98 transition-all"
              >
                <PlayCircle size={22} weight="bold" />
                Start a Practice Test
              </button>

              <button
                id="hero-how-it-works-btn"
                onClick={onHowItWorks}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
              >
                <Lightbulb size={20} weight="bold" className="text-[#F59E0B]" />
                How It Works
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-black text-[#172033]">5 Choices</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">A to E Format</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-black text-[#4F46E5]">Instant</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Step Explanations</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-black text-[#06B6D4]">9 Subjects</p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">Primary Curricula</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Sample AI Quiz Card Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xl shadow-slate-200/50">
              {/* Header inside sample card */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                    <Brain size={16} weight="fill" />
                  </span>
                  <div>
                    <span className="block text-xs font-extrabold text-[#4F46E5] uppercase tracking-wider">
                      Mathematics
                    </span>
                    <span className="block text-xs font-semibold text-slate-500">
                      Topic: Fractions
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400">Sample Preview</span>
                  <span className="block text-xs font-extrabold text-[#22C55E]">Score: 2/2</span>
                </div>
              </div>

              {/* Progress bar in sample card */}
              <div className="mt-3">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>Question 3 of 10</span>
                  <span>30%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]" />
                </div>
              </div>

              {/* Question Text */}
              <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="inline-block rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200 mb-1.5">
                  Medium Difficulty
                </span>
                <p className="text-base sm:text-lg font-extrabold text-[#172033]">
                  What is 3/4 of 8?
                </p>
              </div>

              {/* 5 Options */}
              <div className="mt-3 space-y-2">
                {[
                  { letter: 'A', text: '2' },
                  { letter: 'B', text: '4' },
                  { letter: 'C', text: '6' },
                  { letter: 'D', text: '8' },
                  { letter: 'E', text: '12' },
                ].map((opt) => {
                  const isSelected = demoSelected === opt.letter;
                  const isCorrect = opt.letter === 'C';

                  let style = 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300';
                  if (isSelected) {
                    style = 'border-[#22C55E] bg-emerald-50/70 text-emerald-900 ring-2 ring-[#22C55E]/30';
                  }

                  return (
                    <button
                      key={opt.letter}
                      onClick={() => setDemoSelected(opt.letter)}
                      className={`w-full flex items-center justify-between rounded-xl border p-2.5 sm:p-3 text-left transition-all ${style}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                            isSelected
                              ? 'bg-[#22C55E] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.letter}
                        </span>
                        <span className="text-sm sm:text-base font-bold">{opt.text}</span>
                      </div>
                      {isSelected && isCorrect && (
                        <CheckCircle size={18} weight="fill" className="text-[#22C55E]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Correct Feedback Panel Preview */}
              {demoSelected === 'C' && (
                <div className="mt-3 rounded-xl bg-emerald-50 p-3.5 border border-emerald-200 text-emerald-950 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#22C55E]">
                    <CheckCircle size={16} weight="fill" />
                    <span>✓ Correct! Great job! You got it right.</span>
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-700">
                    <span className="font-bold text-emerald-900">Explanation: </span>
                    3/4 of 8 is 6 because 8 ÷ 4 = 2, and 2 × 3 = 6.
                  </div>
                </div>
              )}

              {/* Try this live CTA */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <button
                  onClick={onStartPractice}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-indigo-800 transition-colors"
                >
                  Generate a full test for your child's topic
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
