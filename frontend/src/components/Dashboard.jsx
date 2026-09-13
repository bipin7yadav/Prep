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
  Sparkles,
  AlertCircle,
  Code2,
  Star
} from 'lucide-react';
import { TIMELINE_CONFIGS } from '../data/timelineCurriculum';

export default function Dashboard({ 
  selectedTrack = '14D', 
  setSelectedTrack = () => {}, 
  setActiveTab = () => {}, 
  quizScore = null, 
  masteredFlashcardsCount = 0, 
  totalFlashcardsCount = 224,
  completedLessonsCount = 0,
  totalLessonsCount = 45,
  solvedDsaCount = 0,
  totalDsaCount = 21,
  completedTopicsCount = 0,
  totalTopicsCount = 14,
  mistakeCount = 0,
  onSelectLesson = () => {}
}) {
  const currentTrackConfig = TIMELINE_CONFIGS[selectedTrack] || TIMELINE_CONFIGS['14D'];

  // Realistic 5-Factor Weighted Readiness Calculation
  // 1. Curriculum Completion (25%)
  const curriculumRatio = Math.min(1, completedLessonsCount / (totalLessonsCount || 1));
  // 2. Quiz Performance (25%)
  const quizRatio = quizScore ? Math.min(1, quizScore.correct / (quizScore.total || 1)) : 0.60;
  // 3. Spaced Repetition Flashcards (20%)
  const flashcardRatio = Math.min(1, masteredFlashcardsCount / (totalFlashcardsCount || 1));
  // 4. DSA Solved (15%)
  const dsaRatio = Math.min(1, solvedDsaCount / (totalDsaCount || 1));
  // 5. Must-Know Topics & Resume (15%)
  const topicsRatio = Math.min(1, completedTopicsCount / (totalTopicsCount || 1));

  const weightedReadiness = Math.round(
    (curriculumRatio * 25) +
    (quizRatio * 25) +
    (flashcardRatio * 20) +
    (dsaRatio * 15) +
    (topicsRatio * 15)
  );

  return (
    <div className="py-6 space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#9B1B33] via-[#751125] to-[#450a15] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/20">
              <Sparkles size={14} /> IDFC FIRST BANK INTERVIEW OPERATING SYSTEM
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Namaste Bipin! Ready for Strategic Projects at IDFC?
            </h1>
            <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed">
              Tailored for <strong>Developer — New Age Engineering & Strategic Projects (Bengaluru)</strong>.
              Covering full-stack Node.js/React, ACID SQL transactions, high-concurrency event loops, Python analytics, and defense of your <strong>Invizio Solutions</strong> experience.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => setActiveTab('curriculum')}
                className="px-4 py-2.5 bg-white text-[#9B1B33] hover:bg-rose-50 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <BookOpen size={16} /> Open Textbook Curriculum
              </button>
              <button 
                onClick={() => setActiveTab('dsa')}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/30 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <Code2 size={16} /> Practice Python DSA ({totalDsaCount})
              </button>
              <button 
                onClick={() => setActiveTab('lastminute')}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Zap size={16} /> ⚡ 5-Min Pre-Interview Cram
              </button>
            </div>
          </div>

          {/* Master Readiness Score Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 min-w-[260px] text-center shrink-0 space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-amber-300">
              Realistic Readiness Score
            </div>
            <div className="text-5xl font-black tracking-tight text-white">
              {weightedReadiness}%
            </div>
            <p className="text-xs text-rose-200">
              {weightedReadiness >= 80 
                ? "🌟 Interview Ready: Strong Hire Tier" 
                : weightedReadiness >= 50 
                  ? "📈 Solid Progress: Complete DSA & Quizzes" 
                  : "🚀 Foundation Stage: Follow Prescribed Track"}
            </p>

            {/* Factor breakdown mini-bars */}
            <div className="space-y-1.5 pt-3 border-t border-white/15 text-left text-[11px]">
              <div>
                <div className="flex justify-between text-rose-200">
                  <span>Curriculum ({completedLessonsCount}/{totalLessonsCount})</span>
                  <span className="font-bold">{Math.round(curriculumRatio * 100)}%</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-1 mt-0.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${curriculumRatio * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-rose-200">
                  <span>Flashcards Mastered ({masteredFlashcardsCount}/{totalFlashcardsCount})</span>
                  <span className="font-bold">{Math.round(flashcardRatio * 100)}%</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-1 mt-0.5 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${flashcardRatio * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-rose-200">
                  <span>DSA Coding ({solvedDsaCount}/{totalDsaCount})</span>
                  <span className="font-bold">{Math.round(dsaRatio * 100)}%</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-1 mt-0.5 overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full" style={{ width: `${dsaRatio * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Timeline Prescription Box */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#9B1B33]/10 text-[#9B1B33] dark:bg-rose-950 dark:text-rose-300">
                Active Track: {currentTrackConfig.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                {currentTrackConfig.depthMode}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Dynamic Curriculum Prescription
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {currentTrackConfig.tagline}
            </p>
          </div>

          {/* Timeline Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {Object.keys(TIMELINE_CONFIGS).map(trackId => {
              const cfg = TIMELINE_CONFIGS[trackId];
              const isSelected = selectedTrack === trackId;

              return (
                <button
                  key={trackId}
                  onClick={() => setSelectedTrack(trackId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected 
                      ? 'bg-[#9B1B33] text-white shadow' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cfg.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Track Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Commitment</div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{currentTrackConfig.dailyCommitment}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target / Day</div>
            <div className="text-xs sm:text-sm font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">{currentTrackConfig.dailyTargets?.studyHours || 4} hrs/day</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Intensity</div>
            <div className="text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">{currentTrackConfig.intensity}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Depth Focus</div>
            <div className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">{currentTrackConfig.depthMode}</div>
          </div>
        </div>

        {/* Prescribed Schedule Milestones */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Prescribed Study Modules for {currentTrackConfig.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(currentTrackConfig.prescribedPlan || []).map((item, sIdx) => (
              <div 
                key={sIdx}
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 hover:border-indigo-500 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {item.day !== undefined ? `Step ${item.day}` : `Phase ${sIdx + 1}`}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.task}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('curriculum');
                  }}
                  className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-semibold shrink-0"
                  title="Read Lesson"
                >
                  📖
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Important Topics */}
        <div 
          onClick={() => setActiveTab('important')}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-rose-500 cursor-pointer shadow-sm transition-all group space-y-2"
        >
          <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold text-lg">
            <Star size={20} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#9B1B33] transition-colors">
            Important Topics Matrix
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Tier 1 Must-Know concepts, interview frequency, estimated hours, and question breakdowns.
          </p>
          <div className="text-xs text-rose-600 font-semibold pt-1 flex items-center gap-1">
            <span>Explore Matrix</span> <ArrowRight size={12} />
          </div>
        </div>

        {/* DSA Practice */}
        <div 
          onClick={() => setActiveTab('dsa')}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 cursor-pointer shadow-sm transition-all group space-y-2"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold text-lg">
            <Code2 size={20} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
            Python DSA Practice ({totalDsaCount})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Kadane, 3Sum, LRU Cache, Sliding Window, and Python DSA cheat sheet with banking scenarios.
          </p>
          <div className="text-xs text-emerald-600 font-semibold pt-1 flex items-center gap-1">
            <span>Solve Problems</span> <ArrowRight size={12} />
          </div>
        </div>

        {/* Mistake Book */}
        <div 
          onClick={() => setActiveTab('mistakes')}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-red-500 cursor-pointer shadow-sm transition-all group space-y-2"
        >
          <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center font-bold text-lg">
            <AlertCircle size={20} />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
              Mistake Book
            </h3>
            {mistakeCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                {mistakeCount} Active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Automated repository of incorrect quiz answers and flagged flashcards for continuous re-testing.
          </p>
          <div className="text-xs text-red-600 font-semibold pt-1 flex items-center gap-1">
            <span>Review Mistakes</span> <ArrowRight size={12} />
          </div>
        </div>

        {/* Last-Minute Revision */}
        <div 
          onClick={() => setActiveTab('lastminute')}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-amber-500 cursor-pointer shadow-sm transition-all group space-y-2"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold text-lg">
            <Zap size={20} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
            Last-Minute Cram
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            5-min, 15-min, 30-min, 1-hour elevator pitches and pre-interview battlecards.
          </p>
          <div className="text-xs text-amber-600 font-semibold pt-1 flex items-center gap-1">
            <span>Open Battlecard</span> <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
