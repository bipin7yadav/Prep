import React, { useState } from 'react';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  FileCode, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export default function CurriculumView() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModuleId, setExpandedModuleId] = useState('01-PYTHON-DATA');

  const categories = ['All', 'Python & Data', 'Database', 'Backend & Systems', 'System Design', 'FinTech Domain', 'DSA & Core', 'Frontend & JS', 'Security & Compliance'];

  const filteredModules = CURRICULUM_MODULES.filter(mod => {
    const matchesCategory = selectedCategory === 'All' || mod.category === selectedCategory;
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mod.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9B1B33', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <BookOpen size={16} /> 16 TARGETED MODULES • COMPREHENSIVE CURRICULUM
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            IDFC First Bank Technical Curriculum
          </h1>
          <p style={{ color: '#64748B', maxWidth: '750px', lineHeight: 1.6 }}>
            Every module includes technical concepts in English, intuitive Hinglish mental models, production banking scenarios, and high-frequency interview questions.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          backgroundColor: '#FFFFFF',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }}>
          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '2px', maxWidth: '100%' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? '#9B1B33' : '#E2E8F0',
                  backgroundColor: selectedCategory === cat ? '#9B1B33' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                  fontSize: '0.8rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search topics, ACID, UPI, pandas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Modules List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredModules.map(mod => {
            const isExpanded = expandedModuleId === mod.id;
            return (
              <div 
                key={mod.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: isExpanded ? '1px solid #9B1B33' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: isExpanded ? '0 4px 12px rgba(155, 27, 51, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Module Bar */}
                <div 
                  onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: isExpanded ? '#FDF2F4' : '#F1F5F9',
                      color: isExpanded ? '#9B1B33' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.95rem'
                    }}>
                      {mod.num}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
                          {mod.title}
                        </h3>
                        {mod.badge && (
                          <span className={mod.badge.includes('Special') ? 'badge badge-green' : 'badge badge-red'}>
                            {mod.badge}
                          </span>
                        )}
                        <span className="badge badge-gray">{mod.category}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '780px' }}>
                        {mod.desc}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748B', fontSize: '0.8rem', fontWeight: 600 }}>
                      <Clock size={14} />
                      <span>{mod.hours}</span>
                    </div>
                    {isExpanded ? <ChevronDown size={20} color="#9B1B33" /> : <ChevronRight size={20} color="#94A3B8" />}
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div style={{
                    borderTop: '1px solid #F1F5F9',
                    backgroundColor: '#FAFAFA',
                    padding: '1.5rem'
                  }}>
                    {/* Hinglish Interview Mental Model */}
                    <div style={{
                      backgroundColor: '#FEF9EE',
                      borderLeft: '4px solid #C29B38',
                      padding: '1rem 1.25rem',
                      borderRadius: '0 8px 8px 0',
                      marginBottom: '1.25rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8D6B19', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                        <Sparkles size={15} /> HINGLISH INTERVIEW MENTAL MODEL (HOW TO PITCH)
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#451A03', lineHeight: 1.6, fontStyle: 'italic' }}>
                        "{mod.hinglishSummary}"
                      </p>
                    </div>

                    {/* Key Core Topics */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
                        Core Topics & Architecture Concepts
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.5rem' }}>
                        {mod.topics.map((t, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.85rem', color: '#1E293B' }}>
                            <CheckCircle size={15} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick File Reference */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        Markdown: <code style={{ backgroundColor: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', color: '#0F172A' }}>{mod.markdownPath}</code>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        Printable Book: <strong style={{ color: '#9B1B33' }}>{mod.pdfBook}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
