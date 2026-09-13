import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../data/quizData';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizView({ onSaveScore }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];
  const totalQs = DIAGNOSTIC_QUESTIONS.length;

  const handleSelectOption = (index) => {
    if (selectedAnswers[currentQ.id] !== undefined) return; // already answered

    const newAnswers = { ...selectedAnswers, [currentQ.id]: index };
    const newShow = { ...showExplanation, [currentQ.id]: true };
    setSelectedAnswers(newAnswers);
    setShowExplanation(newShow);

    // If this was the last question, check if all answered
    if (Object.keys(newAnswers).length === totalQs) {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (finalAnswers) => {
    setIsCompleted(true);
    let correctCount = 0;
    DIAGNOSTIC_QUESTIONS.forEach(q => {
      if (finalAnswers[q.id] === q.correct) correctCount++;
    });

    if (onSaveScore) {
      onSaveScore({ correct: correctCount, total: totalQs });
    }

    if (correctCount / totalQs >= 0.75) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Calculate stats
  let correctCount = 0;
  Object.keys(selectedAnswers).forEach(qId => {
    const q = DIAGNOSTIC_QUESTIONS.find(item => item.id === qId);
    if (q && selectedAnswers[qId] === q.correct) correctCount++;
  });

  const percentage = Math.round((correctCount / totalQs) * 100);

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9B1B33', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <Sparkles size={16} /> BASELINE DIAGNOSTIC ASSESSMENT
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>
              IDFC Bank Readiness Evaluation
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>
              Answered: {Object.keys(selectedAnswers).length} / {totalQs}
            </span>
            <button 
              onClick={resetQuiz}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '2rem' }}>
          <div style={{
            width: `${((currentIndex + 1) / totalQs) * 100}%`,
            height: '100%',
            backgroundColor: '#9B1B33',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Completion Summary Card (if finished) */}
        {isCompleted && (
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: percentage >= 75 ? '#ECFDF5' : '#FEF9EE', color: percentage >= 75 ? '#10B981' : '#D97706', marginBottom: '1rem' }}>
              <Award size={48} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Diagnostic Completed: {percentage}% Score!
            </h2>
            <p style={{ color: '#64748B', maxWidth: '520px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
              You answered <strong>{correctCount} out of {totalQs}</strong> questions correctly.
              {percentage >= 75 
                ? " Outstanding! You have solid depth across SQL, React, Node, and Python."
                : " Good baseline! Review the Hinglish explanations below and target the Concurrency & Python Data modules."}
            </p>
            <button 
              onClick={() => setIsCompleted(false)}
              className="btn btn-primary"
            >
              Review Questions Step-by-Step
            </button>
          </div>
        )}

        {/* Active Question Card */}
        <div className="card" style={{ padding: '2rem', position: 'relative' }}>
          {/* Top metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span className="badge badge-red">{currentQ.category}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B' }}>
              Question {currentIndex + 1} of {totalQs}
            </span>
          </div>

          {/* Question Text */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.4, marginBottom: '1.5rem' }}>
            {currentQ.question}
          </h2>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {currentQ.options.map((opt, oIdx) => {
              const hasAnswered = selectedAnswers[currentQ.id] !== undefined;
              const isSelected = selectedAnswers[currentQ.id] === oIdx;
              const isCorrect = currentQ.correct === oIdx;

              let btnBg = '#FFFFFF';
              let borderColor = '#E2E8F0';
              let textColor = '#1E293B';

              if (hasAnswered) {
                if (isCorrect) {
                  btnBg = '#ECFDF5';
                  borderColor = '#10B981';
                  textColor = '#065F46';
                } else if (isSelected) {
                  btnBg = '#FEF2F2';
                  borderColor = '#EF4444';
                  textColor = '#991B1B';
                }
              } else if (isSelected) {
                btnBg = '#FDF2F4';
                borderColor = '#9B1B33';
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={hasAnswered}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${borderColor}`,
                    backgroundColor: btnBg,
                    color: textColor,
                    fontSize: '0.92rem',
                    fontWeight: isSelected ? 600 : 500,
                    cursor: hasAnswered ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `1px solid ${borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: isSelected ? '#9B1B33' : 'transparent',
                      color: isSelected ? '#FFFFFF' : '#64748B'
                    }}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnswered && isCorrect && <CheckCircle2 size={20} color="#10B981" />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle size={20} color="#EF4444" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible once answered) */}
          {showExplanation[currentQ.id] && (
            <div style={{
              backgroundColor: '#FEF9EE',
              borderLeft: '4px solid #C29B38',
              padding: '1.25rem',
              borderRadius: '0 8px 8px 0',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8D6B19', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <Sparkles size={16} /> HINGLISH INTERVIEW EXPLANATION & MENTAL MODEL
              </div>
              <p style={{ fontSize: '0.9rem', color: '#451A03', lineHeight: 1.6 }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'transparent',
                border: '1px solid #CBD5E1',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: currentIndex === 0 ? '#94A3B8' : '#334155',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ArrowLeft size={16} /> Previous
            </button>

            {currentIndex < totalQs - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(totalQs - 1, prev + 1))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#9B1B33',
                  border: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                Next Question <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => finishQuiz(selectedAnswers)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#10B981',
                  border: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                Complete Assessment <Award size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
