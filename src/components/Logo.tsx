import React from 'react';
import { GraduationCap, Sparkle } from '@phosphor-icons/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconBoxSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 26,
  };

  return (
    <div className="flex items-center gap-2.5 select-none" id="learnly-logo">
      <div
        className={`${iconBoxSizes[size]} relative flex items-center justify-center bg-gradient-to-tr from-[#4F46E5] to-[#06B6D4] text-white shadow-md shadow-indigo-500/20`}
      >
        <GraduationCap size={iconSizes[size]} weight="duotone" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-xs">
          <Sparkle size={9} weight="bold" />
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`font-extrabold tracking-tight text-[#172033] ${textSizes[size]}`}>
            Learnly
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 -mt-0.5">
            Primary School Test Prep
          </span>
        )}
      </div>
    </div>
  );
};
