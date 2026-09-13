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
    <div className="py-4 sm:py-8">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#9B1B33] font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck size={15} /> BIPIN YADAV'S PRODUCTION EXPERIENCE DEFENSE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Resume Project Deep-Dive & STAR Answers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Defend every single bullet point from your Invizio Solutions tenure (SDE II, 4+ YoE) with rock-solid architectural explanations and high-confidence Hinglish pitches.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
          {RESUME_PROJECTS.map(proj => {
            const isActive = activeProjectId === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isActive 
                    ? 'bg-rose-50 border-[#9B1B33] text-[#9B1B33] font-bold shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Briefcase size={15} />
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-sm mb-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="badge badge-red text-xs">{activeProject.company}</span>
                <span className="badge badge-gold text-xs">{activeProject.role}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {activeProject.title}
              </h2>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 sm:justify-end max-w-md">
              {activeProject.techStack.map((tech, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics / Impact */}
          <div className="mb-6">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp size={14} className="text-emerald-600" /> Quantified STAR Impact & Achievements
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeProject.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="flex items-start gap-2 bg-emerald-50/70 border border-emerald-200 p-3 sm:p-3.5 rounded-xl text-xs sm:text-sm text-emerald-900 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 60-Second Hinglish Pitch */}
          <div className="bg-[#FEF9EE] border-l-4 border-[#C29B38] p-4 sm:p-5 rounded-r-xl mb-6 shadow-sm">
            <div className="flex items-center gap-1.5 text-[#8D6B19] font-bold text-xs uppercase tracking-wider mb-1.5">
              <Sparkles size={14} /> 60-SECOND HINGLISH INTERVIEW PITCH
            </div>
            <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed italic m-0">
              "{activeProject.pitchHinglish}"
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="mb-6">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu size={14} className="text-indigo-600" /> Architecture & Data Flow
            </div>
            <div className="bg-slate-900 text-indigo-300 p-3.5 sm:p-4 rounded-xl text-xs overflow-x-auto border border-slate-700 font-mono">
              <pre className="m-0"><code>{activeProject.architecture}</code></pre>
            </div>
          </div>

          {/* Tough Interview Follow-ups */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <HelpCircle size={14} className="text-[#9B1B33]" /> Hard Interviewer Follow-Up Questions & How To Answer
            </div>
            <div className="space-y-3">
              {activeProject.hardQuestions.map((hq, qIdx) => (
                <div key={qIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                    <span className="text-[#9B1B33] font-black">Q:</span>
                    <span>{hq.q}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-4 border-l-2 border-slate-300">
                    <strong className="text-slate-900">Ans:</strong> {hq.answer}
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
