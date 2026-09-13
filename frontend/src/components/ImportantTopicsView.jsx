import React, { useState, useMemo } from 'react';
import { IMPORTANT_TOPICS } from '../data/importantTopicsData';

export default function ImportantTopicsView({ 
  completedTopicIds = [], 
  onToggleCompleted = () => {},
  onSelectLesson = () => {} 
}) {
  const [selectedTier, setSelectedTier] = useState('All'); // 'All', 'Must Know', 'High', 'Good', 'Nice'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState(IMPORTANT_TOPICS[0]?.id || null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(IMPORTANT_TOPICS.map(t => t.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return IMPORTANT_TOPICS.filter(topic => {
      if (selectedTier !== 'All' && topic.tier !== selectedTier) return false;
      if (selectedCategory !== 'All' && topic.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = topic.title.toLowerCase().includes(q);
        const inSummary = topic.summary.toLowerCase().includes(q);
        const inRelevance = (topic.bankingRelevance || '').toLowerCase().includes(q);
        const inQuestions = topic.keyQuestions.some(ques => ques.toLowerCase().includes(q));
        return inTitle || inSummary || inRelevance || inQuestions;
      }
      return true;
    });
  }, [selectedTier, selectedCategory, searchQuery]);

  // Metrics
  const totalTopics = IMPORTANT_TOPICS.length;
  const completedCount = completedTopicIds.length;
  const mustKnowTotal = IMPORTANT_TOPICS.filter(t => t.tier === 'Must Know').length;
  const mustKnowCompleted = IMPORTANT_TOPICS.filter(t => t.tier === 'Must Know' && completedTopicIds.includes(t.id)).length;
  const totalEstimatedMinutes = IMPORTANT_TOPICS.reduce((acc, t) => acc + t.studyTimeMinutes, 0);

  const tierColors = {
    'Must Know': {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      badge: 'bg-rose-600 text-white',
      border: 'border-rose-300 dark:border-rose-900/50'
    },
    'High': {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      badge: 'bg-amber-600 text-white',
      border: 'border-amber-300 dark:border-amber-900/50'
    },
    'Good': {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      badge: 'bg-emerald-600 text-white',
      border: 'border-emerald-300 dark:border-emerald-900/50'
    },
    'Nice': {
      bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
      badge: 'bg-slate-600 text-white',
      border: 'border-slate-300 dark:border-slate-700'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-rose-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider border border-rose-500/30">
              <span>⭐ High-Yield Focus Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Important Topics Matrix
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Prioritized by interview recurrence and technical rigor at IDFC FIRST Bank. Master Tier 1 (Must Know) before stepping into any interview round.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 sm:p-4 min-w-[140px] text-center">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Must-Know Mastered</div>
              <div className="text-xl font-extrabold text-rose-400 mt-1">
                {mustKnowCompleted} / {mustKnowTotal}
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((mustKnowCompleted / mustKnowTotal) * 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 sm:p-4 min-w-[140px] text-center">
              <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Total Syllabus</div>
              <div className="text-xl font-extrabold text-emerald-400 mt-1">
                {completedCount} / {totalTopics}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                ~{Math.round(totalEstimatedMinutes / 60)} hrs total study
              </div>
            </div>
          </div>
        </div>

        {/* Tier Filter Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {[
            { id: 'All', label: 'All Tiers', count: totalTopics },
            { id: 'Must Know', label: '🔴 Must Know (Tier 1)', count: mustKnowTotal },
            { id: 'High', label: '🟠 High Probability (Tier 2)', count: IMPORTANT_TOPICS.filter(t => t.tier === 'High').length },
            { id: 'Good', label: '🟡 Good to Know (Tier 3)', count: IMPORTANT_TOPICS.filter(t => t.tier === 'Good').length },
            { id: 'Nice', label: '🟢 Nice to Have (Tier 4)', count: IMPORTANT_TOPICS.filter(t => t.tier === 'Nice').length },
          ].map(tier => {
            const isSelected = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-white text-slate-900 shadow-md scale-102' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{tier.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-slate-200 text-slate-800' : 'bg-slate-700 text-slate-400'
                }`}>
                  {tier.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Search & Category Filter */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search topics, questions, banking terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
            <div className="text-3xl">🎯</div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">No topics match your filters</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try choosing "All Tiers" or clear your search input.
            </p>
          </div>
        ) : (
          filteredTopics.map((topic, idx) => {
            const isExpanded = expandedTopicId === topic.id;
            const isCompleted = completedTopicIds.includes(topic.id);
            const style = tierColors[topic.tier] || tierColors['Good'];

            return (
              <div 
                key={topic.id}
                className={`bg-white dark:bg-slate-800 rounded-xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  isExpanded 
                    ? 'border-rose-500 dark:border-rose-500 ring-2 ring-rose-500/10' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {/* Mark Complete Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompleted(topic.id);
                      }}
                      className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                        isCompleted 
                          ? 'bg-emerald-500 text-white shadow-sm' 
                          : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                      }`}
                      title={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
                    >
                      {isCompleted && <span className="text-xs font-bold">✓</span>}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                          #{idx + 1}
                        </span>
                        <h3 className={`text-base font-semibold transition-colors ${
                          isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                        }`}>
                          {topic.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded border text-[11px] font-bold ${style.bg}`}>
                          {topic.tier}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px]">
                          📂 {topic.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px]">
                          ⏱️ ~{topic.studyTimeMinutes} mins
                        </span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40 text-[11px] font-medium">
                          🎯 {topic.interviewFrequency}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-500 transition-transform">
                      {isExpanded ? '▲' : '▼'}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-200 dark:border-slate-700 p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-900/30 space-y-5">
                    {/* Summary */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Concept Overview & Core Invariants
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {topic.summary}
                      </p>
                    </div>

                    {/* Banking Relevance */}
                    {topic.bankingRelevance && (
                      <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-sm text-rose-950 dark:text-rose-200 flex items-start gap-3">
                        <span className="text-xl">🏦</span>
                        <div className="space-y-1">
                          <strong className="block text-xs uppercase tracking-wider text-rose-700 dark:text-rose-300 font-bold">
                            Why IDFC FIRST Bank Cares
                          </strong>
                          <p className="text-xs sm:text-sm leading-relaxed text-rose-900/90 dark:text-rose-200/90">
                            {topic.bankingRelevance}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Key Interview Questions */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <span>🎯 High-Frequency IDFC Interview Questions to Prepare</span>
                      </h4>
                      <div className="space-y-2">
                        {topic.keyQuestions.map((q, qIdx) => (
                          <div 
                            key={qIdx}
                            className="p-3.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-3"
                          >
                            <span className="font-bold text-rose-600 dark:text-rose-400 mt-0.5">Q{qIdx + 1}:</span>
                            <span className="leading-relaxed font-medium">{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectLesson(topic.lessonDocId)}
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
                      >
                        <span>📖 Open Full Chapter in Reader</span>
                        <span>→</span>
                      </button>

                      <button
                        onClick={() => onToggleCompleted(topic.id)}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                          isCompleted 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                        }`}
                      >
                        {isCompleted ? '✓ Completed' : 'Mark as Completed'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
