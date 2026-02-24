import React, { useState, useEffect } from 'react';
import { BuddySystem } from './components/BuddySystem';
import { HealthSystem } from './components/HealthSystem';
import { Smile, Heart, X, MessageSquare, RefreshCw, UserPlus, Sparkles } from 'lucide-react';

// Use a simple state-based router
type MainView = 'HOME' | 'BUDDY' | 'HEALTH';

// ─── What's New Dialog ────────────────────────────────────────────────────────
const UPDATES = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    title: 'Deletion of Chats',
    desc: 'Clean up your conversations! You can now delete individual messages by double-clicking or right-clicking.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    title: 'Bug Fixes',
    desc: 'Smoother performance and UI fixes across My Buddy and Health Buddy for a better experience.',
  },
  {
    icon: <UserPlus className="w-6 h-6" />,
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    title: 'Consultation Login',
    desc: 'Enhanced sign-in flow for consultants with name validation, age gating, and terms acceptance.',
  },
];

interface WhatsNewDialogProps {
  onClose: () => void;
}

const WhatsNewDialog: React.FC<WhatsNewDialogProps> = ({ onClose }) => (
  <>
    {/* Blurred backdrop */}
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
      onClick={onClose}
      aria-hidden="true"
    />

    {/* Dialog */}
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      aria-modal="true"
      role="dialog"
      aria-label="What's New"
    >
      <div
        className="pointer-events-auto w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-fade-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-buddy-500 to-buddy-700 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center mb-1">
            <Sparkles className="w-5 h-5 text-yellow-300 mr-2" />
            <span className="text-xs font-semibold text-buddy-100 uppercase tracking-widest">
              Version 1.2.1
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">What's New </h2>
          <p className="text-buddy-100 text-sm mt-1">
            Here's what we've been building for you!
          </p>
        </div>

        {/* Features list */}
        <div className="p-5 space-y-4">
          {UPDATES.map((u) => (
            <div
              key={u.title}
              className={`flex items-start gap-4 p-4 rounded-2xl ${u.bg} transition`}
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${u.color} flex items-center justify-center text-white shrink-0 shadow`}
              >
                {u.icon}
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{u.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                  {u.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full bg-buddy-600 hover:bg-buddy-700 text-white font-bold py-3 rounded-2xl transition shadow-lg shadow-buddy-200 dark:shadow-none"
          >
            Got it, let's go!
          </button>
        </div>
      </div>
    </div>
  </>
);

// ─── App ──────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<MainView>('HOME');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [pendingView, setPendingView] = useState<MainView | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  /** Show the What's New overlay before navigating to a section */
  const handleNavWithUpdate = (view: MainView) => {
    setPendingView(view);
    setShowWhatsNew(true);
  };

  /** User closes the dialog → navigate to wherever they wanted to go */
  const handleCloseWhatsNew = () => {
    setShowWhatsNew(false);
    if (pendingView) {
      setCurrentView(pendingView);
      setPendingView(null);
    }
  };

  if (currentView === 'BUDDY') {
    return (
      <>
        <BuddySystem
          onBack={() => setCurrentView('HOME')}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onCheckUpdates={() => setShowWhatsNew(true)}
        />
        {showWhatsNew && <WhatsNewDialog onClose={() => setShowWhatsNew(false)} />}
      </>
    );
  }

  if (currentView === 'HEALTH') {
    return (
      <>
        <HealthSystem
          onBack={() => setCurrentView('HOME')}
          onCheckUpdates={() => setShowWhatsNew(true)}
        />
        {showWhatsNew && <WhatsNewDialog onClose={() => setShowWhatsNew(false)} />}
      </>
    );
  }

  return (
    <>
      <div className="h-full flex flex-col bg-gradient-to-br from-buddy-500 to-buddy-900 dark:from-gray-900 dark:to-black text-white overflow-y-auto transition-colors duration-500">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          {/* Logo Representation */}
          <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-2xl animate">
            <div className="relative w-20 h-20">
              {/* Eyes */}
              <div className="absolute top-4 left-2 w-4 h-4 bg-buddy-600 rounded-full"></div>
              <div className="absolute top-4 right-2 w-4 h-4 bg-buddy-600 rounded-full"></div>
              {/* Smile */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-6 border-b-4 border-buddy-600 rounded-full"></div>
            </div>
          </div>

          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Buddy AI</h1>
          <p className="text-xl text-buddy-100 max-w-md mb-12">
            Your forever AI Best Friend.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <button
              onClick={() => handleNavWithUpdate('BUDDY')}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 p-8 rounded-3xl transition-all transform hover:scale-105 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-buddy-600 mb-4 group-hover:rotate-12 transition">
                <Smile className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">My Buddy</h2>
              <p className="text-buddy-100 text-sm">Create and chat with your AI friend. Features memory and personal diaries.</p>
            </button>

            <button
              onClick={() => handleNavWithUpdate('HEALTH')}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 p-8 rounded-3xl transition-all transform hover:scale-105 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center text-white mb-4 group-hover:rotate-12 transition">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Health Buddy</h2>
              <p className="text-buddy-100 text-sm">Patient support, Consultant tools, and Pharmacy verification.</p>
            </button>
          </div>
        </div>

        <footer className="p-6 text-center text-buddy-200 text-sm">
          <p>© 2026 Buddy AI. Made by Caleb & Anwar.</p>
        </footer>
      </div>

      {showWhatsNew && <WhatsNewDialog onClose={handleCloseWhatsNew} />}
    </>
  );
};

export default App;