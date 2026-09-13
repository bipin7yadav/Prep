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

  const toggleMastered = () => {
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

  const toggleMistake = () => {
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
    <div style={{ padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9B1B33', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
            <Layers size={16} /> ACTIVE RECALL SYSTEM • 224 MASTER FLASHCARDS
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            IDFC First Bank Flashcards Trainer
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Multi-dimensional active recall (Concept, Why, How, Code, Debugging, Production, Banking).
          </p>
        </div>

        {/* Spaced Repetition Buckets */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          {[
            { id: 'All', label: 'All Cards', count: FLASHCARDS_DATA.length, color: '#0F172A' },
            { id: 'Learning', label: 'Learning', count: FLASHCARDS_DATA.length - masteredCards.length - mistakeCards.length, color: '#0284C7' },
            { id: 'NeedsReview', label: 'Needs Review', count: mistakeCards.length, color: '#DC2626' },
            { id: 'Mastered', label: 'Mastered', count: masteredCards.length, color: '#10B981' },
          ].map(b => (
            <button
              key={b.id}
              onClick={() => {
                setActiveBucket(b.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              style={{
                backgroundColor: activeBucket === b.id ? '#FFFFFF' : '#F8FAFC',
                border: `2px solid ${activeBucket === b.id ? b.color : '#E2E8F0'}`,
                borderRadius: '10px',
                padding: '0.75rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: b.color }}>{b.count}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>{b.label}</div>
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {/* Domains Scroll */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px' }}>
            {domains.map(d => (
              <button
                key={d}
                onClick={() => {
                  setSelectedDomain(d);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  border: `1px solid ${selectedDomain === d ? '#9B1B33' : '#E2E8F0'}`,
                  backgroundColor: selectedDomain === d ? '#9B1B33' : '#FFFFFF',
                  color: selectedDomain === d ? '#FFFFFF' : '#475569',
                  fontSize: '0.75rem',
                  fontWeight: selectedDomain === d ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Dimension Pills & Shuffle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
              {dimensions.map(dim => (
                <button
                  key={dim}
                  onClick={() => {
                    setSelectedDimension(dim);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    border: `1px solid ${selectedDimension === dim ? '#C29B38' : '#CBD5E1'}`,
                    backgroundColor: selectedDimension === dim ? '#FEF9EE' : '#FFFFFF',
                    color: selectedDimension === dim ? '#8D6B19' : '#64748B',
                    fontSize: '0.72rem',
                    fontWeight: selectedDimension === dim ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {dim}
                </button>
              ))}
            </div>

            <button
              onClick={handleShuffle}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                backgroundColor: '#F1F5F9',
                border: '1px solid #CBD5E1',
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <Shuffle size={13} /> Shuffle
            </button>
          </div>
        </div>

        {/* Counter & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B' }}>
            Card {totalInFilter > 0 ? currentIndex + 1 : 0} of {totalInFilter}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
            Tip: Press <kbd style={{ backgroundColor: '#F1F5F9', padding: '1px 5px', borderRadius: '4px', border: '1px solid #CBD5E1' }}>Space</kbd> to flip, <kbd style={{ backgroundColor: '#F1F5F9', padding: '1px 5px', borderRadius: '4px', border: '1px solid #CBD5E1' }}>←</kbd> <kbd style={{ backgroundColor: '#F1F5F9', padding: '1px 5px', borderRadius: '4px', border: '1px solid #CBD5E1' }}>→</kbd> to navigate
          </span>
        </div>

        {/* 3D Flashcard */}
        {currentCard ? (
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              minHeight: '340px',
              backgroundColor: '#FFFFFF',
              border: isFlipped ? '2px solid #C29B38' : '2px solid #E2E8F0',
              borderRadius: '16px',
              padding: '2.5rem',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              transition: 'all 0.2s ease',
              marginBottom: '1.5rem'
            }}
          >
            {/* Top Bar on Card */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-red">{currentCard.domain.split(' ')[0]}</span>
                <span className="badge badge-gold">{currentCard.dimension}</span>
                <span className="badge badge-gray">{currentCard.tag}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94A3B8', fontSize: '0.78rem' }}>
                <RotateCw size={14} /> Click or Space to flip
              </div>
            </div>

            {/* Content Front vs Back */}
            <div style={{ margin: '1.75rem 0' }}>
              {!isFlipped ? (
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#9B1B33', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                    INTERVIEW PROMPT / QUESTION
                  </div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.4 }}>
                    {currentCard.question}
                  </h2>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#8D6B19', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    <Sparkles size={14} /> HINGLISH INTERVIEW EXPLANATION & MENTAL MODEL
                  </div>
                  <p style={{ fontSize: '1.02rem', color: '#1E293B', lineHeight: 1.65, marginBottom: '1rem' }}>
                    {currentCard.answerHinglish}
                  </p>

                  {currentCard.codeSnippet && (
                    <div style={{ backgroundColor: '#0F172A', color: '#38BDF8', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.82rem', overflowX: 'auto', border: '1px solid #334155' }}>
                      <pre style={{ margin: 0, fontFamily: 'monospace' }}><code>{currentCard.codeSnippet}</code></pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#94A3B8' }}>
              <span>Side: <strong>{isFlipped ? 'Answer & Mental Model' : 'Question'}</strong></span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {isMastered && (
                  <span style={{ color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <CheckCircle size={14} /> Mastered
                  </span>
                )}
                {isMistake && (
                  <span style={{ color: '#DC2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <AlertTriangle size={14} /> In Mistake Book
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ color: '#64748B', fontSize: '1rem' }}>No flashcards found matching the selected filters.</p>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handlePrev}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={toggleMistake}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: isMistake ? '#FEF2F2' : '#FFFFFF',
                border: `1.5px solid ${isMistake ? '#DC2626' : '#CBD5E1'}`,
                color: isMistake ? '#991B1B' : '#475569',
                padding: '0.65rem 1.1rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <AlertTriangle size={15} color={isMistake ? '#DC2626' : '#64748B'} />
              <span>{isMistake ? 'In Mistakes' : 'Needs Review'}</span>
            </button>

            <button
              onClick={toggleMastered}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: isMastered ? '#ECFDF5' : '#FFFFFF',
                border: `1.5px solid ${isMastered ? '#10B981' : '#CBD5E1'}`,
                color: isMastered ? '#059669' : '#475569',
                padding: '0.65rem 1.1rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <CheckCircle size={15} color={isMastered ? '#10B981' : '#64748B'} />
              <span>{isMastered ? 'Mastered!' : 'Mark Mastered'}</span>
            </button>
          </div>

          <button
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#9B1B33',
              border: 'none',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            Next <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
