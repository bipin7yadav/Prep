import React, { useState } from 'react';
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
  Search,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedTrack, 
  setSelectedTrack,
  mistakeCount = 0,
  onOpenSearch = () => {}
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { id: "curriculum", label: "Curriculum", icon: BookOpen, badge: "50 Ch" },
    { id: "important", label: "Important Topics", icon: Star, badge: "Must-Know" },
    { id: "dsa", label: "DSA Practice", icon: Code2, badge: "47 Probs" },
    { id: "flashcards", label: "Flashcards", icon: Layers, badge: "296" },
    { id: "quiz", label: "Quizzes", icon: CheckCircle2, badge: "39 Qs" },
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
    { id: "pdfs", label: "PDF Books", icon: FileText, badge: "9" },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Top Banner with Candidate Info & Track Picker */}
      <div className="bg-[#9B1B33] text-white px-3 sm:px-6 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-[11px]">
            <span className="bg-white/20 px-1.5 py-0.5 rounded font-bold tracking-wider text-[10px]">
              IDFC FIRST BANK
            </span>
            <span className="text-amber-300 font-semibold hidden md:inline">
              Strategic Projects & New Age Engineering
            </span>
            <span className="text-slate-400 hidden md:inline">•</span>
            <span className="truncate">Candidate: <strong>Bipin Yadav (SDE II, 4+ YoE)</strong></span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end text-[11px]">
            {/* Quick Search Shortcut */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded text-white text-[11px] font-medium transition-colors"
              title="Global Search (Ctrl+K)"
            >
              <Search size={11} />
              <span>Search</span>
              <kbd className="bg-black/20 px-1 rounded text-[9px] hidden sm:inline">Ctrl+K</kbd>
            </button>

            {/* Prep Track Selector */}
            <div className="flex items-center gap-1">
              <Clock size={11} className="text-amber-300 shrink-0" />
              <span className="hidden sm:inline text-rose-200">Track:</span>
              <select 
                value={selectedTrack} 
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="bg-white/15 text-white border border-white/30 rounded px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold cursor-pointer outline-none focus:ring-1 focus:ring-amber-400 max-w-[150px] sm:max-w-none"
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
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between h-14 sm:h-16 gap-3">
        {/* Logo */}
        <div 
          onClick={() => handleSelectTab('dashboard')} 
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#9B1B33] text-white flex items-center justify-center font-extrabold text-xs sm:text-sm tracking-tight shadow-md">
            IDFC
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-none">
              Interview OS
            </div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5 hidden xs:block">
              Preparation Portal
            </div>
          </div>
        </div>

        {/* Desktop Tab Links (hidden on mobile, shown on lg screens) */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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

        {/* Mobile Actions: Search Icon + Hamburger Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-[#9B1B33] hover:bg-rose-50 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} color="#9B1B33" /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Quick-Bar (Always visible on mobile for swift switching) */}
      <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 px-3 py-1.5 overflow-x-auto flex items-center gap-1 scrollbar-none bg-slate-50 dark:bg-slate-900/50">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap shrink-0 transition-all ${
                isActive 
                  ? 'bg-[#9B1B33] text-white shadow-xs' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon size={12} />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] px-1 rounded-full font-bold ${
                  isActive ? 'bg-white text-[#9B1B33]' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Dropdown Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 shadow-xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'border-[#9B1B33] bg-rose-50/70 dark:bg-rose-950/40 text-[#9B1B33] dark:text-rose-300'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Icon size={18} className={isActive ? 'text-[#9B1B33]' : 'text-slate-500'} />
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                        item.badgeColor 
                          ? item.badgeColor 
                          : isActive 
                            ? 'bg-[#9B1B33] text-white' 
                            : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
