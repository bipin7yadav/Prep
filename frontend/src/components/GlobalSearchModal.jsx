import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LESSONS_METADATA } from '../data/lessonsContent';
import { FLASHCARDS } from '../data/flashcardsData';
import { DSA_PROBLEMS } from '../data/dsaPracticeData';
import { IMPORTANT_TOPICS } from '../data/importantTopicsData';

export default function GlobalSearchModal({ 
  isOpen, 
  onClose, 
  onNavigate = () => {} 
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K and Esc listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate('search-open'); // parent can toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  // Search across datasets
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const matches = [];

    // 1. Lessons / Chapters
    LESSONS_METADATA.forEach(l => {
      if (l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q) || l.category.toLowerCase().includes(q)) {
        matches.push({
          type: 'Lesson',
          typeBadge: '📖 Lesson',
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          title: l.title,
          subtitle: `${l.category} • ~${l.readingTimeMinutes} min read`,
          tab: 'curriculum',
          payload: l.id
        });
      }
    });

    // 2. Important Topics
    IMPORTANT_TOPICS.forEach(t => {
      if (t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) {
        matches.push({
          type: 'Topic',
          typeBadge: `⭐ ${t.tier}`,
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          title: t.title,
          subtitle: `${t.category} • ~${t.studyTimeMinutes} mins`,
          tab: 'important',
          payload: t.id
        });
      }
    });

    // 3. DSA Problems
    DSA_PROBLEMS.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.pattern.toLowerCase().includes(q) || (p.bankingScenario || '').toLowerCase().includes(q)) {
        matches.push({
          type: 'DSA',
          typeBadge: `💻 ${p.difficulty}`,
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          title: p.title,
          subtitle: `${p.category} • Pattern: ${p.pattern}`,
          tab: 'dsa',
          payload: p.id
        });
      }
    });

    // 4. Flashcards
    FLASHCARDS.forEach(c => {
      const qText = (c.question || c.front || '').toLowerCase();
      const aText = (c.answerHinglish || c.back || '').toLowerCase();
      const topicText = (c.topic || '').toLowerCase();
      if (qText.includes(q) || aText.includes(q) || topicText.includes(q)) {
        matches.push({
          type: 'Flashcard',
          typeBadge: `🗂️ ${c.dimension || 'Card'}`,
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          title: c.question || c.front,
          subtitle: `${c.domain} • ${(c.answerHinglish || c.back || '').slice(0, 70)}...`,
          tab: 'flashcards',
          payload: c.id
        });
      }
    });

    return matches.slice(0, 30); // Cap at 30 results
  }, [query]);

  // Keyboard navigation
  const handleKeyDownList = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  const handleSelect = (item) => {
    onNavigate(item.tab, item.payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <span className="text-xl text-slate-400">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all lessons, flashcards, DSA, topics... (e.g. 'event loop', 'ACID', '3Sum')"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownList}
            className="w-full bg-transparent text-white text-base placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto space-y-1">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <div className="text-2xl">⚡</div>
              <p className="text-sm font-medium">Type any keyword to search across the entire IDFC Prep OS</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['Event Loop', 'Idempotency', 'Kadane', 'ACID', 'Kafka', 'JWT', 'Virtual DOM', '3Sum'].map(suggest => (
                  <button
                    key={suggest}
                    onClick={() => setQuery(suggest)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
                  >
                    {suggest}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <div className="text-2xl">🔎</div>
              <p className="text-sm font-semibold text-slate-300">No results found for "{query}"</p>
              <p className="text-xs text-slate-500">Try searching for broader concepts like 'SQL', 'Docker', or 'React'</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-indigo-600/30 border border-indigo-500/50 text-white' : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.badgeColor}`}>
                        {item.typeBadge}
                      </span>
                      <h4 className="text-sm font-semibold truncate text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 truncate pl-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="text-xs text-slate-400 shrink-0 font-medium">
                    {isSelected ? 'Enter ↵' : '→'}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-500 px-4">
          <div className="flex items-center gap-3">
            <span>Navigate: <kbd className="bg-slate-800 px-1 rounded text-slate-400">↑</kbd> <kbd className="bg-slate-800 px-1 rounded text-slate-400">↓</kbd></span>
            <span>Select: <kbd className="bg-slate-800 px-1 rounded text-slate-400">↵</kbd></span>
          </div>
          <span>Found {results.length} matches</span>
        </div>
      </div>
    </div>
  );
}
