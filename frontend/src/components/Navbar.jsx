import React from 'react';
import { 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Database, 
  FileText, 
  User, 
  Clock,
  Star,
  Code2,
  AlertCircle,
  Zap,
  Search
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedTrack, 
  setSelectedTrack,
  mistakeCount = 0,
  onOpenSearch = () => {}
}) {
  const tracks = [
    { id: "7D", label: "7-Day Sprint", hours: "56h" },
    { id: "14D", label: "14-Day Fast-Track", hours: "70h" },
    { id: "1M", label: "1-Month Comprehensive", hours: "90h" },
    { id: "2M", label: "2-Month Deep-Dive", hours: "135h" },
    { id: "3M", label: "3-Month Full Mastery", hours: "180h" },
    { id: "6M", label: "6-Month Career Transformation", hours: "300h" },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Compass },
    { id: "curriculum", label: "Curriculum", icon: BookOpen, badge: "45 Ch" },
    { id: "important", label: "Important Topics", icon: Star, badge: "Must-Know" },
    { id: "dsa", label: "DSA Practice", icon: Code2, badge: "47 Probs" },
    { id: "flashcards", label: "Flashcards", icon: Layers, badge: "224" },
    { id: "quiz", label: "Quizzes", icon: CheckCircle2, badge: "24 Qs" },
    { 
      id: "mistakes", 
      label: "Mistake Book", 
      icon: AlertCircle, 
      badge: mistakeCount > 0 ? `${mistakeCount}` : null,
      badgeColor: 'bg-red-600 text-white animate-pulse'
    },
    { id: "resume", label: "Resume Defense", icon: User },
    { id: "database", label: "Banking DB", icon: Database },
    { id: "lastminute", label: "Last-Minute", icon: Zap, badge: "⚡ Cram" },
    { id: "pdfs", label: "PDF Books", icon: FileText, badge: "11" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Top Banner with Candidate Info & Track Picker */}
      <div className="bg-[#9B1B33] text-white px-4 sm:px-6 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-white/20 px-2 py-0.5 rounded font-bold tracking-wider text-[11px]">
            IDFC FIRST BANK
          </span>
          <span className="text-amber-300 font-semibold hidden sm:inline">
            Strategic Projects & New Age Engineering
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span>Target Candidate: <strong>Bipin Yadav (SDE II, 4+ YoE)</strong></span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search Shortcut */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded text-white text-[11px] font-medium transition-colors"
            title="Global Search (Ctrl+K)"
          >
            <Search size={12} />
            <span>Search</span>
            <kbd className="bg-black/20 px-1 rounded text-[10px]">Ctrl+K</kbd>
          </button>

          {/* Prep Track Selector */}
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-amber-300" />
            <span className="hidden md:inline">Prep Track:</span>
            <select 
              value={selectedTrack} 
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="bg-white/15 text-white border border-white/30 rounded px-2 py-0.5 text-[11px] font-semibold cursor-pointer outline-none focus:ring-1 focus:ring-amber-400"
            >
              {tracks.map(t => (
                <option key={t.id} value={t.id} className="text-slate-900 bg-white">
                  {t.label} ({t.hours})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16 gap-4">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#9B1B33] text-white flex items-center justify-center font-extrabold text-sm tracking-tight shadow-md">
            IDFC
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-none">
              Interview OS
            </div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
              Developer Preparation Portal
            </div>
          </div>
        </div>

        {/* Tab Links */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-[#9B1B33] dark:text-rose-300 shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-[#9B1B33] dark:text-rose-300' : 'text-slate-500'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    item.badgeColor 
                      ? item.badgeColor 
                      : isActive 
                        ? 'bg-[#9B1B33] text-white' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
