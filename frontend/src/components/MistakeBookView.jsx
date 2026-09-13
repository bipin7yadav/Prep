import React, { useState, useMemo } from 'react';
import { 
  AlertCircle, 
  HelpCircle, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Check, 
  RotateCw, 
  Sparkles, 
  X, 
  BookOpen, 
  ShieldCheck 
} from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data/quizData';
import { FLASHCARDS } from '../data/flashcardsData';
import { DSA_PROBLEMS } from '../data/dsaPracticeData';

export default function MistakeBookView({
  mistakeQuizIds = [],
  onResolveQuizMistake = () => {},
  flashcardsStatus = {},
  onUpdateFlashcardStatus = () => {},
  flaggedDsaIds = [],
  onResolveDsaMistake = () => {},
  onSelectLesson = () => {}
}) {
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Quiz', 'Flashcards', 'DSA'
  const [retryQuizAnswers, setRetryQuizAnswers] = useState({});
  const [retryQuizFeedback, setRetryQuizFeedback] = useState({});
  const [revealedFlashcards, setRevealedFlashcards] = useState({});

  // 1. Failed Quiz Questions
  const failedQuizzes = useMemo(() => {
    return DIAGNOSTIC_QUESTIONS.filter(q => mistakeQuizIds.includes(q.id));
  }, [mistakeQuizIds]);

  // 2. Needs Review Flashcards
  const reviewCards = useMemo(() => {
    return FLASHCARDS.filter(card => flashcardsStatus[card.id] === 'review');
  }, [flashcardsStatus]);

  // 3. Flagged DSA Problems
  const flaggedDsa = useMemo(() => {
    return DSA_PROBLEMS.filter(p => flaggedDsaIds.includes(p.id));
  }, [flaggedDsaIds]);

  const totalMistakes = failedQuizzes.length + reviewCards.length + flaggedDsa.length;

  const handleRetryQuizOption = (qId, optionIdx, correctIdx) => {
    setRetryQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    const isCorrect = optionIdx === correctIdx;
    setRetryQuizFeedback(prev => ({
      ...prev,
      [qId]: isCorrect ? 'correct' : 'wrong'
    }));

    if (isCorrect) {
      setTimeout(() => {
        onResolveQuizMistake(qId);
      }, 1200);
    }
  };

  const toggleRevealCard = (id) => {
    setRevealedFlashcards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-red-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider border border-red-500/30">
              <AlertCircle size={13} />
              <span>Target Weakness Elimination</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Mistake Book & Learning Loop
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every incorrect quiz answer, flagged flashcard, and tricky DSA problem is automatically logged here. Re-test your mistakes until your active mistake count hits zero.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 min-w-[150px] text-center">
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Active Items</div>
              <div className={`text-2xl font-extrabold mt-1 ${totalMistakes > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {totalMistakes}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {totalMistakes === 0 ? 'All Cleared! 🎉' : 'Needs Resolution'}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {[
            { id: 'All', label: 'All Mistakes', icon: <Layers size={13} />, count: totalMistakes },
            { id: 'Quiz', label: 'Failed Quizzes', icon: <HelpCircle size={13} />, count: failedQuizzes.length },
            { id: 'Flashcards', label: 'Needs-Review Cards', icon: <Sparkles size={13} />, count: reviewCards.length },
            { id: 'DSA', label: 'Flagged DSA', icon: <Code2 size={13} />, count: flaggedDsa.length },
          ].map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-red-600 text-white shadow-md font-bold' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-red-800 text-red-200' : 'bg-slate-700 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zero State Celebration */}
      {totalMistakes === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-emerald-500/30 dark:border-emerald-500/20 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Your Mistake Book is Completely Clean!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            You currently have no active failed quiz questions, flagged flashcards, or unsolved tricky DSA problems. Take another quiz or practice DSA to continuously stress-test your knowledge.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 1. Failed Quiz Section */}
          {(activeTab === 'All' || activeTab === 'Quiz') && failedQuizzes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-2">
                  <HelpCircle size={16} />
                  <span>Failed Diagnostic Quiz Questions ({failedQuizzes.length})</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Select the correct answer to resolve
                </span>
              </div>

              <div className="space-y-4">
                {failedQuizzes.map((q) => {
                  const selectedOpt = retryQuizAnswers[q.id];
                  const feedback = retryQuizFeedback[q.id];

                  return (
                    <div 
                      key={q.id}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-900/40 p-5 sm:p-6 shadow-sm space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50">
                            {q.category}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pt-1">
                            {q.question}
                          </h4>
                        </div>

                        <button
                          onClick={() => onResolveQuizMistake(q.id)}
                          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 shrink-0"
                          title="Dismiss without re-test"
                        >
                          Dismiss
                        </button>
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          const isCorrect = oIdx === q.correct;
                          
                          let btnStyle = 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300';
                          if (selectedOpt !== undefined) {
                            if (isCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold';
                            } else if (isSelected) {
                              btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleRetryQuizOption(q.id, oIdx, q.correct)}
                              disabled={feedback === 'correct'}
                              className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {selectedOpt !== undefined && isCorrect && (
                                <span className="text-emerald-600 text-xs font-bold shrink-0 flex items-center gap-1">
                                  <Check size={13} />
                                  <span>Correct</span>
                                </span>
                              )}
                              {selectedOpt !== undefined && isSelected && !isCorrect && (
                                <span className="text-red-600 text-xs font-bold shrink-0 flex items-center gap-1">
                                  <X size={13} />
                                  <span>Try Again</span>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation & Hint */}
                      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <strong className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5">
                          <Sparkles size={13} className="text-amber-500" />
                          <span>Explanation:</span>
                        </strong>
                        <p className="font-sans">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Needs Review Flashcards Section */}
          {(activeTab === 'All' || activeTab === 'Flashcards') && reviewCards.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>Needs-Review Flashcards ({reviewCards.length})</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Review and mark Mastered to remove
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewCards.map((card) => {
                  const isRevealed = !!revealedFlashcards[card.id];

                  return (
                    <div 
                      key={card.id}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-900/40 p-5 shadow-sm flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            {card.domain}
                          </span>
                          <span className="text-slate-400">{card.dimension}</span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {card.question || card.front}
                        </h4>

                        {isRevealed && (
                          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                            <p className="font-medium text-indigo-600 dark:text-indigo-400">
                              {card.answerHinglish || card.back}
                            </p>
                            {card.codeSnippet && (
                              <div className="p-2 rounded bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                                <pre><code>{card.codeSnippet}</code></pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                        <button
                          onClick={() => toggleRevealCard(card.id)}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                        >
                          <RotateCw size={12} />
                          <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
                        </button>

                        <button
                          onClick={() => onUpdateFlashcardStatus(card.id, 'mastered')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                        >
                          <Check size={12} />
                          <span>Mark Mastered</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Flagged DSA Problems Section */}
          {(activeTab === 'All' || activeTab === 'DSA') && flaggedDsa.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Code2 size={16} />
                  <span>Flagged DSA Coding Problems ({flaggedDsa.length})</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Solve or review to clear flag
                </span>
              </div>

              <div className="space-y-4">
                {flaggedDsa.map((prob) => (
                  <div 
                    key={prob.id}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-900/40 p-5 sm:p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 rounded font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                            {prob.category}
                          </span>
                          <span className="text-slate-400">Pattern: {prob.pattern}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white pt-1">
                          {prob.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => onResolveDsaMistake(prob.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        <Check size={13} />
                        <span>Mark Resolved</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {prob.statement}
                    </p>

                    {prob.intuitionHinglish && (
                      <div className="p-3 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                        <strong>Intuition:</strong> {prob.intuitionHinglish}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
