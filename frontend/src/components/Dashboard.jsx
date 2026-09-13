import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  Zap, 
  Flame, 
  ShieldCheck, 
  BookOpen, 
  Database, 
  Cpu, 
  FileText,
  Sparkles
} from 'lucide-react';

export default function Dashboard({ 
  selectedTrack, 
  setSelectedTrack, 
  setActiveTab, 
  quizScore, 
  masteredFlashcardsCount, 
  totalFlashcardsCount 
}) {
  const tracksInfo = {
    "7D": { name: "7-Day Sprint", hours: "8 hrs/day (56 hrs total)", intensity: "Extreme Sprint", focus: "High-yield interview questions & direct resume defense" },
    "14D": { name: "14-Day Fast-Track", hours: "5 hrs/day (70 hrs total)", intensity: "Intensive", focus: "Full curriculum coverage + Daily SQL & DSA drills" },
    "1M": { name: "1-Month Comprehensive", hours: "3 hrs/day (90 hrs total)", intensity: "Recommended", focus: "Deep-dive into Concurrency, Sagas, Python Data & System Design" },
    "2M": { name: "2-Month Deep-Dive", hours: "2.5 hrs/day (135 hrs total)", intensity: "Thorough", focus: "End-to-end coding implementations & full mock rounds" },
    "3M": { name: "3-Month Full Mastery", hours: "2 hrs/day (180 hrs total)", intensity: "Mastery", focus: "Complete architecture mastery + Java ecosystem bridge" },
    "6M": { name: "6-Month Career Transformation", hours: "1.5 hrs/day (300 hrs total)", intensity: "Long-term", focus: "Staff-level system design, FinTech leadership & research" },
  };

  const currentTrack = tracksInfo[selectedTrack] || tracksInfo["1M"];

  // Calculate readiness score
  const quizPct = quizScore ? Math.round((quizScore.correct / quizScore.total) * 100) : 65;
  const flashcardPct = Math.round((masteredFlashcardsCount / (totalFlashcardsCount || 1)) * 100);
  const overallReadiness = Math.round((quizPct * 0.6) + (flashcardPct * 0.4));

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Welcome Header */}
        <div style={{
          background: 'linear-gradient(135deg, #9B1B33 0%, #681021 100%)',
          borderRadius: '16px',
          padding: '2.5rem',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(155, 27, 51, 0.25)',
          marginBottom: '2rem'
        }}>
          {/* Subtle Background Glow */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '680px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem', color: '#FCD34D' }}>
                <Sparkles size={14} /> IDFC FIRST BANK INTERVIEW OPERATING SYSTEM
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                Namaste Bipin! Ready to Ace IDFC First Bank?
              </h1>
              <p style={{ fontSize: '1.05rem', color: '#F1F5F9', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Tailored for <strong>Developer — Strategic Projects & New Age Engineering (Bengaluru)</strong>.
                Hinglish explanations, production banking scenarios, live SQL queries, and exact defense of your Invizio Solutions & Booknook experience.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setActiveTab('quiz')}
                  style={{
                    backgroundColor: '#C29B38',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(194, 155, 56, 0.35)'
                  }}
                >
                  <Zap size={18} /> Take Diagnostic Quiz (24 Qs)
                </button>

                <button 
                  onClick={() => setActiveTab('resume')}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px',
                    padding: '0.75rem 1.25rem',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <ShieldCheck size={18} /> Defend Resume Projects
                </button>
              </div>
            </div>

            {/* Readiness Widget */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              minWidth: '260px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FCD34D', fontWeight: 700, marginBottom: '0.5rem' }}>
                Interview Readiness
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                {overallReadiness}%
              </div>
              <div style={{ fontSize: '0.85rem', color: '#E2E8F0', marginTop: '0.5rem' }}>
                {overallReadiness >= 75 ? "Excellent! On Track for Strong Hire" : "Diagnostic In Progress"}
              </div>

              <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-around', fontSize: '0.8rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{quizScore ? `${quizScore.correct}/${quizScore.total}` : 'Unassessed'}</div>
                  <div style={{ color: '#CBD5E1', fontSize: '0.72rem' }}>Quiz Score</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{masteredFlashcardsCount}/{totalFlashcardsCount}</div>
                  <div style={{ color: '#CBD5E1', fontSize: '0.72rem' }}>Flashcards</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          {/* Highlight 1: Python Data Module */}
          <div className="card" onClick={() => setActiveTab('curriculum')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '8px', background: '#ECFDF5', color: '#059669' }}>
                <Database size={22} />
              </div>
              <span className="badge badge-green">New Added</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: '#0F172A' }}>
              Python Data Ecosystem
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem' }}>
              NumPy vectorization, pandas .loc vs .iloc, GroupBy, and Matplotlib OO API with 1,000-row banking analytics pipeline.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#059669', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>Explore Module</span> <ArrowRight size={14} />
            </div>
          </div>

          {/* Highlight 2: SQL & Concurrency */}
          <div className="card" onClick={() => setActiveTab('database')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '8px', background: '#F0F9FF', color: '#0284C7' }}>
                <Cpu size={22} />
              </div>
              <span className="badge badge-blue">Banking Core</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: '#0F172A' }}>
              SQL Concurrency & DBMS
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem' }}>
              Pessimistic Locking (SELECT FOR UPDATE), MVCC, Next-Key Locks, Window functions & live SQLite database.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#0284C7', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>Run SQL Queries</span> <ArrowRight size={14} />
            </div>
          </div>

          {/* Highlight 3: Distributed System Design */}
          <div className="card" onClick={() => setActiveTab('curriculum')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '8px', background: '#FDF2F4', color: '#9B1B33' }}>
                <Zap size={22} />
              </div>
              <span className="badge badge-red">High Priority</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: '#0F172A' }}>
              UPI & Payment Switch
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem' }}>
              50k TPS Payment Switch, Idempotency keys, Sagas, Outbox pattern, and NPCI 4-party interbank settlement.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#9B1B33', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>Read Architecture</span> <ArrowRight size={14} />
            </div>
          </div>

          {/* Highlight 4: Printable Books */}
          <div className="card" onClick={() => setActiveTab('pdfs')} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '8px', background: '#FEF9EE', color: '#B8860B' }}>
                <FileText size={22} />
              </div>
              <span className="badge badge-gold">11 Books Built</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: '#0F172A' }}>
              Offline PDF Library
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem' }}>
              Full printable study books generated with covers, chapter indexes, and formatted code blocks.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#B8860B', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>Download & View</span> <ArrowRight size={14} />
            </div>
          </div>
        </div>

        {/* Track Roadmap Selector & Daily Plan */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Active Track Box */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Clock size={20} color="#9B1B33" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>
                Your Active Preparation Track
              </h2>
            </div>

            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#9B1B33' }}>
                  {currentTrack.name}
                </span>
                <span className="badge badge-red">{currentTrack.intensity}</span>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
                Target Commitment: {currentTrack.hours}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5 }}>
                {currentTrack.focus}
              </p>
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
              Switch Prep Timeline:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {["7D", "14D", "1M", "2M", "3M", "6M"].map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedTrack(key)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: selectedTrack === key ? '#9B1B33' : '#CBD5E1',
                    backgroundColor: selectedTrack === key ? '#FDF2F4' : '#FFFFFF',
                    color: selectedTrack === key ? '#9B1B33' : '#475569',
                    fontWeight: selectedTrack === key ? 700 : 500,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {key} Track
                </button>
              ))}
            </div>
          </div>

          {/* Daily Schedule Recommendations */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Flame size={20} color="#D97706" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>
                Today's High-Yield Checklist
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                    1. Master NumPy homogeneous memory vs Python lists
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Understand C-contiguous SIMD vectorization and broadcasting rules.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                    2. Write SQL Window Functions for running balance
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Practice `SUM(...) OVER (PARTITION BY ... ORDER BY ...)` on IDFC transactions.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                    3. Defend MySQL 40% Query Optimization (STAR Pitch)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Explain EXPLAIN ANALYZE, composite indexing, and keyset cursor pagination.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <CheckCircle2 size={18} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                    4. Draw UPI 2.0 Payment Switch with Idempotency Key
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    4-Party flow: Payer PSP, Remitter Bank, NPCI Switch, Beneficiary Bank.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
