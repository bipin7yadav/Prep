import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronDown, 
  Flag, 
  Copy, 
  Check, 
  BookOpen, 
  Search, 
  X, 
  Building2, 
  Lightbulb, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  Target, 
  CheckCircle2, 
  Circle,
  Code2,
  Filter
} from 'lucide-react';
import { 
  DSA_PROBLEMS, 
  DSA_CATEGORIES, 
  PYTHON_DSA_CHEATSHEET 
} from '../data/dsaPracticeData';

export default function DsaPracticeView({ 
  solvedProblemIds = [], 
  onToggleSolved = () => {}, 
  flaggedProblemIds = [], 
  onToggleFlagged = () => {} 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Solved', 'Unsolved', 'Flagged'
  const [expandedProblemId, setExpandedProblemId] = useState(DSA_PROBLEMS[0]?.id || null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return DSA_PROBLEMS.filter(prob => {
      // Category match
      if (selectedCategory !== 'All' && prob.category !== selectedCategory) {
        return false;
      }
      // Difficulty match
      if (selectedDifficulty !== 'All' && prob.difficulty !== selectedDifficulty) {
        return false;
      }
      // Status match
      const isSolved = solvedProblemIds.includes(prob.id);
      const isFlagged = flaggedProblemIds.includes(prob.id);
      if (statusFilter === 'Solved' && !isSolved) return false;
      if (statusFilter === 'Unsolved' && isSolved) return false;
      if (statusFilter === 'Flagged' && !isFlagged) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = prob.title.toLowerCase().includes(q);
        const inPattern = prob.pattern.toLowerCase().includes(q);
        const inStatement = prob.statement.toLowerCase().includes(q);
        const inBanking = (prob.bankingScenario || '').toLowerCase().includes(q);
        return inTitle || inPattern || inStatement || inBanking;
      }

      return true;
    });
  }, [selectedCategory, selectedDifficulty, statusFilter, searchQuery, solvedProblemIds, flaggedProblemIds]);

  // Close cheatsheet on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowCheatSheet(false);
      }
    };
    if (showCheatSheet) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCheatSheet]);

  const solvedCount = solvedProblemIds.length;
  const totalCount = DSA_PROBLEMS.length;
  const solvedPercent = Math.round((solvedCount / totalCount) * 100);

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
              <Code2 size={13} />
              <span>Python-First Coding Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              High-Yield DSA Code Practice
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Curated master patterns for SDE II interviews at IDFC FIRST Bank. Featuring Python solutions, Hinglish mental models, time/space complexities, and direct banking ledger & transaction scenarios.
            </p>
          </div>

          {/* Quick Stats & Cheat Sheet Button */}
          <div className="flex flex-col sm:flex-row md:flex-col items-end gap-3 shrink-0">
            <button
              onClick={() => setShowCheatSheet(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={16} />
              <span>Python DSA Cheatsheet</span>
            </button>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 w-full text-center">
              <div className="text-xs text-slate-400">Mastery Progress</div>
              <div className="text-lg font-bold text-white mt-0.5">
                {solvedCount} / {totalCount} Solved <span className="text-emerald-400 text-sm font-medium">({solvedPercent}%)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${solvedPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {DSA_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' 
              ? DSA_PROBLEMS.length 
              : DSA_PROBLEMS.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-700 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search problems, patterns, banking scenarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedDifficulty === diff 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
            {[
              { id: 'All', label: 'All', icon: null },
              { id: 'Solved', label: 'Solved', icon: <CheckCircle2 size={12} className="text-emerald-500" /> },
              { id: 'Unsolved', label: 'Unsolved', icon: <Circle size={12} className="text-slate-400" /> },
              { id: 'Flagged', label: 'Review', icon: <Flag size={12} className="text-amber-500 fill-amber-500" /> },
            ].map(st => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                  statusFilter === st.id 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {st.icon}
                <span>{st.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing <strong className="text-slate-700 dark:text-slate-200">{filteredProblems.length}</strong> of {DSA_PROBLEMS.length} problems</span>
        <span>Click any card to expand full solution & approach</span>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
            <div className="text-3xl">🎯</div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">No matching DSA problems found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try adjusting your category filter, difficulty level, or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredProblems.map((prob, idx) => {
            const isExpanded = expandedProblemId === prob.id;
            const isSolved = solvedProblemIds.includes(prob.id);
            const isFlagged = flaggedProblemIds.includes(prob.id);

            const difficultyBadgeColor = {
              'Easy': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
              'Medium': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
              'Hard': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
            }[prob.difficulty] || 'bg-slate-500/10 text-slate-600';

            return (
              <div 
                key={prob.id}
                className={`bg-white dark:bg-slate-800 rounded-xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  isExpanded 
                    ? 'border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/10' 
                    : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Header Summary Row */}
                <div 
                  onClick={() => setExpandedProblemId(isExpanded ? null : prob.id)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {/* Mark Solved Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSolved(prob.id);
                      }}
                      className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                        isSolved 
                          ? 'bg-emerald-500 text-white shadow-sm' 
                          : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                      }`}
                      title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                    >
                      {isSolved && <span className="text-xs font-bold">✓</span>}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                          #{idx + 1}
                        </span>
                        <h3 className={`text-base font-semibold transition-colors ${
                          isSolved ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                        }`}>
                          {prob.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${difficultyBadgeColor}`}>
                          {prob.difficulty}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px]">
                          📂 {prob.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40 text-[11px]">
                          🧩 {prob.pattern}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Flag / Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFlagged(prob.id);
                      }}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isFlagged 
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-500' 
                          : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:border-slate-300'
                      }`}
                      title={isFlagged ? "Remove from Mistake Book" : "Add to Mistake Book / Need Review"}
                    >
                      <Flag size={15} className={isFlagged ? "fill-amber-500 text-amber-500" : ""} />
                    </button>

                    {/* Expand Arrow */}
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                      <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Problem Detail Body */}
                {isExpanded && (
                  <div className="border-t border-slate-200 dark:border-slate-700/80 p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-900/30 space-y-6">
                    {/* Problem Statement */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Problem Statement & Constraints
                      </h4>
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                        <p>{prob.statement}</p>
                        {prob.constraints && (
                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 font-mono">
                            <strong>Constraints:</strong> {prob.constraints}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Banking Real-World Application Scenario Callout */}
                    {prob.bankingScenario && (
                      <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-sm text-blue-900 dark:text-blue-200 flex items-start gap-3">
                        <Building2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <strong className="block text-xs uppercase tracking-wider text-blue-700 dark:text-blue-300 font-bold">
                            IDFC FIRST Bank Production Scenario
                          </strong>
                          <p className="text-xs sm:text-sm leading-relaxed text-blue-900/90 dark:text-blue-200/90">
                            {prob.bankingScenario}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Intuition & Hinglish Mental Model */}
                    <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
                      <Lightbulb size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <strong className="block text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 font-bold">
                          Hinglish Intuition & Mental Model
                        </strong>
                        <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/90 font-sans">
                          {prob.intuitionHinglish}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Approach */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Algorithmic Approach
                      </h4>
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                        {prob.approach}
                      </div>
                    </div>

                    {/* Python Solution Code Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <Code2 size={14} className="text-indigo-600 dark:text-indigo-400" />
                          <span>Python 3 Verified Solution</span>
                        </h4>
                        <button
                          onClick={() => handleCopyCode(prob.id, prob.pythonSolution)}
                          className="px-2.5 py-1 text-xs rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-1.5"
                        >
                          {copiedCodeId === prob.id ? (
                            <>
                              <Check size={13} className="text-emerald-500" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 text-slate-100 text-xs sm:text-sm font-mono p-4 overflow-x-auto">
                        <pre>
                          <code>{prob.pythonSolution}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Complexity Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock size={13} className="text-slate-500" />
                          <span>Time Complexity</span>
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                          {prob.timeComplexity}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Cpu size={13} className="text-slate-500" />
                          <span>Space Complexity</span>
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                          {prob.spaceComplexity}
                        </div>
                      </div>
                    </div>

                    {/* Common Mistakes & Edge Cases */}
                    {prob.commonMistakes && (
                      <div className="p-4 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-sm text-rose-900 dark:text-rose-200 flex items-start gap-3">
                        <AlertTriangle size={18} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <strong className="block text-xs uppercase tracking-wider text-rose-700 dark:text-rose-300 font-bold">
                            Common Pitfalls & Edge Cases
                          </strong>
                          <p className="text-xs sm:text-sm leading-relaxed text-rose-900/90 dark:text-rose-200/90">
                            {prob.commonMistakes}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Interviewer Follow-Ups */}
                    {prob.interviewerFollowUps && prob.interviewerFollowUps.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          <Target size={14} />
                          <span>High-Frequency Interviewer Follow-Ups</span>
                        </h4>
                        <ul className="space-y-2">
                          {prob.interviewerFollowUps.map((fu, fIdx) => (
                            <li 
                              key={fIdx}
                              className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                            >
                              <span className="text-indigo-500 font-bold mt-0.5">Q:</span>
                              <span className="leading-relaxed">{fu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                      <button
                        onClick={() => onToggleFlagged(prob.id)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                          isFlagged 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <Flag size={13} className={isFlagged ? "fill-amber-500 text-amber-500" : ""} />
                        <span>{isFlagged ? 'Flagged in Mistake Book' : 'Flag for Revision'}</span>
                      </button>

                      <button
                        onClick={() => onToggleSolved(prob.id)}
                        className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                          isSolved 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isSolved ? (
                          <>
                            <Check size={14} />
                            <span>Marked as Solved</span>
                          </>
                        ) : (
                          <span>Mark as Solved</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Python DSA Cheatsheet Modal */}
      {showCheatSheet && (
        <div 
          onClick={() => setShowCheatSheet(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <BookOpen size={20} className="text-indigo-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Python DSA Cheat Sheet for Coding Rounds</h3>
                  <p className="text-xs text-slate-400">High-frequency boilerplate templates, collections, and heap patterns</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCheatSheet(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {PYTHON_DSA_CHEATSHEET.map((sheet, sIdx) => (
                <div key={sIdx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      {sheet.topic}
                    </span>
                    <button
                      onClick={() => handleCopyCode(`sheet-${sIdx}`, sheet.code)}
                      className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1"
                    >
                      {copiedCodeId === `sheet-${sIdx}` ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-300 overflow-x-auto">
                    <pre>
                      <code>{sheet.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 text-right">
              <button
                onClick={() => setShowCheatSheet(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
