import React, { useState } from 'react';
import { SUBJECTS } from '../data/subjects';
import { SubjectInfo } from '../types';
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
  CaretDown,
  CaretUp,
} from '@phosphor-icons/react';

interface SubjectExplorerProps {
  onSelectSubject: (subject: SubjectInfo) => void;
}

export const SubjectExplorer: React.FC<SubjectExplorerProps> = ({ onSelectSubject }) => {
  const [showAll, setShowAll] = useState(false);

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

  const displayedSubjects = showAll ? SUBJECTS : SUBJECTS.slice(0, 6);

  return (
    <section id="subjects" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-cyan-50 px-3.5 py-1 text-xs font-bold text-[#06B6D4] uppercase tracking-wider border border-cyan-100">
              Curriculum Aligned
            </span>
            <h2 className="mt-2.5 text-3xl font-extrabold text-[#172033] sm:text-4xl tracking-tight">
              Explore Your Subjects
            </h2>
            <p className="mt-2 text-slate-600 font-medium text-base">
              Select a subject to launch practice tests built for primary-school tests and exams.
            </p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4F46E5] hover:text-indigo-800 transition-colors self-start sm:self-auto"
          >
            {showAll ? (
              <>
                Show Fewer Subjects <CaretUp size={16} weight="bold" />
              </>
            ) : (
              <>
                View All Subjects <CaretDown size={16} weight="bold" />
              </>
            )}
          </button>
        </div>

        {/* Subject Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedSubjects.map((subject) => {
            const Icon = getSubjectIcon(subject.iconName);
            return (
              <div
                key={subject.id}
                id={`subject-card-${subject.id}`}
                onClick={() => onSelectSubject(subject)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: subject.bgLight, color: subject.color }}
                    >
                      <Icon size={24} weight="duotone" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                      {subject.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#172033] group-hover:text-[#4F46E5] transition-colors">
                    {subject.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {subject.description}
                  </p>

                  {/* Sample Topics Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {subject.sampleTopics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-lg bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-600 border border-slate-100"
                      >
                        {topic}
                      </span>
                    ))}
                    {subject.sampleTopics.length > 3 && (
                      <span className="rounded-lg bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-400">
                        +{subject.sampleTopics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#4F46E5]">
                  <span>Start Practice Test</span>
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
