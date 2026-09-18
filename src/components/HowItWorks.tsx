import React from 'react';
import { PencilSimple, Brain, Trophy, ArrowRight } from '@phosphor-icons/react';

interface HowItWorksProps {
  onStartPractice: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartPractice }) => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Topic',
      description: "Tell Learnly what you've studied in school, like Fractions, Plants, or Nouns.",
      icon: PencilSimple,
      color: '#4F46E5',
      bgColor: '#EEF2FF',
      borderColor: '#C7D2FE',
    },
    {
      number: '02',
      title: 'Let AI Create Your Test',
      description: 'AI creates questions based on your topic, calibrated exactly for your grade and difficulty.',
      icon: Brain,
      color: '#06B6D4',
      bgColor: '#ECFEFF',
      borderColor: '#A5F3FC',
    },
    {
      number: '03',
      title: 'Practice & Improve',
      description: 'Answer questions, learn from mistakes with friendly step-by-step explanations, and track your progress.',
      icon: Trophy,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      borderColor: '#FDE68A',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-[#4F46E5] uppercase tracking-wider border border-indigo-100">
            Simple 3-Step Process
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#172033] sm:text-4xl tracking-tight">
            How Learnly Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Designed specifically to make primary-school exam preparation friendly, structured, and stress-free.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200/80 bg-slate-50/50 p-7 sm:p-8 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-105"
                    style={{ backgroundColor: step.bgColor, color: step.color }}
                  >
                    <Icon size={28} weight="duotone" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-indigo-400 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#172033] tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-slate-600 leading-relaxed font-medium text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartPractice}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-98 transition-all"
          >
            Try Your First Practice Test Now
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
};
