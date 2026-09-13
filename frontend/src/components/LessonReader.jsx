import React, { useState, useEffect, useMemo } from 'react';
import { LESSONS_CONTENT, LESSONS_BY_ID } from '../data/lessonsContent';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Check, 
  ExternalLink,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function LessonReader({ 
  initialLessonId = '01-python-numpy', 
  completedLessons = [], 
  onToggleComplete,
  onNavigateToTab 
}) {
  const [activeLessonId, setActiveLessonId] = useState(initialLessonId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large

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

  const isCompleted = completedLessons.includes(activeLesson.id);

  // Scroll to top of lesson content on change
  useEffect(() => {
    const el = document.getElementById('lesson-scroll-top');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [activeLessonId]);

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div className="container" id="lesson-scroll-top">
        {/* Top Breadcrumb & Actions Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
            <BookOpen size={16} color="#9B1B33" />
            <span>Curriculum</span>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 600, color: '#0F172A' }}>{activeLesson.domain}</span>
            <ChevronRight size={14} />
            <span style={{ color: '#9B1B33', fontWeight: 700 }}>{activeLesson.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Font Size Adjuster */}
            <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '6px', padding: '2px', border: '1px solid #CBD5E1' }}>
              <button 
                onClick={() => setFontSize('small')} 
                style={{ padding: '2px 8px', fontSize: '0.75rem', fontWeight: fontSize === 'small' ? 700 : 500, backgroundColor: fontSize === 'small' ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('medium')} 
                style={{ padding: '2px 8px', fontSize: '0.85rem', fontWeight: fontSize === 'medium' ? 700 : 500, backgroundColor: fontSize === 'medium' ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')} 
                style={{ padding: '2px 8px', fontSize: '0.95rem', fontWeight: fontSize === 'large' ? 700 : 500, backgroundColor: fontSize === 'large' ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                A+
              </button>
            </div>

            {/* Mark Completed Toggle */}
            <button
              onClick={() => onToggleComplete(activeLesson.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: `1.5px solid ${isCompleted ? '#10B981' : '#CBD5E1'}`,
                backgroundColor: isCompleted ? '#ECFDF5' : '#FFFFFF',
                color: isCompleted ? '#065F46' : '#475569',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <CheckCircle2 size={16} color={isCompleted ? '#10B981' : '#94A3B8'} />
              <span>{isCompleted ? 'Completed' : 'Mark as Read'}</span>
            </button>
          </div>
        </div>

        {/* Master Layout: TOC Sidebar + Lesson Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Sidebar Navigation */}
          <aside style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1.25rem',
            position: 'sticky',
            top: '80px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Textbook Chapters</span>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>{filteredLessons.length} lessons</span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
              <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Search lessons & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem 0.5rem 0.4rem 2rem',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  outline: 'none'
                }}
              />
            </div>

            {/* Domain Dropdown */}
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              style={{
                width: '100%',
                padding: '0.4rem 0.5rem',
                fontSize: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                marginBottom: '1rem',
                backgroundColor: '#F8FAFC',
                color: '#334155',
                fontWeight: 600
              }}
            >
              {domains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Lesson List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {filteredLessons.map(l => {
                const isActive = l.id === activeLesson.id;
                const isDone = completedLessons.includes(l.id);
                return (
                  <div
                    key={l.id}
                    onClick={() => setActiveLessonId(l.id)}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      border: `1px solid ${isActive ? '#9B1B33' : 'transparent'}`,
                      backgroundColor: isActive ? '#FDF2F4' : '#FFFFFF',
                      color: isActive ? '#9B1B33' : '#334155',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: isActive ? 700 : 500, lineHeight: 1.3 }}>
                        {l.title}
                      </div>
                      {isDone && <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem', fontSize: '0.7rem', color: '#64748B' }}>
                      <span>{l.readTime}</span>
                      <span>•</span>
                      <span style={{ color: l.priority.includes('Must') ? '#DC2626' : '#D97706', fontWeight: 600 }}>{l.priority.split(' ')[1] || 'Core'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main Lesson Body */}
          <main style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
          }}>
            {/* Lesson Title Header */}
            <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-red">{activeLesson.domain}</span>
                <span className="badge badge-gold">{activeLesson.priority}</span>
                <span className="badge badge-gray">{activeLesson.difficulty}</span>
              </div>

              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.25, marginBottom: '0.75rem' }}>
                {activeLesson.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748B', fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} /> Read Time: {activeLesson.readTime}
                </span>
                <span>•</span>
                <span>Source: <code style={{ backgroundColor: '#F1F5F9', padding: '2px 5px', borderRadius: '4px' }}>{activeLesson.filePath}</code></span>
              </div>
            </div>

            {/* Hinglish Mental Model Box */}
            <div style={{
              backgroundColor: '#FEF9EE',
              borderLeft: '4px solid #C29B38',
              padding: '1.25rem',
              borderRadius: '0 10px 10px 0',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8D6B19', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <Sparkles size={16} /> HINGLISH INTERVIEW MENTAL MODEL & PITCH
              </div>
              <p style={{ fontSize: '0.95rem', color: '#451A03', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                "{activeLesson.summary}"
              </p>
            </div>

            {/* Rendered Full Markdown HTML */}
            <div 
              className="lesson-content"
              style={{
                fontSize: fontSize === 'small' ? '0.92rem' : fontSize === 'large' ? '1.12rem' : '1rem'
              }}
              dangerouslySetInnerHTML={{ __html: activeLesson.html }} 
            />

            {/* Bottom Chapter Completion & Navigation */}
            <div style={{ borderTop: '2px solid #F1F5F9', paddingTop: '2rem', marginTop: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => onToggleComplete(activeLesson.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isCompleted ? '#10B981' : '#9B1B33',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  <Check size={18} />
                  <span>{isCompleted ? 'Completed! Mark Incomplete' : 'Complete This Lesson'}</span>
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onNavigateToTab('flashcards')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    <Layers size={15} /> Practice Flashcards
                  </button>
                  <button
                    onClick={() => onNavigateToTab('quiz')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    <CheckCircle2 size={15} /> Take Diagnostic
                  </button>
                </div>
              </div>

              {/* Prev / Next Pagination */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {prevLesson ? (
                  <div
                    onClick={() => setActiveLessonId(prevLesson.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      backgroundColor: '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <ArrowLeft size={20} color="#9B1B33" />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Previous Chapter</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>{prevLesson.title}</div>
                    </div>
                  </div>
                ) : <div />}

                {nextLesson && (
                  <div
                    onClick={() => setActiveLessonId(nextLesson.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      backgroundColor: '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '0.75rem',
                      textAlign: 'right'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Next Chapter</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>{nextLesson.title}</div>
                    </div>
                    <ArrowRight size={20} color="#9B1B33" />
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
