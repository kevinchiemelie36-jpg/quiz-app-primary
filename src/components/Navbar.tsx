import React, { useState } from 'react';
import { Logo } from './Logo';
import { List, X, PlayCircle, House, BookOpen, ChartLine, Lightbulb } from '@phosphor-icons/react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'subjects' | 'how-it-works' | 'progress' | 'test-setup') => void;
  onStartPractice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onStartPractice,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'how-it-works', label: 'How It Works', icon: Lightbulb },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: ChartLine },
  ] as const;

  const handleLinkClick = (id: 'home' | 'subjects' | 'how-it-works' | 'progress') => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          id="nav-logo-btn"
        >
          <Logo size="md" showTagline={false} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-[#4F46E5] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-start-practicing-btn"
            onClick={onStartPractice}
            className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-98 transition-all"
          >
            <PlayCircle size={18} weight="bold" />
            Start Practicing
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-left transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-[#4F46E5] font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                {link.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              id="mobile-nav-start-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartPractice();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] py-3 text-base font-bold text-white shadow-md shadow-indigo-600/20"
            >
              <PlayCircle size={20} weight="bold" />
              Start Practicing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
