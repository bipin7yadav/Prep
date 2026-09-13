import React, { useState, useEffect, useMemo } from 'react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { 
  RotateCw, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Filter, 
  Layers,
  Sparkles,
  Code2,
  Bookmark,
  Flame,
  AlertTriangle,
  Shuffle
} from 'lucide-react';

export default function FlashcardsView({ 
  flashcardsStatus = {},
  onUpdateCardStatus,
  masteredCards = [], 
  setMasteredCards,
  mistakeCards = [],
  setMistakeCards 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedDimension, setSelectedDimension] = useState('All');
  const [activeBucket, setActiveBucket] = useState('All'); // All, Learning, Mastered, NeedsReview

  // Domains list
  const domains = useMemo(() => {
    const dSet = new Set(FLASHCARDS_DATA.map(c => c.domain));
    return ['All', ...Array.from(dSet)];
  }, []);

  const dimensions = ['All', 'Concept', 'Why', 'How', 'Comparison', 'Code', 'Debugging', 'Production', 'Banking', 'Interview'];

  // Check card status helper
  const checkStatus = (id) => {
    if (flashcardsStatus[id]) return flashcardsStatus[id];
    if (masteredCards.includes(id)) return 'mastered';
    if (mistakeCards.includes(id)) return 'review';
    return 'learning';
  };

  // Filter cards by domain, dimension, and bucket
  const filteredCards = useMemo(() => {
    return FLASHCARDS_DATA.filter(fc => {
      const matchDomain = selectedDomain === 'All' || fc.domain === selectedDomain;
      const matchDim = selectedDimension === 'All' || fc.dimension === selectedDimension;
      
      const st = checkStatus(fc.id);
      let matchBucket = true;

      if (activeBucket === 'Mastered') matchBucket = st === 'mastered';
      else if (activeBucket === 'NeedsReview') matchBucket = st === 'review';
      else if (activeBucket === 'Learning') matchBucket = st === 'learning';

      return matchDomain && matchDim && matchBucket;
    });
  }, [selectedDomain, selectedDimension, activeBucket, flashcardsStatus, masteredCards, mistakeCards]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const totalInFilter = filteredCards.length;
  const cardStatus = currentCard ? checkStatus(currentCard.id) : 'learning';
  const isMastered = cardStatus === 'mastered';
  const isMistake = cardStatus === 'review';

  const handleNext = () => {
    setIsFlipped(false);
    if (totalInFilter > 0) {
      setCurrentIndex(prev => (prev + 1) % totalInFilter);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (totalInFilter > 0) {
      setCurrentIndex(prev => (prev - 1 + totalInFilter) % totalInFilter);
    }
  };

  const handleShuffle = () => {
    if (totalInFilter > 1) {
      setIsFlipped(false);
      setCurrentIndex(Math.floor(Math.random() * totalInFilter));
    }
  };

  const toggleMastered = (e) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;
    if (onUpdateCardStatus) {
      onUpdateCardStatus(currentCard.id, isMastered ? 'learning' : 'mastered');
      if (!isMastered) handleNext();
      return;
    }
    if (setMasteredCards) {
      if (isMastered) {
        setMasteredCards(prev => prev.filter(id => id !== currentCard.id));
      } else {
        setMasteredCards(prev => [...prev, currentCard.id]);
        if (isMistake && setMistakeCards) {
          setMistakeCards(prev => prev.filter(id => id !== currentCard.id));
        }
        handleNext();
      }
    }
  };

  const toggleMistake = (e) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;
    if (onUpdateCardStatus) {
      onUpdateCardStatus(currentCard.id, isMistake ? 'learning' : 'review');
      if (!isMistake) handleNext();
      return;
    }
    if (setMistakeCards) {
      if (isMistake) {
        setMistakeCards(prev => prev.filter(id => id !== currentCard.id));
      } else {
        setMistakeCards(prev => [...prev, currentCard.id]);
        if (isMastered && setMasteredCards) {
          setMasteredCards(prev => prev.filter(id => id !== currentCard.id));
        }
        handleNext();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalInFilter]);

  return (
    <div className="py-4 sm:py-8">
      <div className="container max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#9B1B33] font-bold text-xs uppercase tracking-wider mb-2">
            <Layers size={15} /> ACTIVE RECALL SYSTEM • {FLASHCARDS_DATA.length} MASTER FLASHCARDS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            IDFC First Bank Flashcards Trainer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Multi-dimensional active recall across Concept, Why, How, Code, Debugging, Production & Banking.
          </p>
        </div>

        {/* Spaced Repetition Buckets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {[
            { id: 'All', label: 'All Cards', count: FLASHCARDS_DATA.length, color: 'text-slate-900', border: 'border-slate-300' },
            { id: 'Learning', label: 'Learning', count: FLASHCARDS_DATA.length - masteredCards.length - mistakeCards.length, color: 'text-sky-600', border: 'border-sky-500' },
            { id: 'NeedsReview', label: 'Needs Review', count: mistakeCards.length, color: 'text-rose-600', border: 'border-rose-500' },
            { id: 'Mastered', label: 'Mastered', count: masteredCards.length, color: 'text-emerald-600', border: 'border-emerald-500' },
          ].map(b => (
            <button
              key={b.id}
              onClick={() => {
                setActiveBucket(b.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`p-3 rounded-xl text-center cursor-pointer transition-all border-2 ${
                activeBucket === b.id 
                  ? `bg-white shadow-sm ${b.border}` 
                  : 'bg-slate-50 border-slate-200 hover:bg-white'
              }`}
            >
              <div className={`text-xl sm:text-2xl font-extrabold ${b.color}`}>{b.count}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">{b.label}</div>
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 space-y-3 shadow-sm">
          {/* Domains Scroll */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => {
                  setSelectedDomain(d);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  selectedDomain === d 
                    ? 'bg-[#9B1B33] text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Dimension Pills & Shuffle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {dimensions.map(dim => (
                <button
                  key={dim}
                  onClick={() => {
                    setSelectedDimension(dim);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                    selectedDimension === dim 
                      ? 'bg-[#FEF9EE] text-[#8D6B19] border border-[#C29B38] font-bold' 
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {dim}
                </button>
              ))}
            </div>

            <button
              onClick={handleShuffle}
              className="self-end sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold shrink-0 transition-colors"
            >
              <Shuffle size={13} /> Shuffle Cards
            </button>
          </div>
        </div>

        {/* Counter & Status */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
          <span className="font-bold">
            Card {totalInFilter > 0 ? currentIndex + 1 : 0} of {totalInFilter}
          </span>
          <span className="text-slate-400">
            <span className="inline sm:hidden">👆 Tap card to flip</span>
            <span className="hidden sm:inline">
              Tip: <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border text-[10px]">Space</kbd> to flip, <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border text-[10px]">←</kbd> <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border text-[10px]">→</kbd> to navigate
            </span>
          </span>
        </div>

        {/* 3D Flashcard */}
        {currentCard ? (
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[300px] sm:min-h-[340px] bg-white rounded-2xl p-5 sm:p-7 md:p-8 cursor-pointer shadow-md flex flex-col justify-between relative transition-all border-2 mb-6 ${
              isFlipped ? 'border-[#C29B38] shadow-amber-500/5' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Top Bar on Card */}
            <div className="flex items-start sm:items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="badge badge-red text-[11px]">{currentCard.domain.split(' ')[0]}</span>
                <span className="badge badge-gold text-[11px]">{currentCard.dimension}</span>
                <span className="badge badge-gray text-[11px]">{currentCard.tag}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs shrink-0">
                <RotateCw size={13} />
                <span className="hidden sm:inline">Click to flip</span>
              </div>
            </div>

            {/* Content Front vs Back */}
            <div className="my-5 sm:my-6">
              {!isFlipped ? (
                <div>
                  <div className="text-[11px] text-[#9B1B33] font-bold uppercase tracking-wider mb-2">
                    INTERVIEW PROMPT / QUESTION
                  </div>
                  <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">
                    {currentCard.question}
                  </h2>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8D6B19] font-bold uppercase tracking-wider mb-2">
                    <Sparkles size={14} /> HINGLISH INTERVIEW EXPLANATION & MENTAL MODEL
                  </div>
                  <p className="text-xs sm:text-base text-slate-800 leading-relaxed mb-3">
                    {currentCard.answerHinglish}
                  </p>

                  {currentCard.codeSnippet && (
                    <div className="bg-slate-900 text-sky-300 p-3 sm:p-4 rounded-xl text-xs overflow-x-auto border border-slate-700 font-mono">
                      <pre className="m-0"><code>{currentCard.codeSnippet}</code></pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
              <span>Side: <strong className="text-slate-700">{isFlipped ? 'Answer & Mental Model' : 'Question'}</strong></span>
              <div className="flex items-center gap-2 font-bold">
                {isMastered && (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={14} /> Mastered
                  </span>
                )}
                {isMistake && (
                  <span className="text-rose-600 flex items-center gap-1">
                    <AlertTriangle size={14} /> Needs Review
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 mb-6 shadow-sm">
            <p className="text-sm text-slate-500">No flashcards found matching the selected filters.</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2.5 sm:gap-4">
          <button
            onClick={handlePrev}
            className="order-1 flex items-center justify-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
          >
            <ArrowLeft size={16} /> Previous
          </button>

          <div className="col-span-2 order-3 sm:order-2 flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={toggleMistake}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-sm ${
                isMistake 
                  ? 'bg-rose-50 text-rose-800 border-rose-300' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700'
              }`}
            >
              <AlertTriangle size={15} className={isMistake ? 'text-rose-600' : 'text-slate-400'} />
              <span>{isMistake ? 'In Mistakes' : 'Needs Review'}</span>
            </button>

            <button
              onClick={toggleMastered}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-sm ${
                isMastered 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700'
              }`}
            >
              <CheckCircle size={15} className={isMastered ? 'text-emerald-600' : 'text-slate-400'} />
              <span>{isMastered ? 'Mastered!' : 'Mark Mastered'}</span>
            </button>
          </div>

          <button
            onClick={handleNext}
            className="order-2 sm:order-3 flex items-center justify-center gap-1.5 bg-[#9B1B33] hover:bg-[#801428] text-white px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-md"
          >
            Next <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
