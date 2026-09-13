import React, { useState } from 'react';
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
  Code2
} from 'lucide-react';

export default function FlashcardsView({ masteredCards, setMasteredCards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'SQL & DBMS', 'System Design', 'Banking & FinTech', 'Python & Data', 'Node.js & JS', 'React.js', 'Security', 'Low-Level Design'];

  const filteredCards = FLASHCARDS_DATA.filter(fc => 
    selectedCategory === 'All' || fc.category === selectedCategory
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const totalInFilter = filteredCards.length;
  const isMastered = masteredCards.includes(currentCard?.id);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % totalInFilter);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + totalInFilter) % totalInFilter);
  };

  const toggleMastered = () => {
    if (!currentCard) return;
    if (isMastered) {
      setMasteredCards(prev => prev.filter(id => id !== currentCard.id));
    } else {
      setMasteredCards(prev => [...prev, currentCard.id]);
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9B1B33', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
            <Layers size={16} /> ACTIVE RECALL SYSTEM
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            IDFC High-Yield Interview Flashcards
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Flip through essential concepts. Test your active memory before the interview!
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#9B1B33' : '#E2E8F0',
                backgroundColor: selectedCategory === cat ? '#9B1B33' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                fontSize: '0.78rem',
                fontWeight: selectedCategory === cat ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card Counter & Mastered Progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B' }}>
            Card {currentIndex + 1} of {totalInFilter}
          </span>
          <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>
            Mastered: {masteredCards.length} / {FLASHCARDS_DATA.length}
          </span>
        </div>

        {/* 3D Flashcard Container */}
        {currentCard && (
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              minHeight: '340px',
              backgroundColor: '#FFFFFF',
              border: isFlipped ? '2px solid #C29B38' : '2px solid #E2E8F0',
              borderRadius: '16px',
              padding: '2.5rem',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              transition: 'all 0.25s ease',
              marginBottom: '1.5rem'
            }}
          >
            {/* Top Bar on Card */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-red">{currentCard.category}</span>
                <span className="badge badge-gray">{currentCard.tag}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94A3B8', fontSize: '0.78rem' }}>
                <RotateCw size={14} /> Click to flip
              </div>
            </div>

            {/* Main Content (Front vs Back) */}
            <div style={{ margin: '1.5rem 0' }}>
              {!isFlipped ? (
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#9B1B33', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                    QUESTION / PROMPT
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.4 }}>
                    {currentCard.question}
                  </h2>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#8D6B19', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    <Sparkles size={14} /> HINGLISH INTERVIEW DEFENSE
                  </div>
                  <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {currentCard.answerHinglish}
                  </p>

                  {currentCard.codeSnippet && (
                    <div style={{ backgroundColor: '#0F172A', color: '#E2E8F0', padding: '0.85rem', borderRadius: '8px', fontSize: '0.78rem', overflowX: 'auto' }}>
                      <pre style={{ margin: 0 }}><code>{currentCard.codeSnippet}</code></pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#94A3B8' }}>
              <span>Side: {isFlipped ? 'Answer' : 'Question'}</span>
              {isMastered && (
                <span style={{ color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle size={14} /> Mastered
                </span>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
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

          <button
            onClick={toggleMastered}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: isMastered ? '#ECFDF5' : '#FFFFFF',
              border: `1.5px solid ${isMastered ? '#10B981' : '#CBD5E1'}`,
              color: isMastered ? '#059669' : '#475569',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <CheckCircle size={16} />
            {isMastered ? 'Mastered!' : 'Mark as Mastered'}
          </button>

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
