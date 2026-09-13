import React, { useState } from 'react';
import { RESUME_PROJECTS } from '../data/resumeDefenseData';
import { 
  User, 
  Briefcase, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  Layers,
  ShieldCheck
} from 'lucide-react';

export default function ResumeDefenseView() {
  const [activeProjectId, setActiveProjectId] = useState(RESUME_PROJECTS[0].id);

  const activeProject = RESUME_PROJECTS.find(p => p.id === activeProjectId) || RESUME_PROJECTS[0];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9B1B33', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={16} /> BIPIN YADAV'S PRODUCTION EXPERIENCE DEFENSE
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            Resume Project Deep-Dive & STAR Answers
          </h1>
          <p style={{ color: '#64748B', maxWidth: '750px', lineHeight: 1.6 }}>
            Defend every single bullet point from your Invizio Solutions tenure (SDE II, 4+ YoE) with rock-solid architectural explanations and high-confidence Hinglish pitches.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          {RESUME_PROJECTS.map(proj => {
            const isActive = activeProjectId === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  border: `1.5px solid ${isActive ? '#9B1B33' : '#E2E8F0'}`,
                  backgroundColor: isActive ? '#FDF2F4' : '#FFFFFF',
                  color: isActive ? '#9B1B33' : '#475569',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Briefcase size={16} />
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Card */}
        <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-red">{activeProject.company}</span>
                <span className="badge badge-gold">{activeProject.role}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>
                {activeProject.title}
              </h2>
            </div>

            {/* Tech Stack Pills */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', maxWidth: '400px', justifyContent: 'flex-end' }}>
              {activeProject.techStack.map((tech, idx) => (
                <span key={idx} style={{ backgroundColor: '#F1F5F9', color: '#334155', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics / Impact */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <TrendingUp size={15} color="#10B981" /> Quantified STAR Impact & Achievements
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {activeProject.metrics.map((metric, mIdx) => (
                <div key={mIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: '#ECFDF5', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#065F46', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 60-Second Hinglish Pitch */}
          <div style={{ backgroundColor: '#FEF9EE', borderLeft: '4px solid #C29B38', padding: '1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8D6B19', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <Sparkles size={16} /> 60-SECOND HINGLISH INTERVIEW PITCH
            </div>
            <p style={{ fontSize: '0.95rem', color: '#451A03', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{activeProject.pitchHinglish}"
            </p>
          </div>

          {/* Architecture Diagram */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Cpu size={15} color="#4F46E5" /> Architecture & Data Flow
            </div>
            <div style={{ backgroundColor: '#0F172A', color: '#A5B4FC', padding: '1.25rem', borderRadius: '10px', fontSize: '0.78rem', overflowX: 'auto', border: '1px solid #334155' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace' }}><code>{activeProject.architecture}</code></pre>
            </div>
          </div>

          {/* Tough Interview Follow-ups */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <HelpCircle size={15} color="#9B1B33" /> Hard Interviewer Follow-Up Questions & How To Answer
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeProject.hardQuestions.map((hq, qIdx) => (
                <div key={qIdx} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: '#9B1B33' }}>Q:</span>
                    <span>{hq.q}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, paddingLeft: '1.25rem', borderLeft: '2px solid #CBD5E1' }}>
                    <strong>Ans:</strong> {hq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
