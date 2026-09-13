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
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9B1B33', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <Database size={16} /> IDFC FIRST BANK LIVE RELATIONAL DATABASE
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            Banking Schema Explorer & SQL Interview Queries
          </h1>
          <p style={{ color: '#64748B', maxWidth: '750px', lineHeight: 1.6 }}>
            Explore the pre-seeded SQLite banking schema (`banking.db`) with accounts, customers, transactions, loans, and cards. Practice high-frequency interview window functions and row-locking concurrency.
          </p>
        </div>

        {/* Top Split: Schema Viewer */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Table size={18} color="#9B1B33" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>
                Table Data Inspector
              </h2>
            </div>

            {/* Table switcher tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {Object.keys(BANKING_DB_TABLES).map(tbl => {
                const isActive = activeTable === tbl;
                return (
                  <button
                    key={tbl}
                    onClick={() => setActiveTable(tbl)}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '6px',
                      border: `1px solid ${isActive ? '#9B1B33' : '#CBD5E1'}`,
                      backgroundColor: isActive ? '#9B1B33' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#475569',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tbl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table Container */}
          <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {currentTableData.columns.map(col => (
                    <th key={col} style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#334155', whiteSpace: 'nowrap' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: rIdx % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '0.65rem 1rem', color: '#1E293B', whiteSpace: 'nowrap' }}>
                        {typeof cell === 'number' && currentTableData.columns[cIdx].includes('amount') || currentTableData.columns[cIdx].includes('balance')
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
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sparkles size={20} color="#C29B38" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A' }}>
              High-Yield Banking SQL Interview Scenarios
            </h2>
          </div>

          {/* Query Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
            {SAMPLE_INTERVIEW_QUERIES.map((q, idx) => {
              const isActive = activeQueryIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQueryIndex(idx)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${isActive ? '#9B1B33' : '#E2E8F0'}`,
                    backgroundColor: isActive ? '#FDF2F4' : '#FFFFFF',
                    color: isActive ? '#9B1B33' : '#475569',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {q.title}
                </button>
              );
            })}
          </div>

          {/* Query Code & Explanation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  SQL Implementation
                </span>
                <span className={currentQuery.difficulty === 'Critical' ? 'badge badge-red' : 'badge badge-gold'}>
                  {currentQuery.difficulty}
                </span>
              </div>
              <div style={{ backgroundColor: '#0F172A', color: '#38BDF8', padding: '1.25rem', borderRadius: '10px', fontSize: '0.8rem', overflowX: 'auto', border: '1px solid #334155' }}>
                <pre style={{ margin: 0, fontFamily: 'monospace' }}><code>{currentQuery.sql}</code></pre>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ backgroundColor: '#FEF9EE', borderLeft: '4px solid #C29B38', padding: '1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.82rem', color: '#8D6B19', fontWeight: 700, marginBottom: '0.35rem' }}>
                  WHY INTERVIEWERS ASK THIS
                </div>
                <p style={{ fontSize: '0.9rem', color: '#451A03', lineHeight: 1.6 }}>
                  {currentQuery.explanation}
                </p>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.82rem', color: '#475569' }}>
                <strong>Database Schema File:</strong> <code style={{ color: '#9B1B33' }}>05-SQL-DBMS/schema.sql</code><br/>
                <strong>Verified DB Engine:</strong> SQLite 3 file: <code style={{ color: '#0F172A' }}>banking.db</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
