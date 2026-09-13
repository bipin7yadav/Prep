import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Zap 
} from 'lucide-react';
import { LAST_MINUTE_MODES } from '../data/lastMinuteData';

export default function LastMinuteView() {
  const [activeModeId, setActiveModeId] = useState(LAST_MINUTE_MODES[0].id);
  const [copiedId, setCopiedId] = useState(null);
  const [checkedPoints, setCheckedPoints] = useState({});

  const activeMode = LAST_MINUTE_MODES.find(m => m.id === activeModeId) || LAST_MINUTE_MODES[0];

  const totalModeSections = activeMode.sections.length;
  const checkedModeSections = activeMode.sections.filter((_, idx) => !!checkedPoints[`${activeMode.id}-sec-${idx}`]).length;
  const modeProgressPercent = Math.round((checkedModeSections / totalModeSections) * 100);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCheck = (id) => {
    setCheckedPoints(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
              <Zap size={13} />
              <span>High-Compression Memory Bank</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Last-Minute Cram & Emergency Revision
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tailored for tight timelines. Select your available time budget below to review the exact architectural invariants, execution phases, and resume defense soundbites before your IDFC FIRST Bank interview.
            </p>
          </div>

          {/* Quick Print Button */}
          <div className="shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Printer size={15} />
              <span>Print / Save Battlecard PDF</span>
            </button>
          </div>
        </div>

        {/* Time Mode Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {LAST_MINUTE_MODES.map(mode => {
            const isSelected = activeModeId === mode.id;
            const isEmergency = mode.id === 'today';

            return (
              <button
                key={mode.id}
                onClick={() => setActiveModeId(mode.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected 
                    ? isEmergency 
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40 scale-102 ring-2 ring-rose-400 font-bold'
                      : 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-900/40 scale-102 font-bold'
                    : isEmergency
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60 hover:bg-rose-900/60'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <span>{mode.badge}</span>
                <span>{mode.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Mode Overview with Rehearsal Progress */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Active Cram Mode
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Clock size={12} />
              <span>Budget: {activeMode.timeBudget}</span>
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {activeMode.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {activeMode.description}
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <span>Rehearsed:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">{checkedModeSections} / {totalModeSections}</span>
            {checkedModeSections === totalModeSections && (
              <span className="text-emerald-500 font-bold ml-1">✓ Complete</span>
            )}
          </div>
          <div className="w-full sm:w-36 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${modeProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cram Sections */}
      <div className="space-y-4">
        {activeMode.sections.map((section, sIdx) => {
          const sectionKey = `${activeMode.id}-sec-${sIdx}`;
          const isChecked = !!checkedPoints[sectionKey];

          return (
            <div 
              key={sIdx}
              className={`bg-white dark:bg-slate-800 rounded-xl border transition-all duration-200 p-5 sm:p-6 space-y-4 shadow-sm ${
                isChecked 
                  ? 'border-emerald-500/50 bg-emerald-50/20 dark:bg-emerald-950/10' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {/* Title & Checkbox */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleCheck(sectionKey)}
                    className={`mt-1 w-5 h-5 rounded flex items-center justify-center transition-all shrink-0 ${
                      isChecked 
                        ? 'bg-emerald-500 text-white shadow-sm' 
                        : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                    }`}
                    title={isChecked ? "Mark as un-rehearsed" : "Mark as rehearsed"}
                  >
                    {isChecked && <Check size={13} className="stroke-[3]" />}
                  </button>

                  <div className="space-y-1">
                    <h3 className={`text-base font-bold transition-colors ${
                      isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                    }`}>
                      {section.title}
                    </h3>
                    {section.keyPoint && (
                      <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {section.keyPoint}
                      </div>
                    )}
                  </div>
                </div>

                {/* Copy Soundbite Button */}
                <button
                  onClick={() => handleCopy(sectionKey, `${section.title}\n\n${section.soundbite}`)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {copiedId === sectionKey ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Pitch</span>
                    </>
                  )}
                </button>
              </div>

              {/* Soundbite Pitch Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                {section.soundbite}
              </div>

              {/* Code Snippet / SQL / Architecture Diagram */}
              {section.codeSnippet && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Code2 size={13} />
                      <span>Key Invariant / Blueprint</span>
                    </span>
                    <button
                      onClick={() => handleCopy(`code-${sectionKey}`, section.codeSnippet)}
                      className="hover:text-slate-200 transition-colors flex items-center gap-1"
                    >
                      {copiedId === `code-${sectionKey}` ? (
                        <>
                          <Check size={11} className="text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 text-emerald-300 text-xs font-mono p-4 overflow-x-auto">
                    <pre>
                      <code>{section.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
