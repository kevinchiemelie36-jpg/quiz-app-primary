import React, { useState, useEffect } from 'react';
import {
  SubjectInfo,
  QuizConfig,
  QuizQuestion,
  QuizResult,
  PracticeHistoryItem,
} from './types';
import { SUBJECTS } from './data/subjects';
import { generatePracticeTest } from './services/geminiService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { SubjectExplorer } from './components/SubjectExplorer';
import { Dashboard } from './components/Dashboard';
import { TestSetupFlow } from './components/TestSetupFlow';
import { LoadingScreen } from './components/LoadingScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { Footer } from './components/Footer';
import { WarningCircle, ArrowCounterClockwise } from '@phosphor-icons/react';

const INITIAL_HISTORY: PracticeHistoryItem[] = [
  {
    id: 'hist-1',
    subject: 'Mathematics',
    topic: 'Fractions',
    percentage: 80,
    correctCount: 8,
    totalQuestions: 10,
    date: 'Yesterday',
  },
  {
    id: 'hist-2',
    subject: 'English Language',
    topic: 'Nouns',
    percentage: 90,
    correctCount: 9,
    totalQuestions: 10,
    date: '2 days ago',
  },
  {
    id: 'hist-3',
    subject: 'Basic Science',
    topic: 'Plants',
    percentage: 75,
    correctCount: 6,
    totalQuestions: 8,
    date: '3 days ago',
  },
  {
    id: 'hist-4',
    subject: 'Computer Studies',
    topic: 'Parts of a Computer',
    percentage: 95,
    correctCount: 19,
    totalQuestions: 20,
    date: 'Last week',
  },
];

type AppView =
  | 'home'
  | 'test-setup'
  | 'loading'
  | 'quiz'
  | 'results'
  | 'review';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [setupSubject, setSetupSubject] = useState<SubjectInfo | null>(null);
  const [setupTopic, setSetupTopic] = useState<string>('');

  // Active quiz session states
  const [activeConfig, setActiveConfig] = useState<QuizConfig | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Student history saved to localStorage
  const [history, setHistory] = useState<PracticeHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('learnly_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_HISTORY;
  });

  useEffect(() => {
    try {
      localStorage.setItem('learnly_history', JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleStartPractice = (subject?: SubjectInfo, topic?: string) => {
    if (subject) {
      setSetupSubject(subject);
    } else {
      setSetupSubject(SUBJECTS[0]);
    }
    setSetupTopic(topic || '');
    setLoadError(null);
    setCurrentView('test-setup');
  };

  const handleSelectTopicFromDashboard = (subjectName: string, topicName: string) => {
    const matchedSubject =
      SUBJECTS.find((s) => s.name.toLowerCase() === subjectName.toLowerCase()) ||
      SUBJECTS[0];
    setSetupSubject(matchedSubject);
    setSetupTopic(topicName);
    setLoadError(null);
    setCurrentView('test-setup');
  };

  const handleGenerateTest = async (config: QuizConfig) => {
    setActiveConfig(config);
    setLoadError(null);
    setCurrentView('loading');

    try {
      const questions = await generatePracticeTest(config);
      if (!questions || questions.length === 0) {
        throw new Error('No questions received.');
      }
      setQuizQuestions(questions);
      setCurrentView('quiz');
    } catch (err) {
      console.error('Test generation error:', err);
      setLoadError("We couldn't create your test right now. Please try again.");
      setCurrentView('test-setup');
    }
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);

    // Save to practice history
    const newHistoryItem: PracticeHistoryItem = {
      id: result.id,
      subject: result.subject,
      topic: result.topic,
      percentage: result.percentage,
      correctCount: result.correctCount,
      totalQuestions: result.totalQuestions,
      date: 'Just now',
    };

    setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]);
    setCurrentView('results');
  };

  const handleTryAgain = () => {
    if (activeConfig) {
      handleGenerateTest(activeConfig);
    } else {
      setCurrentView('test-setup');
    }
  };

  const handleChooseAnotherTopic = () => {
    setCurrentView('test-setup');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col font-['Nunito_Sans',sans-serif]">
      {/* Persistent Top Navigation (shown on landing and setup) */}
      {(currentView === 'home' || currentView === 'test-setup') && (
        <Navbar
          currentView={currentView}
          onNavigate={(target) => {
            if (target === 'test-setup') {
              handleStartPractice();
            } else if (target === 'home') {
              setCurrentView('home');
            } else {
              setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById(target);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }
          }}
          onStartPractice={() => handleStartPractice()}
        />
      )}

      {/* Global Error Banner */}
      {loadError && currentView === 'test-setup' && (
        <div className="mx-auto max-w-4xl px-4 pt-6">
          <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900 shadow-sm">
            <div className="flex items-center gap-2.5">
              <WarningCircle size={22} weight="fill" className="text-[#EF4444] shrink-0" />
              <div>
                <p className="text-sm font-black">We couldn't create your test right now.</p>
                <p className="text-xs text-red-700">Please try again.</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (activeConfig) handleGenerateTest(activeConfig);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-[#EF4444] border border-red-200 hover:bg-red-100/50 transition-colors"
            >
              <ArrowCounterClockwise size={14} weight="bold" />
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onStartPractice={() => handleStartPractice()}
              onHowItWorks={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <HowItWorks onStartPractice={() => handleStartPractice()} />
            <SubjectExplorer
              onSelectSubject={(subject) => handleStartPractice(subject)}
            />
            <Dashboard
              history={history}
              onStartPractice={() => handleStartPractice()}
              onSelectTopic={(sub, top) => handleSelectTopicFromDashboard(sub, top)}
            />
          </>
        )}

        {currentView === 'test-setup' && (
          <TestSetupFlow
            initialSubject={setupSubject}
            initialTopic={setupTopic}
            onStartQuiz={handleGenerateTest}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {currentView === 'loading' && activeConfig && (
          <LoadingScreen
            subject={activeConfig.subjectName}
            topic={activeConfig.topic}
          />
        )}

        {currentView === 'quiz' && activeConfig && (
          <QuizScreen
            config={activeConfig}
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            onExit={() => setCurrentView('home')}
          />
        )}

        {currentView === 'results' && quizResult && (
          <ResultsScreen
            result={quizResult}
            onReviewIncorrect={() => setCurrentView('review')}
            onTryAgain={handleTryAgain}
            onChooseAnotherTopic={handleChooseAnotherTopic}
          />
        )}

        {currentView === 'review' && quizResult && (
          <ReviewScreen
            result={quizResult}
            onBackToResults={() => setCurrentView('results')}
            onTryAgain={handleTryAgain}
            onChooseAnotherTopic={handleChooseAnotherTopic}
          />
        )}
      </main>

      {/* Footer */}
      {(currentView === 'home' || currentView === 'test-setup') && (
        <Footer
          onNavigate={(target) => {
            setCurrentView('home');
            setTimeout(() => {
              const el = document.getElementById(target);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onSelectSubjectName={(subName) => {
            const matched = SUBJECTS.find((s) => s.name.toLowerCase() === subName.toLowerCase());
            handleStartPractice(matched);
          }}
        />
      )}
    </div>
  );
}
