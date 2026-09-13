import React from 'react';
import { 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Database, 
  FileText, 
  User, 
  Clock 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, selectedTrack, setSelectedTrack }) {
  const tracks = [
    { id: "7D", label: "7-Day Sprint", hours: "56h" },
    { id: "14D", label: "14-Day Fast-Track", hours: "70h" },
    { id: "1M", label: "1-Month Comprehensive", hours: "90h" },
    { id: "2M", label: "2-Month Deep-Dive", hours: "135h" },
    { id: "3M", label: "3-Month Full Mastery", hours: "180h" },
    { id: "6M", label: "6-Month Career Transformation", hours: "300h" },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Compass },
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "quiz", label: "Diagnostic Quiz", icon: CheckCircle2, badge: "24 Qs" },
    { id: "flashcards", label: "Flashcards", icon: Layers },
    { id: "resume", label: "Resume Defense", icon: User },
    { id: "database", label: "Banking DB", icon: Database },
    { id: "pdfs", label: "11 PDF Books", icon: FileText, badge: "Printable" },
  ];

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
    }}>
      {/* Top Banner with Candidate Info & Track Picker */}
      <div style={{
        backgroundColor: '#9B1B33',
        color: '#FFFFFF',
        padding: '0.4rem 1.5rem',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            fontWeight: 700, 
            letterSpacing: '0.05em' 
          }}>
            IDFC FIRST BANK
          </span>
          <span style={{ color: '#FCD34D', fontWeight: 600 }}>
            Strategic Projects & New Age Engineering
          </span>
          <span style={{ color: '#CBD5E1' }}>•</span>
          <span>Target Candidate: <strong>Bipin Yadav (SDE II, 4+ YoE)</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={14} style={{ color: '#FCD34D' }} />
          <span>Prep Track:</span>
          <select 
            value={selectedTrack} 
            onChange={(e) => setSelectedTrack(e.target.value)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {tracks.map(t => (
              <option key={t.id} value={t.id} style={{ color: '#0F172A', backgroundColor: '#FFFFFF' }}>
                {t.label} ({t.hours})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            cursor: 'pointer' 
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: '#9B1B33',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '-0.02em',
            boxShadow: '0 2px 8px rgba(155, 27, 51, 0.3)'
          }}>
            IDFC
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', lineHeight: 1.1 }}>
              Interview OS
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
              Developer Preparation Portal
            </div>
          </div>
        </div>

        {/* Tab Links */}
        <nav style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', padding: '0.25rem 0' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#FDF2F4' : 'transparent',
                  color: isActive ? '#9B1B33' : '#475569',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} color={isActive ? '#9B1B33' : '#64748B'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? '#9B1B33' : '#E2E8F0',
                    color: isActive ? '#FFFFFF' : '#475569',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
