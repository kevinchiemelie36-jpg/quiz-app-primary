import React from 'react';
import { Logo } from './Logo';
import { Sparkle, Heart } from '@phosphor-icons/react';

interface FooterProps {
  onNavigate: (view: 'home' | 'subjects' | 'how-it-works' | 'progress') => void;
  onSelectSubjectName?: (subjectName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectSubjectName }) => {
  const subjects = [
    'Mathematics',
    'English Language',
    'Basic Science',
    'Social Studies',
    'Computer Studies',
    'Civic Education',
    'Agricultural Science',
    'Home Economics',
  ];

  return (
    <footer className="border-t border-slate-200 bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <Logo size="md" showTagline={true} />
            <p className="mt-4 max-w-sm text-sm text-slate-500 leading-relaxed">
              AI-powered practice tests and exam preparation for primary-school learners. Helping kids build confidence with 5-choice questions, friendly instant feedback, and zero stress.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              Trusted by parents and teachers for safe, educational learning.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#4F46E5] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-[#4F46E5] transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('subjects')}
                  className="hover:text-[#4F46E5] transition-colors"
                >
                  Explore Subjects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('progress')}
                  className="hover:text-[#4F46E5] transition-colors"
                >
                  Student Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Core Primary Subjects
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => onSelectSubjectName?.(sub)}
                  className="text-left hover:text-[#4F46E5] transition-colors py-1"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <p>© {new Date().getFullYear()} Learnly. Designed for primary-school excellence.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart size={14} weight="fill" className="text-rose-500" />
            <span>for curious minds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
