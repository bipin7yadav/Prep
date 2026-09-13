import React, { useState } from 'react';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  FileCode, 
  CheckCircle, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Sparkles 
} from 'lucide-react';

export default function CurriculumView() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModuleId, setExpandedModuleId] = useState('01-PYTHON-DATA');

  const categories = ['All', 'Python & Data', 'Database', 'Backend & Systems', 'System Design', 'FinTech Domain', 'DSA & Core', 'Frontend & JS', 'Security & Compliance'];

  const filteredModules = CURRICULUM_MODULES.filter(mod => {
    const matchesCategory = selectedCategory === 'All' || mod.category === selectedCategory;
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mod.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-4 sm:py-8">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#9B1B33] font-bold text-xs uppercase tracking-wider mb-2">
            <BookOpen size={15} /> 16 TARGETED MODULES • COMPREHENSIVE CURRICULUM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            IDFC First Bank Technical Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Every module includes technical concepts in English, intuitive Hinglish mental models, production banking scenarios, and high-frequency interview questions.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-sm">
          {/* Categories */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  selectedCategory === cat 
                    ? 'bg-[#9B1B33] text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search topics, ACID, UPI, pandas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B33]"
            />
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredModules.map(mod => {
            const isExpanded = expandedModuleId === mod.id;
            return (
              <div 
                key={mod.id}
                className={`bg-white rounded-xl border transition-all overflow-hidden ${
                  isExpanded 
                    ? 'border-[#9B1B33] shadow-md shadow-rose-900/5' 
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Module Bar */}
                <div 
                  onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 mt-0.5 sm:mt-0 ${
                      isExpanded ? 'bg-rose-50 text-[#9B1B33]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {mod.num}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {mod.title}
                        </h3>
                        {mod.badge && (
                          <span className={`text-[10px] ${mod.badge.includes('Special') ? 'badge badge-green' : 'badge badge-red'}`}>
                            {mod.badge}
                          </span>
                        )}
                        <span className="badge badge-gray text-[10px] hidden sm:inline-block">{mod.category}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 sm:line-clamp-1 max-w-2xl leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="hidden sm:flex items-center gap-1 text-slate-500 text-xs font-semibold">
                      <Clock size={13} />
                      <span>{mod.hours}</span>
                    </div>
                    {isExpanded ? <ChevronDown size={18} className="text-[#9B1B33]" /> : <ChevronRight size={18} className="text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-6 space-y-4 animate-in fade-in duration-150">
                    {/* Hinglish Interview Mental Model */}
                    <div className="bg-[#FEF9EE] border-l-4 border-[#C29B38] p-3.5 sm:p-4 rounded-r-xl">
                      <div className="flex items-center gap-1.5 text-[#8D6B19] font-bold text-xs uppercase tracking-wider mb-1">
                        <Sparkles size={14} /> HINGLISH INTERVIEW MENTAL MODEL (HOW TO PITCH)
                      </div>
                      <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed italic m-0">
                        "{mod.hinglishSummary}"
                      </p>
                    </div>

                    {/* Key Core Topics */}
                    <div>
                      <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Core Topics & Architecture Concepts
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mod.topics.map((t, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-white p-2.5 sm:p-3 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800">
                            <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick File Reference */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-200 text-xs text-slate-500">
                      <div className="truncate">
                        Markdown: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-900 text-[11px]">{mod.markdownPath}</code>
                      </div>
                      <div className="shrink-0">
                        Printable Book: <strong className="text-[#9B1B33]">{mod.pdfBook}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
