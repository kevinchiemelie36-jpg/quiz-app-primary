import React, { useState } from 'react';
import { SUBJECTS } from '../data/subjects';
import { SubjectInfo, DifficultyLevel, QuestionCount, QuizConfig } from '../types';
import {
  Calculator,
  BookOpen,
  Flask,
  GlobeHemisphereWest,
  Desktop,
  Scales,
  Plant,
  HouseLine,
  Sparkle,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lightning,
  ShieldCheck,
  Flame,
  WarningCircle,
} from '@phosphor-icons/react';

interface TestSetupFlowProps {
  initialSubject?: SubjectInfo | null;
  initialTopic?: string;
  onStartQuiz: (config: QuizConfig) => void;
  onCancel: () => void;
}

export const TestSetupFlow: React.FC<TestSetupFlowProps> = ({
  initialSubject,
  initialTopic = '',
  onStartQuiz,
  onCancel,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfo>(
    initialSubject || SUBJECTS[0]
  );
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [topic, setTopic] = useState(initialTopic);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(5);
  const [validationError, setValidationError] = useState<string | null>(null);

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return Calculator;
      case 'BookOpen':
        return BookOpen;
      case 'Flask':
        return Flask;
      case 'GlobeHemisphereWest':
        return GlobeHemisphereWest;
      case 'Desktop':
        return Desktop;
      case 'Scales':
        return Scales;
      case 'Plant':
        return Plant;
      case 'HouseLine':
        return HouseLine;
      default:
        return Sparkle;
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTopic = topic.trim();
    if (!cleanTopic) {
      setValidationError('Please enter a topic before continuing.');
      return;
    }

    setValidationError(null);

    const finalSubjectName =
      selectedSubject.id === 'custom'
        ? customSubjectName.trim() || 'Custom Subject'
        : selectedSubject.name;

    onStartQuiz({
      subjectId: selectedSubject.id,
      subjectName: finalSubjectName,
      topic: cleanTopic,
      difficulty,
      questionCount,
    });
  };

  const difficultyOptions = [
    {
      id: 'easy' as const,
      label: 'Easy',
      desc: 'Build your confidence.',
      icon: ShieldCheck,
      color: '#22C55E',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'medium' as const,
      label: 'Medium',
      desc: 'Test your understanding.',
      icon: Lightning,
      color: '#4F46E5',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      id: 'hard' as const,
      label: 'Hard',
      desc: 'Challenge yourself.',
      icon: Flame,
      color: '#EA580C',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    },
  ];

  const questionCounts: QuestionCount[] = [5, 10, 15, 20];

  return (
    <div className="py-8 sm:py-12 bg-[#F8FAFC]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Top bar with back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Home
          </button>

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-[#4F46E5] border border-indigo-100">
            Create Practice Test
          </span>
        </div>

        <form onSubmit={handleGenerate} className="space-y-10">
          {/* Step 2 — Select Subject */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-black text-[#4F46E5]">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#172033]">
                What subject are you studying?
              </h2>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-6">
              Select one of the primary school subjects or enter your own custom subject.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SUBJECTS.map((sub) => {
                const Icon = getSubjectIcon(sub.iconName);
                const isSelected = selectedSubject.id === sub.id;

                return (
                  <button
                    type="button"
                    key={sub.id}
                    id={`setup-subject-${sub.id}`}
                    onClick={() => {
                      setSelectedSubject(sub);
                      setValidationError(null);
                    }}
                    className={`relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#4F46E5] bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50/60'
                    }`}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl mb-3"
                      style={{ backgroundColor: sub.bgLight, color: sub.color }}
                    >
                      <Icon size={22} weight={isSelected ? 'fill' : 'duotone'} />
                    </div>

                    <span className="text-sm font-bold text-[#172033] line-clamp-1">
                      {sub.name}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                      {sub.badge}
                    </span>

                    {isSelected && (
                      <span className="absolute top-3 right-3 text-[#4F46E5]">
                        <CheckCircle size={18} weight="fill" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Subject Name Input if custom is chosen */}
            {selectedSubject.id === 'custom' && (
              <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Custom Subject Name
                </label>
                <input
                  type="text"
                  value={customSubjectName}
                  onChange={(e) => setCustomSubjectName(e.target.value)}
                  placeholder="e.g. French, Visual Art, Music, General Knowledge..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-semibold text-slate-900 focus:border-[#4F46E5] focus:outline-none focus:ring-3 focus:ring-indigo-500/10"
                />
              </div>
            )}
          </div>

          {/* Step 3 — Enter Topic */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-xs font-black text-[#06B6D4]">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#172033]">
                What topic have you studied?
              </h2>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-4">
              Enter a topic you've recently learned in class.
            </p>

            <div className="relative">
              <input
                id="topic-input-field"
                type="text"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g. Fractions, Plants, Nouns, Multiplication..."
                className={`w-full rounded-2xl border px-4.5 py-3.5 text-base font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 transition-all ${
                  validationError
                    ? 'border-[#EF4444] ring-2 ring-red-400/20 bg-red-50/20'
                    : 'border-slate-300 focus:border-[#4F46E5] focus:ring-indigo-500/10'
                }`}
              />
            </div>

            {/* Validation alert */}
            {validationError && (
              <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-[#EF4444] animate-in fade-in">
                <WarningCircle size={16} weight="fill" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Quick Sample Topic Suggestions */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 mr-2">Quick suggestions:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedSubject.sampleTopics.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setTopic(sample);
                      setValidationError(null);
                    }}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      topic === sample
                        ? 'bg-[#4F46E5] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4 — Select Difficulty */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-black text-[#F59E0B]">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#172033]">
                Select Difficulty
              </h2>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-6">
              Choose the question challenge level suited to your grade.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {difficultyOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = difficulty === opt.id;

                return (
                  <button
                    type="button"
                    key={opt.id}
                    id={`setup-difficulty-${opt.id}`}
                    onClick={() => setDifficulty(opt.id)}
                    className={`relative flex flex-col p-5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#4F46E5] bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-black border ${opt.badgeBg}`}>
                        <Icon size={16} weight="bold" />
                        {opt.label}
                      </span>
                      {isSelected && (
                        <CheckCircle size={20} weight="fill" className="text-[#4F46E5]" />
                      )}
                    </div>

                    <h3 className="text-lg font-black text-[#172033]">{opt.label}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5 — Number of Questions */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-[#22C55E]">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#172033]">
                Number of Questions
              </h2>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-6">
              Choose how many questions to practice in this session.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {questionCounts.map((count) => {
                const isSelected = questionCount === count;

                return (
                  <button
                    type="button"
                    key={count}
                    id={`setup-count-${count}`}
                    onClick={() => setQuestionCount(count)}
                    className={`flex flex-col items-center justify-center py-4 px-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-[#4F46E5] bg-indigo-50/60 text-[#4F46E5] ring-2 ring-indigo-500/20 font-black shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 font-bold'
                    }`}
                  >
                    <span className="text-2xl font-black">{count}</span>
                    <span className="text-xs font-semibold text-slate-500 mt-0.5">
                      Questions
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 6 — Primary Generate Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="setup-generate-my-test-btn"
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[#4F46E5] py-4 sm:py-5 px-8 text-lg sm:text-xl font-black text-white shadow-xl shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-indigo-600/35 active:scale-98 transition-all"
            >
              <Sparkle size={24} weight="fill" className="text-[#F59E0B]" />
              Generate My Test
              <ArrowRight size={22} weight="bold" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
