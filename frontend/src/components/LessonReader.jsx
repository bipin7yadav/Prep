import React, { useState, useEffect, useMemo } from 'react';
import { LESSONS_CONTENT, LESSONS_BY_ID } from '../data/lessonsContent';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  Filter, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Check, 
  ExternalLink,
  Layers,
  ArrowRight,
  ArrowLeft,
  X,
  ListFilter
} from 'lucide-react';

export default function LessonReader({ 
  activeLessonId: propActiveLessonId,
  initialLessonId = '01-python-numpy', 
  onSelectLesson,
  completedLessons = [], 
  completedLessonIds = [],
  onToggleComplete,
  onToggleCompleted,
  onNavigateToTab = () => {} 
}) {
  const [activeLessonId, setActiveLessonId] = useState(propActiveLessonId || initialLessonId);
  const [curriculumViewMode, setCurriculumViewMode] = useState('reader'); // 'reader' or 'modules'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState('01-PYTHON-DATA');

  // Synchronize when parent updates activeLessonId prop
  useEffect(() => {
    if (propActiveLessonId && propActiveLessonId !== activeLessonId) {
      setActiveLessonId(propActiveLessonId);
    }
  }, [propActiveLessonId]);

  // Combined completed lessons
  const allCompleted = useMemo(() => {
    return new Set([...completedLessons, ...completedLessonIds]);
  }, [completedLessons, completedLessonIds]);

  // Find active lesson or default to first
  const activeLesson = LESSONS_BY_ID[activeLessonId] || LESSONS_CONTENT[0];

  // Group lessons by domain
  const domains = useMemo(() => {
    const set = new Set(LESSONS_CONTENT.map(l => l.domain));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredLessons = useMemo(() => {
    return LESSONS_CONTENT.filter(l => {
      const matchDomain = selectedDomain === 'All' || l.domain === selectedDomain;
      const matchSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.headings.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchDomain && matchSearch;
    });
  }, [selectedDomain, searchQuery]);

  // Current index in list for Next/Prev
  const currentIndex = filteredLessons.findIndex(l => l.id === activeLesson.id);
  const prevLesson = currentIndex > 0 ? filteredLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < filteredLessons.length - 1 ? filteredLessons[currentIndex + 1] : null;

  const isCompleted = allCompleted.has(activeLesson.id);

  // Scroll to top of lesson content on change
  useEffect(() => {
    const el = document.getElementById('lesson-scroll-top');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [activeLessonId, curriculumViewMode]);

  const handleLessonSelect = (id) => {
    setActiveLessonId(id);
    if (onSelectLesson) onSelectLesson(id);
    setIsMobileDrawerOpen(false);
    setCurriculumViewMode('reader');
  };

  const handleToggle = () => {
    if (onToggleCompleted) {
      onToggleCompleted(activeLesson.id);
    } else if (onToggleComplete) {
      onToggleComplete(activeLesson.id);
    }
  };

  // Find matching lesson ID for a module
  const findLessonForModule = (mod) => {
    const found = LESSONS_CONTENT.find(l => 
      l.filePath.toLowerCase().includes(mod.id.toLowerCase()) ||
      l.domain.toLowerCase().includes(mod.title.toLowerCase()) ||
      l.folder.toLowerCase().includes(mod.id.toLowerCase())
    );
    return found ? found.id : LESSONS_CONTENT[0].id;
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-4 sm:space-y-6" id="lesson-scroll-top">
      {/* View Mode Toggle: Interactive Textbook vs 16-Module Syllabus */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl w-full sm:w-auto border border-slate-200">
          <button
            onClick={() => setCurriculumViewMode('reader')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              curriculumViewMode === 'reader'
                ? 'bg-white text-[#9B1B33] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen size={14} />
            <span>📖 Interactive Textbook ({LESSONS_CONTENT.length} Chapters)</span>
          </button>
          <button
            onClick={() => setCurriculumViewMode('modules')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              curriculumViewMode === 'modules'
                ? 'bg-white text-[#9B1B33] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers size={14} />
            <span>📚 16 Modules Syllabus</span>
          </button>
        </div>

        {/* Font size & Completed toggle (visible in reader mode) */}
        {curriculumViewMode === 'reader' && (
          <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto shrink-0">
            {/* Font Size Adjuster */}
            <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-300 text-xs">
              <button 
                onClick={() => setFontSize('small')} 
                className={`px-2.5 py-1 rounded font-medium transition-all ${fontSize === 'small' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                title="Small Font"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('medium')} 
                className={`px-2.5 py-1 rounded font-medium transition-all ${fontSize === 'medium' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                title="Normal Font"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')} 
                className={`px-2.5 py-1 rounded font-medium transition-all ${fontSize === 'large' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                title="Large Font"
              >
                A+
              </button>
            </div>

            {/* Mark Completed Toggle */}
            <button
              onClick={handleToggle}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isCompleted 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2 size={15} className={isCompleted ? 'text-emerald-600' : 'text-slate-400'} />
              <span>{isCompleted ? 'Completed' : 'Mark Read'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: INTERACTIVE TEXTBOOK CHAPTER READER (Default)                     */}
      {/* ========================================================================= */}
      {curriculumViewMode === 'reader' && (
        <div className="space-y-4">
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-0.5">
            <BookOpen size={14} className="text-[#9B1B33] shrink-0" />
            <span>Curriculum</span>
            <ChevronRight size={13} className="shrink-0 text-slate-400" />
            <span className="font-semibold text-slate-700">{activeLesson.domain}</span>
            <ChevronRight size={13} className="shrink-0 text-slate-400" />
            <span className="text-[#9B1B33] font-bold truncate max-w-[240px] sm:max-w-none">{activeLesson.title}</span>
          </div>

          {/* Dedicated Mobile Chapter Quick-Switch Bar (< lg) */}
          <div className="lg:hidden p-2.5 sm:p-3 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between gap-2">
            <button 
              onClick={() => prevLesson && handleLessonSelect(prevLesson.id)}
              disabled={!prevLesson}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 transition-colors"
              title="Previous Chapter"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="flex-1 min-w-0 px-2 py-1 text-center hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Ch {currentIndex >= 0 ? currentIndex + 1 : 1} of {filteredLessons.length} • Tap for Chapter List
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {activeLesson.title}
              </div>
            </button>

            <button 
              onClick={() => nextLesson && handleLessonSelect(nextLesson.id)}
              disabled={!nextLesson}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 transition-colors"
              title="Next Chapter"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Mobile Chapter Drawer Modal */}
          {isMobileDrawerOpen && (
            <div 
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start lg:hidden"
              onClick={() => setIsMobileDrawerOpen(false)}
            >
              <div 
                className="w-[85vw] max-w-sm h-full bg-white shadow-2xl flex flex-col p-4 animate-in slide-in-from-left duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#9B1B33]" />
                    <span className="font-extrabold text-sm text-slate-900">Textbook Chapters ({filteredLessons.length})</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Drawer Search & Domain Filter */}
                <div className="space-y-2 mb-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search chapters..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B33]"
                    />
                  </div>

                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-700"
                  >
                    {domains.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Drawer Lessons Scrollable List */}
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                  {filteredLessons.map(l => {
                    const isActive = l.id === activeLesson.id;
                    const isDone = allCompleted.has(l.id);
                    return (
                      <div
                        key={l.id}
                        onClick={() => handleLessonSelect(l.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-rose-50 border-[#9B1B33] text-[#9B1B33] font-bold shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-xs font-semibold leading-snug">
                            {l.title}
                          </div>
                          {isDone && <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span>{l.readTime}</span>
                          <span>•</span>
                          <span className={`font-semibold ${l.priority.includes('Must') ? 'text-red-500' : 'text-amber-500'}`}>
                            {l.domain}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Master Layout: TOC Sidebar + Lesson Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start w-full min-w-0">
            {/* Desktop Sidebar Navigation (Hidden on < lg) */}
            <aside className="hidden lg:block bg-white border border-slate-200 rounded-2xl p-4 sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto shadow-sm min-w-0">
              <div className="text-sm font-extrabold text-slate-900 mb-3 flex items-center justify-between">
                <span>Textbook Chapters</span>
                <span className="text-xs text-slate-500 font-semibold">{filteredLessons.length} lessons</span>
              </div>

              {/* Search Input */}
              <div className="relative mb-2.5">
                <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search lessons & topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B33]"
                />
              </div>

              {/* Domain Dropdown */}
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg mb-3 font-semibold text-slate-700"
              >
                {domains.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* Lesson List */}
              <div className="space-y-1.5 pr-0.5">
                {filteredLessons.map(l => {
                  const isActive = l.id === activeLesson.id;
                  const isDone = allCompleted.has(l.id);
                  return (
                    <div
                      key={l.id}
                      onClick={() => handleLessonSelect(l.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-rose-50/80 border-[#9B1B33] text-[#9B1B33] shadow-sm font-bold' 
                          : 'bg-white border-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-semibold leading-snug">
                          {l.title}
                        </div>
                        {isDone && <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span>{l.readTime}</span>
                        <span>•</span>
                        <span className={`font-semibold ${l.priority.includes('Must') ? 'text-red-500' : 'text-amber-600'}`}>
                          {l.priority.split(' ')[1] || 'Core'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Main Lesson Body */}
            <article className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-6 md:p-8 lg:p-10 shadow-sm min-w-0 w-full max-w-full overflow-hidden">
              {/* Lesson Title Header */}
              <div className="border-b-2 border-slate-100 pb-4 sm:pb-5 mb-5 sm:mb-6">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <span className="badge badge-red text-[11px]">{activeLesson.domain}</span>
                  <span className="badge badge-gold text-[11px]">{activeLesson.priority}</span>
                  <span className="badge badge-gray text-[11px]">{activeLesson.difficulty}</span>
                </div>

                <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug break-words mb-2 sm:mb-3">
                  {activeLesson.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 shrink-0">
                    <Clock size={13} /> Read Time: {activeLesson.readTime}
                  </span>
                  <span>•</span>
                  <span className="break-all text-[11px] text-slate-600">
                    Source: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">{activeLesson.filePath}</code>
                  </span>
                </div>
              </div>

              {/* Hinglish Mental Model Box */}
              <div className="bg-[#FEF9EE] border-l-4 border-[#C29B38] p-3.5 sm:p-5 rounded-r-xl mb-6 shadow-sm overflow-hidden break-words">
                <div className="flex items-center gap-1.5 text-[#8D6B19] font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Sparkles size={15} className="shrink-0" /> HINGLISH INTERVIEW MENTAL MODEL & PITCH
                </div>
                <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed italic m-0">
                  "{activeLesson.summary}"
                </p>
              </div>

              {/* Rendered Full Markdown HTML */}
              <div 
                className="lesson-content min-w-0 w-full max-w-full overflow-hidden"
                style={{
                  fontSize: fontSize === 'small' ? '0.92rem' : fontSize === 'large' ? '1.12rem' : '1rem'
                }}
                dangerouslySetInnerHTML={{ __html: activeLesson.html }} 
              />

              {/* Bottom Chapter Completion & Navigation */}
              <div className="border-t-2 border-slate-100 pt-5 mt-8 sm:mt-10">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                  <button
                    onClick={handleToggle}
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all ${
                      isCompleted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#9B1B33] hover:bg-[#801428]'
                    }`}
                  >
                    <Check size={16} />
                    <span>{isCompleted ? 'Completed! Mark Incomplete' : 'Complete This Lesson'}</span>
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onNavigateToTab('flashcards')}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-white border border-slate-300 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Layers size={14} /> Flashcards
                    </button>
                    <button
                      onClick={() => onNavigateToTab('quiz')}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-white border border-slate-300 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <CheckCircle2 size={14} /> Diagnostic
                    </button>
                  </div>
                </div>

                {/* Prev / Next Pagination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prevLesson ? (
                    <div
                      onClick={() => handleLessonSelect(prevLesson.id)}
                      className="p-3 sm:p-4 rounded-xl border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all flex items-center gap-3"
                    >
                      <ArrowLeft size={18} className="text-[#9B1B33] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Previous Chapter</div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{prevLesson.title}</div>
                      </div>
                    </div>
                  ) : <div className="hidden sm:block" />}

                  {nextLesson && (
                    <div
                      onClick={() => handleLessonSelect(nextLesson.id)}
                      className="p-3 sm:p-4 rounded-xl border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all flex items-center justify-end gap-3 text-right"
                    >
                      <div className="min-w-0">
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Next Chapter</div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{nextLesson.title}</div>
                      </div>
                      <ArrowRight size={18} className="text-[#9B1B33] shrink-0" />
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: 16 MODULES COMPREHENSIVE ROADMAP (High-level Syllabus)             */}
      {/* ========================================================================= */}
      {curriculumViewMode === 'modules' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#9B1B33] to-[#751125] text-white p-5 sm:p-7 rounded-2xl shadow-md">
            <div className="text-[11px] uppercase tracking-wider font-bold text-amber-300 mb-1">
              16 Comprehensive Technical Modules
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              IDFC FIRST Bank Strategic Engineering Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-2xl leading-relaxed">
              Targeted modules covering Python Analytics, ACID Relational Databases, High-Concurrency Node.js, FinTech UPI Ledger Architecture, and System Design.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {CURRICULUM_MODULES.map(mod => {
              const isExpanded = expandedModuleId === mod.id;
              const matchingLessonId = findLessonForModule(mod);

              return (
                <div 
                  key={mod.id}
                  className={`bg-white rounded-xl border transition-all overflow-hidden ${
                    isExpanded 
                      ? 'border-[#9B1B33] shadow-md' 
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div 
                    onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                    className="p-3.5 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 mt-0.5 sm:mt-0 ${
                        isExpanded ? 'bg-rose-50 text-[#9B1B33]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {mod.num}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <h3 className="text-xs sm:text-base font-bold text-slate-900">
                            {mod.title}
                          </h3>
                          {mod.badge && (
                            <span className={`text-[10px] ${mod.badge.includes('Special') ? 'badge badge-green' : 'badge badge-red'}`}>
                              {mod.badge}
                            </span>
                          )}
                          <span className="badge badge-gray text-[10px] hidden sm:inline-block">{mod.category}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 sm:line-clamp-1 max-w-2xl leading-relaxed">
                          {mod.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-slate-500 hidden sm:inline">{mod.hours}</span>
                      {isExpanded ? <ChevronDown size={18} className="text-[#9B1B33]" /> : <ChevronRight size={18} className="text-slate-400" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-3.5 sm:p-6 space-y-4 animate-in fade-in duration-150">
                      <div className="bg-[#FEF9EE] border-l-4 border-[#C29B38] p-3 sm:p-4 rounded-r-xl">
                        <div className="flex items-center gap-1.5 text-[#8D6B19] font-bold text-xs uppercase tracking-wider mb-1">
                          <Sparkles size={14} /> HINGLISH INTERVIEW MENTAL MODEL (HOW TO PITCH)
                        </div>
                        <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed italic m-0">
                          "{mod.hinglishSummary}"
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                          Core Topics & Architecture Concepts
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {mod.topics.map((t, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-white p-2.5 sm:p-3 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800">
                              <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
                        <div className="text-slate-500 truncate">
                          Primary Source: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-900 text-[11px]">{mod.markdownPath}</code>
                        </div>
                        <button
                          onClick={() => handleLessonSelect(matchingLessonId)}
                          className="flex items-center justify-center gap-1.5 bg-[#9B1B33] hover:bg-[#801428] text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm self-start sm:self-auto"
                        >
                          <BookOpen size={14} /> Open Chapter in Reader
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
