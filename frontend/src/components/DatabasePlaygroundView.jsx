import React, { useState } from 'react';
import { BANKING_DB_TABLES, SAMPLE_INTERVIEW_QUERIES } from '../data/bankingDbData';
import { 
  Database, 
  Table, 
  Play, 
  Sparkles, 
  CheckCircle, 
  Cpu, 
  Lock, 
  Layers 
} from 'lucide-react';

export default function DatabasePlaygroundView() {
  const [activeTable, setActiveTable] = useState('transactions');
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  const currentTableData = BANKING_DB_TABLES[activeTable];
  const currentQuery = SAMPLE_INTERVIEW_QUERIES[activeQueryIndex];

  return (
    <div className="py-4 sm:py-8">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#9B1B33] font-bold text-xs uppercase tracking-wider mb-2">
            <Database size={15} /> IDFC FIRST BANK LIVE RELATIONAL DATABASE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Banking Schema Explorer & SQL Interview Queries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Explore the pre-seeded SQLite banking schema (`banking.db`) with accounts, customers, transactions, loans, and cards. Practice high-frequency interview window functions and row-locking concurrency.
          </p>
        </div>

        {/* Top Split: Schema Viewer */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Table size={18} className="text-[#9B1B33]" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Table Data Inspector
              </h2>
            </div>

            {/* Table switcher tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {Object.keys(BANKING_DB_TABLES).map(tbl => {
                const isActive = activeTable === tbl;
                return (
                  <button
                    key={tbl}
                    onClick={() => setActiveTable(tbl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
                      isActive 
                        ? 'bg-[#9B1B33] text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tbl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {currentTableData.columns.map(col => (
                    <th key={col} className="p-2.5 sm:p-3 font-bold text-slate-700 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentTableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 sm:p-3 text-slate-700 whitespace-nowrap">
                        {typeof cell === 'number' && (currentTableData.columns[cIdx].includes('amount') || currentTableData.columns[cIdx].includes('balance'))
                          ? `₹${cell.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                          : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Split: High-Yield Interview SQL Queries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#C29B38]" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              High-Yield Banking SQL Interview Scenarios
            </h2>
          </div>

          {/* Query Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 mb-5 scrollbar-thin">
            {SAMPLE_INTERVIEW_QUERIES.map((q, idx) => {
              const isActive = activeQueryIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQueryIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 border ${
                    isActive 
                      ? 'bg-rose-50 border-[#9B1B33] text-[#9B1B33] font-bold' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {q.title}
                </button>
              );
            })}
          </div>

          {/* Query Code & Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  SQL Implementation
                </span>
                <span className={currentQuery.difficulty === 'Critical' ? 'badge badge-red text-[10px]' : 'badge badge-gold text-[10px]'}>
                  {currentQuery.difficulty}
                </span>
              </div>
              <div className="bg-slate-900 text-sky-300 p-3.5 sm:p-4 rounded-xl text-xs overflow-x-auto border border-slate-700 font-mono">
                <pre className="m-0"><code>{currentQuery.sql}</code></pre>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#FEF9EE] border-l-4 border-[#C29B38] p-3.5 sm:p-4 rounded-r-xl">
                <div className="text-[11px] text-[#8D6B19] font-bold uppercase tracking-wider mb-1">
                  WHY INTERVIEWERS ASK THIS
                </div>
                <p className="text-xs sm:text-sm text-[#451A03] leading-relaxed m-0">
                  {currentQuery.explanation}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div><strong>Database Schema File:</strong> <code className="text-[#9B1B33]">05-SQL-DBMS/schema.sql</code></div>
                <div><strong>Verified DB Engine:</strong> SQLite 3 file: <code className="text-slate-900">banking.db</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
