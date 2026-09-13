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

export default function QuizView({ onSaveScore, onRecordMistake }) {
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

    // If answer is wrong, log to Mistake Book
    if (index !== currentQ.correct && onRecordMistake) {
      onRecordMistake(currentQ.id);
    }

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
    <div className="py-4 sm:py-8">
      <div className="container max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#9B1B33] font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} /> BASELINE DIAGNOSTIC ASSESSMENT
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              IDFC Bank Readiness Evaluation
            </h1>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-xs sm:text-sm text-slate-500 font-semibold">
              Answered: {Object.keys(selectedAnswers).length} / {totalQs}
            </span>
            <button 
              onClick={resetQuiz}
              className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 transition-colors shadow-sm"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-[#9B1B33] transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / totalQs) * 100}%` }}
          />
        </div>

        {/* Completion Summary Card (if finished) */}
        {isCompleted && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center mb-6 shadow-sm animate-in zoom-in-95 duration-200">
            <div className={`inline-flex p-4 rounded-full mb-3 ${percentage >= 75 ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
              <Award size={42} />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Diagnostic Completed: {percentage}% Score!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
              You answered <strong>{correctCount} out of {totalQs}</strong> questions correctly.
              {percentage >= 75 
                ? " Outstanding! You have solid depth across SQL, React, Node, and Python."
                : " Good baseline! Review the Hinglish explanations below and target the Concurrency & Python Data modules."}
            </p>
            <button 
              onClick={() => setIsCompleted(false)}
              className="px-5 py-2.5 bg-[#9B1B33] hover:bg-[#801428] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
            >
              Review Questions Step-by-Step
            </button>
          </div>
        )}

        {/* Active Question Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-sm">
          {/* Top metadata */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="badge badge-red text-xs">{currentQ.category}</span>
            <span className="text-xs font-bold text-slate-400">
              Question {currentIndex + 1} of {totalQs}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug mb-5">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-2.5 mb-6">
            {currentQ.options.map((opt, oIdx) => {
              const hasAnswered = selectedAnswers[currentQ.id] !== undefined;
              const isSelected = selectedAnswers[currentQ.id] === oIdx;
              const isCorrect = currentQ.correct === oIdx;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-semibold';
                } else {
                  btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 border-[#9B1B33] text-[#9B1B33] font-semibold';
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={hasAnswered}
                  className={`w-full flex items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all ${btnStyle} ${
                    hasAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 sm:mt-0 ${
                      isSelected 
                        ? 'bg-[#9B1B33] text-white border-[#9B1B33]' 
                        : 'border-slate-300 text-slate-500 bg-slate-50'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed break-words">{opt}</span>
                  </div>

                  <div className="shrink-0 mt-0.5 sm:mt-0">
                    {hasAnswered && isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                    {hasAnswered && isSelected && !isCorrect && <XCircle size={18} className="text-rose-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible once answered) */}
          {showExplanation[currentQ.id] && (
            <div className="bg-[#FEF9EE] border-l-4 border-[#C29B38] p-3.5 sm:p-5 rounded-r-xl mb-6 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-[#8D6B19] font-bold text-xs uppercase tracking-wider mb-1.5">
                <Sparkles size={14} /> HINGLISH INTERVIEW EXPLANATION & MENTAL MODEL
              </div>
              <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed m-0">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors border ${
                currentIndex === 0 
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50' 
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50 bg-white'
              }`}
            >
              <ArrowLeft size={16} /> Previous
            </button>

            {currentIndex < totalQs - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(totalQs - 1, prev + 1))}
                className="flex items-center gap-1.5 bg-[#9B1B33] hover:bg-[#801428] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-colors"
              >
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => finishQuiz(selectedAnswers)}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                Finish <Award size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
