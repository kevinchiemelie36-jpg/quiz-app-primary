import React from 'react';
import { PracticeHistoryItem } from '../types';
import {
  Trophy,
  ListChecks,
  Target,
  PlayCircle,
  ArrowRight,
  Sparkle,
  TrendUp,
  CheckCircle,
} from '@phosphor-icons/react';

interface DashboardProps {
  history: PracticeHistoryItem[];
  onStartPractice: () => void;
  onSelectTopic: (subject: string, topic: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  history,
  onStartPractice,
  onSelectTopic,
}) => {
  // Compute dynamic stats from history
  const totalTests = history.length;
  const totalQuestions = history.reduce((sum, item) => sum + item.totalQuestions, 0);
  const averageScore =
    totalTests > 0
      ? Math.round(history.reduce((sum, item) => sum + item.percentage, 0) / totalTests)
      : 85;

  const recommendedTopics = [
    { subject: 'Mathematics', topic: 'Decimals & Percentages', reason: 'Strengthen multi-step word problem skills' },
    { subject: 'English Language', topic: 'Verbs & Tenses', reason: 'High test frequency in primary exams' },
    { subject: 'Basic Science', topic: 'Solar System & Planets', reason: 'Popular revision topic for mid-terms' },
    { subject: 'Computer Studies', topic: 'Safe Internet Habits', reason: 'Essential digital safety foundation' },
  ];

  return (
    <section id="progress" className="py-16 md:py-24 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[#22C55E] border border-emerald-200 mb-2">
              <CheckCircle size={14} weight="fill" />
              Primary School Student Profile
            </div>
            <h2 className="text-3xl font-extrabold text-[#172033] sm:text-4xl tracking-tight">
              Welcome back!
            </h2>
            <p className="mt-1 text-lg text-slate-600 font-medium">
              Ready to learn something new?
            </p>
          </div>

          <button
            id="dashboard-start-practice-btn"
            onClick={onStartPractice}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-3.5 text-base font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-98 transition-all self-start md:self-auto"
          >
            <PlayCircle size={20} weight="bold" />
            Start Practice
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-[#4F46E5]">
              <Trophy size={28} weight="duotone" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tests Completed
              </p>
              <p className="text-3xl font-black text-[#172033] mt-1">{totalTests}</p>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
                <TrendUp size={12} weight="bold" /> Active learner
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-[#06B6D4]">
              <ListChecks size={28} weight="duotone" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Questions Answered
              </p>
              <p className="text-3xl font-black text-[#172033] mt-1">{totalQuestions}</p>
              <span className="text-xs font-medium text-slate-500 mt-0.5">5-choice A-E tests</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-[#F59E0B]">
              <Target size={28} weight="duotone" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Average Score
              </p>
              <p className="text-3xl font-black text-[#172033] mt-1">{averageScore}%</p>
              <span className="text-xs font-medium text-indigo-600 mt-0.5">Great mastery</span>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Recent Practice + Continue Learning */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Recent Practice */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#172033]">Recent Practice</h3>
              <span className="text-xs font-bold text-slate-400">Past sessions</span>
            </div>

            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200/90 bg-white p-4 hover:border-indigo-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                        item.percentage >= 80
                          ? 'bg-emerald-50 text-[#22C55E] border border-emerald-200'
                          : item.percentage >= 60
                          ? 'bg-amber-50 text-[#F59E0B] border border-amber-200'
                          : 'bg-rose-50 text-[#EF4444] border border-rose-200'
                      }`}
                    >
                      {item.percentage}%
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#172033]">
                        {item.subject} <span className="text-slate-400 font-normal">—</span> {item.topic}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {item.correctCount} of {item.totalQuestions} correct • {item.date}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTopic(item.subject, item.topic)}
                    className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#4F46E5] hover:bg-indigo-50 transition-colors"
                  >
                    Practice Again
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Learning / Recommendations */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#172033] flex items-center gap-1.5">
                <Sparkle size={18} weight="fill" className="text-[#F59E0B]" />
                Continue Learning
              </h3>
              <span className="text-xs font-bold text-indigo-600">Recommended</span>
            </div>

            <div className="space-y-3">
              {recommendedTopics.map((rec) => (
                <div
                  key={rec.topic}
                  onClick={() => onSelectTopic(rec.subject, rec.topic)}
                  className="rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-400 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
                      {rec.subject}
                    </span>
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h4 className="text-base font-bold text-[#172033] mt-1 group-hover:text-indigo-600 transition-colors">
                    {rec.topic}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
