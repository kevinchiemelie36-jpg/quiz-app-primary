import React, { useEffect, useState } from 'react';
import { Brain, Sparkle } from '@phosphor-icons/react';

interface LoadingScreenProps {
  subject: string;
  topic: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ subject, topic }) => {
  const messages = [
    'Understanding your topic...',
    'Creating questions...',
    'Checking answer choices...',
    'Preparing your test...',
    'Almost ready!',
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center animate-in fade-in duration-300">
      <div className="relative mb-8">
        {/* Outer glowing pulsing orb */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#06B6D4] opacity-25 blur-xl animate-pulse" />
        
        {/* Animated Icon Container */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#4F46E5] to-[#06B6D4] text-white shadow-xl shadow-indigo-500/30">
          <Brain size={48} weight="duotone" className="animate-bounce" />
          <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-md animate-spin duration-1000">
            <Sparkle size={18} weight="fill" />
          </span>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
        Creating your practice test...
      </h2>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
        <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-[#4F46E5] border border-indigo-100">
          {subject}
        </span>
        <span>•</span>
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
          {topic}
        </span>
      </div>

      {/* Rotating status pill */}
      <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#4F46E5] shadow-sm border border-indigo-100 min-w-[240px] justify-center transition-all duration-300">
        <span className="flex h-2.5 w-2.5 rounded-full bg-[#06B6D4] animate-ping" />
        <span key={messageIndex} className="animate-in fade-in slide-in-from-bottom-1 duration-200">
          {messages[messageIndex]}
        </span>
      </div>

      {/* Progress Dots */}
      <div className="mt-8 flex items-center gap-2">
        {messages.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === messageIndex
                ? 'w-8 bg-[#4F46E5]'
                : idx < messageIndex
                ? 'w-2 bg-emerald-400'
                : 'w-2 bg-slate-200'
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-400 max-w-sm">
        Crafting 5-choice questions (A, B, C, D, E) with tailored primary-school explanations.
      </p>
    </div>
  );
};
