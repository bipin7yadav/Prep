import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CurriculumView from './components/CurriculumView';
import QuizView from './components/QuizView';
import FlashcardsView from './components/FlashcardsView';
import ResumeDefenseView from './components/ResumeDefenseView';
import DatabasePlaygroundView from './components/DatabasePlaygroundView';
import PdfLibraryView from './components/PdfLibraryView';
import { FLASHCARDS_DATA } from './data/flashcardsData';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTrack, setSelectedTrack] = useState(() => {
    return localStorage.getItem('idfc_prep_track') || '1M';
  });

  const [quizScore, setQuizScore] = useState(() => {
    const saved = localStorage.getItem('idfc_quiz_score');
    return saved ? JSON.parse(saved) : null;
  });

  const [masteredCards, setMasteredCards] = useState(() => {
    const saved = localStorage.getItem('idfc_mastered_cards');
    return saved ? JSON.parse(saved) : ["fc1", "fc4", "fc10"];
  });

  useEffect(() => {
    localStorage.setItem('idfc_prep_track', selectedTrack);
  }, [selectedTrack]);

  useEffect(() => {
    localStorage.setItem('idfc_mastered_cards', JSON.stringify(masteredCards));
  }, [masteredCards]);

  const handleSaveScore = (score) => {
    setQuizScore(score);
    localStorage.setItem('idfc_quiz_score', JSON.stringify(score));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedTrack={selectedTrack} 
        setSelectedTrack={setSelectedTrack} 
      />

      {/* Main View Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <Dashboard 
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
            setActiveTab={setActiveTab}
            quizScore={quizScore}
            masteredFlashcardsCount={masteredCards.length}
            totalFlashcardsCount={FLASHCARDS_DATA.length}
          />
        )}

        {activeTab === 'curriculum' && <CurriculumView />}

        {activeTab === 'quiz' && (
          <QuizView onSaveScore={handleSaveScore} />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView 
            masteredCards={masteredCards} 
            setMasteredCards={setMasteredCards} 
          />
        )}

        {activeTab === 'resume' && <ResumeDefenseView />}

        {activeTab === 'database' && <DatabasePlaygroundView />}

        {activeTab === 'pdfs' && <PdfLibraryView />}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        padding: '2rem 0',
        marginTop: '3rem',
        fontSize: '0.85rem',
        color: '#64748B'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 800, color: '#9B1B33' }}>IDFC FIRST Bank</span>
            <span>•</span>
            <span>Developer Interview Preparation Operating System</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748B' }}>
            <span>Engineered for <strong>Bipin Yadav (SDE II)</strong></span>
            <span>•</span>
            <span style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={14} /> Production Ready
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
