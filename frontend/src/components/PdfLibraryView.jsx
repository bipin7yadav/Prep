import React, { useState } from 'react';
import { PDF_BOOKS } from '../data/pdfDownloadsData';
import { 
  FileText, 
  Download, 
  Eye, 
  ExternalLink, 
  Maximize2, 
  X, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';

export default function PdfLibraryView() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [previewBook, setPreviewBook] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = ['All', 'Full Textbook', 'Interview Handbook', 'Quick Revision & Cram Book'];

  const filteredBooks = PDF_BOOKS.filter(b => 
    activeCategory === 'All' || b.category.includes(activeCategory)
  );

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9B1B33', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <BookOpen size={16} /> PROFESSIONAL TEXTBOOK SERIES • 9 SPECIALIZED EDITIONS
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            IDFC First Bank Technical Study Books
          </h1>
          <p style={{ color: '#64748B', maxWidth: '820px', lineHeight: 1.6, fontSize: '0.98rem' }}>
            Typeset in an O'Reilly-style technical textbook standard with running headers, footers, page numbering, chapter title openers, Hinglish mental models, callout boxes, and Pygments syntax highlighting. Served as web-ready downloadable assets.
          </p>
        </div>

        {/* Categories & Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: `1.5px solid ${activeCategory === cat ? '#9B1B33' : '#E2E8F0'}`,
                  backgroundColor: activeCategory === cat ? '#9B1B33' : '#FFFFFF',
                  color: activeCategory === cat ? '#FFFFFF' : '#475569',
                  fontSize: '0.82rem',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <CheckCircle2 size={16} /> All 9 Editions Ready for Preview & Download
          </div>
        </div>

        {/* Editions Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filteredBooks.map((book) => {
            const pdfUrl = `/pdfs/${book.filename}`;
            return (
              <div 
                key={book.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `5px solid ${book.color}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Bar on Card */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        backgroundColor: '#0F172A', 
                        color: '#FFFFFF', 
                        fontSize: '0.7rem', 
                        fontWeight: 800, 
                        padding: '2px 7px', 
                        borderRadius: '4px',
                        letterSpacing: '0.05em'
                      }}>
                        EDITION {book.editionNum}
                      </span>
                      <span className="badge badge-gray">{book.category}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <span className="badge badge-gray">{book.pages}</span>
                      <span className="badge badge-gray">{book.size}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                    {book.title}
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600, marginBottom: '0.85rem', lineHeight: 1.4 }}>
                    {book.subtitle}
                  </p>

                  {/* Topics Pills */}
                  <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, marginBottom: '0.25rem' }}>
                      Coverage Highlights
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>
                      {book.topics}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setPreviewBook(book)}
                    style={{
                      flex: '1 1 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      backgroundColor: '#9B1B33',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.55rem 0.9rem',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Eye size={15} /> Preview Book
                  </button>

                  <a
                    href={pdfUrl}
                    download={book.filename}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      backgroundColor: '#FFFFFF',
                      color: '#0F172A',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '0.55rem 0.9rem',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Download size={15} color="#64748B" /> Download
                  </a>

                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Open in new window / full browser viewer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#F8FAFC',
                      color: '#64748B',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '0.55rem 0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive In-App PDF Reader Modal */}
        {previewBook && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isFullscreen ? '0' : '1.5rem'
          }}>
            <div style={{
              width: isFullscreen ? '100vw' : '92vw',
              maxWidth: isFullscreen ? '100vw' : '1200px',
              height: isFullscreen ? '100vh' : '90vh',
              backgroundColor: '#FFFFFF',
              borderRadius: isFullscreen ? '0' : '12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
            }}>
              {/* Modal Bar */}
              <div style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #334155'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ 
                    backgroundColor: '#9B1B33', 
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem', 
                    fontWeight: 800 
                  }}>
                    EDITION {previewBook.editionNum}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {previewBook.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <a
                    href={`/pdfs/${previewBook.filename}`}
                    download={previewBook.filename}
                    style={{
                      color: '#FCD34D',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      textDecoration: 'none',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    <Download size={14} /> Download PDF
                  </a>

                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setPreviewBook(null);
                      setIsFullscreen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    title="Close Viewer"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div style={{ flex: 1, backgroundColor: '#525659', position: 'relative' }}>
                <iframe
                  src={`/pdfs/${previewBook.filename}#toolbar=1&navpanes=1`}
                  title={previewBook.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
