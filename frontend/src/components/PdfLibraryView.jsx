import React from 'react';
import { PDF_BOOKS } from '../data/pdfDownloadsData';
import { 
  FileText, 
  Printer, 
  BookOpen, 
  Download, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function PdfLibraryView() {
  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9B1B33', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <FileText size={16} /> 11 COMPLETE PRINTABLE INTERVIEW BOOKS
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            Offline PDF Study Library
          </h1>
          <p style={{ color: '#64748B', maxWidth: '750px', lineHeight: 1.6 }}>
            Every curriculum module has been compiled into standalone, printable PDF books with front covers, formatted chapter headings, syntax-highlighted code blocks, and question banks. Located in the <code>PDF/</code> directory.
          </p>
        </div>

        {/* Info Banner */}
        <div style={{
          backgroundColor: '#FDF2F4',
          border: '1px solid rgba(155, 27, 51, 0.2)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Printer size={24} color="#9B1B33" />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#9B1B33' }}>
                All 11 PDF Books Ready on Local Disk
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Access directly in: <code style={{ backgroundColor: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', color: '#0F172A', fontWeight: 600 }}>/home/bipin/Desktop/BankInterview/PDF/</code>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#8D6B19', backgroundColor: '#FEF9EE', padding: '0.4rem 0.85rem', borderRadius: '6px', fontWeight: 600, border: '1px solid #FDE68A' }}>
            ✨ Built via Chrome Headless Engine
          </div>
        </div>

        {/* Books Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {PDF_BOOKS.map((book, idx) => (
            <div 
              key={book.id} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${book.color}`
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    BOOK #{idx + 1}
                  </span>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <span className="badge badge-gray">{book.pages}</span>
                    <span className="badge badge-gray">{book.size}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {book.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {book.topics}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'monospace' }}>
                  {book.filename}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#9B1B33', fontSize: '0.8rem', fontWeight: 700 }}>
                  <CheckCircle2 size={14} color="#10B981" />
                  <span>Ready</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
