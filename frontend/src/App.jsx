import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LessonReader from './components/LessonReader';
import ImportantTopicsView from './components/ImportantTopicsView';
import DsaPracticeView from './components/DsaPracticeView';
import FlashcardsView from './components/FlashcardsView';
import QuizView from './components/QuizView';
import MistakeBookView from './components/MistakeBookView';
import ResumeDefenseView from './components/ResumeDefenseView';
import DatabasePlaygroundView from './components/DatabasePlaygroundView';
import LastMinuteView from './components/LastMinuteView';
import PdfLibraryView from './components/PdfLibraryView';
import GlobalSearchModal from './components/GlobalSearchModal';

import { LESSONS_METADATA } from './data/lessonsContent';
import { FLASHCARDS } from './data/flashcardsData';
import { DSA_PROBLEMS } from './data/dsaPracticeData';
import { IMPORTANT_TOPICS } from './data/importantTopicsData';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeLessonId, setActiveLessonId] = useState(LESSONS_METADATA[0]?.id || null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Selected Track / Timeline
  const [selectedTrack, setSelectedTrack] = useState(() => {
    return localStorage.getItem('idfc_prep_track') || '14D';
  });

  // Completed Lessons
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('idfc_completed_lessons');
    return saved ? JSON.parse(saved) : [LESSONS_METADATA[0]?.id, LESSONS_METADATA[1]?.id];
  });

  // Completed Important Topics
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('idfc_completed_topics');
    return saved ? JSON.parse(saved) : ['top-node-event-loop', 'top-sql-acid-indexing'];
  });

  // Solved & Flagged DSA
  const [solvedDsaIds, setSolvedDsaIds] = useState(() => {
    const saved = localStorage.getItem('idfc_solved_dsa');
    return saved ? JSON.parse(saved) : ['dsa-kadane', 'dsa-3sum'];
  });
  const [flaggedDsaIds, setFlaggedDsaIds] = useState(() => {
    const saved = localStorage.getItem('idfc_flagged_dsa');
    return saved ? JSON.parse(saved) : ['dsa-lru-cache'];
  });

  // Flashcards Status Dictionary: { [id]: 'learning' | 'mastered' | 'review' }
  const [flashcardsStatus, setFlashcardsStatus] = useState(() => {
    const saved = localStorage.getItem('idfc_flashcards_status');
    if (saved) return JSON.parse(saved);
    // Initial defaults
    const initial = {};
    FLASHCARDS.slice(0, 10).forEach(c => { initial[c.id] = 'mastered'; });
    FLASHCARDS.slice(10, 14).forEach(c => { initial[c.id] = 'review'; });
    return initial;
  });

  // Quiz Score & Mistake Log
  const [quizScore, setQuizScore] = useState(() => {
    const saved = localStorage.getItem('idfc_quiz_score');
    return saved ? JSON.parse(saved) : { correct: 18, total: 24 };
  });
  const [mistakeQuizIds, setMistakeQuizIds] = useState(() => {
    const saved = localStorage.getItem('idfc_mistake_quiz_ids');
    return saved ? JSON.parse(saved) : ['q3', 'q7'];
  });

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('idfc_prep_track', selectedTrack);
  }, [selectedTrack]);

  useEffect(() => {
    localStorage.setItem('idfc_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('idfc_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('idfc_solved_dsa', JSON.stringify(solvedDsaIds));
  }, [solvedDsaIds]);

  useEffect(() => {
    localStorage.setItem('idfc_flagged_dsa', JSON.stringify(flaggedDsaIds));
  }, [flaggedDsaIds]);

  useEffect(() => {
    localStorage.setItem('idfc_flashcards_status', JSON.stringify(flashcardsStatus));
  }, [flashcardsStatus]);

  useEffect(() => {
    localStorage.setItem('idfc_mistake_quiz_ids', JSON.stringify(mistakeQuizIds));
  }, [mistakeQuizIds]);

  // Handlers
  const handleToggleCompletedLesson = (lessonId) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleToggleCompletedTopic = (topicId) => {
    setCompletedTopics(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const handleToggleSolvedDsa = (probId) => {
    setSolvedDsaIds(prev => 
      prev.includes(probId) ? prev.filter(id => id !== probId) : [...prev, probId]
    );
  };

  const handleToggleFlaggedDsa = (probId) => {
    setFlaggedDsaIds(prev => 
      prev.includes(probId) ? prev.filter(id => id !== probId) : [...prev, probId]
    );
  };

  const handleResolveDsaMistake = (probId) => {
    setFlaggedDsaIds(prev => prev.filter(id => id !== probId));
  };

  const handleUpdateFlashcardStatus = (cardId, status) => {
    setFlashcardsStatus(prev => ({
      ...prev,
      [cardId]: status
    }));
  };

  const handleSaveQuizScore = (score) => {
    setQuizScore(score);
    localStorage.setItem('idfc_quiz_score', JSON.stringify(score));
  };

  const handleRecordQuizMistake = (questionId) => {
    setMistakeQuizIds(prev => 
      prev.includes(questionId) ? prev : [...prev, questionId]
    );
  };

  const handleResolveQuizMistake = (questionId) => {
    setMistakeQuizIds(prev => prev.filter(id => id !== questionId));
  };

  const handleSelectLessonFromAnywhere = (lessonId) => {
    if (lessonId) {
      setActiveLessonId(lessonId);
    }
    setActiveTab('curriculum');
  };

  // Global Navigation from Search Modal
  const handleGlobalNavigate = (tab, payload) => {
    if (tab === 'search-open') {
      setIsSearchOpen(true);
      return;
    }
    if (tab === 'curriculum') {
      if (payload) setActiveLessonId(payload);
      setActiveTab('curriculum');
    } else if (tab === 'dsa') {
      setActiveTab('dsa');
    } else if (tab === 'important') {
      setActiveTab('important');
    } else if (tab === 'flashcards') {
      setActiveTab('flashcards');
    } else {
      setActiveTab(tab);
    }
  };

  // Mistake count calculation
  const reviewCardsCount = Object.values(flashcardsStatus).filter(s => s === 'review').length;
  const totalMistakes = mistakeQuizIds.length + reviewCardsCount + flaggedDsaIds.length;
  const masteredFlashcardsCount = Object.values(flashcardsStatus).filter(s => s === 'mastered').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedTrack={selectedTrack} 
        setSelectedTrack={setSelectedTrack}
        mistakeCount={totalMistakes}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleGlobalNavigate}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 min-w-0 overflow-x-hidden">
        {activeTab === 'dashboard' && (
          <Dashboard 
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
            setActiveTab={setActiveTab}
            quizScore={quizScore}
            masteredFlashcardsCount={masteredFlashcardsCount}
            totalFlashcardsCount={FLASHCARDS.length}
            completedLessonsCount={completedLessons.length}
            totalLessonsCount={LESSONS_METADATA.length}
            solvedDsaCount={solvedDsaIds.length}
            totalDsaCount={DSA_PROBLEMS.length}
            completedTopicsCount={completedTopics.length}
            totalTopicsCount={IMPORTANT_TOPICS.length}
            mistakeCount={totalMistakes}
            onSelectLesson={handleSelectLessonFromAnywhere}
          />
        )}

        {activeTab === 'curriculum' && (
          <LessonReader 
            activeLessonId={activeLessonId}
            onSelectLesson={setActiveLessonId}
            completedLessonIds={completedLessons}
            onToggleCompleted={handleToggleCompletedLesson}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'important' && (
          <ImportantTopicsView 
            completedTopicIds={completedTopics}
            onToggleCompleted={handleToggleCompletedTopic}
            onSelectLesson={handleSelectLessonFromAnywhere}
          />
        )}

        {activeTab === 'dsa' && (
          <DsaPracticeView 
            solvedProblemIds={solvedDsaIds}
            onToggleSolved={handleToggleSolvedDsa}
            flaggedProblemIds={flaggedDsaIds}
            onToggleFlagged={handleToggleFlaggedDsa}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView 
            flashcardsStatus={flashcardsStatus}
            onUpdateCardStatus={handleUpdateFlashcardStatus}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView 
            onSaveScore={handleSaveQuizScore}
            onRecordMistake={handleRecordQuizMistake}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakeBookView 
            mistakeQuizIds={mistakeQuizIds}
            onResolveQuizMistake={handleResolveQuizMistake}
            flashcardsStatus={flashcardsStatus}
            onUpdateFlashcardStatus={handleUpdateFlashcardStatus}
            flaggedDsaIds={flaggedDsaIds}
            onResolveDsaMistake={handleResolveDsaMistake}
            onSelectLesson={handleSelectLessonFromAnywhere}
          />
        )}

        {activeTab === 'resume' && <ResumeDefenseView />}

        {activeTab === 'database' && <DatabasePlaygroundView />}

        {activeTab === 'lastminute' && <LastMinuteView />}

        {activeTab === 'pdfs' && <PdfLibraryView />}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 sm:py-8 mt-12 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#9B1B33]">IDFC FIRST Bank</span>
            <span>•</span>
            <span className="font-medium">Developer Interview Preparation Operating System</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Candidate: <strong>Bipin Yadav</strong> (SDE II)</span>
            <span>•</span>
            <span>Bangalore Tech Hub</span>
            <span>•</span>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Ctrl+K Search
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
