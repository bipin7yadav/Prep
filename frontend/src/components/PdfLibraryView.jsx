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
    <div className="py-4 sm:py-8">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-[#9B1B33] font-bold text-xs uppercase tracking-wider mb-2">
            <BookOpen size={15} /> PROFESSIONAL TEXTBOOK SERIES • 9 SPECIALIZED EDITIONS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            IDFC First Bank Technical Study Books
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
            Typeset in an O'Reilly-style technical textbook standard with running headers, footers, page numbering, chapter title openers, Hinglish mental models, callout boxes, and Pygments syntax highlighting. Served as web-ready downloadable assets.
          </p>
        </div>

        {/* Categories & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat 
                    ? 'bg-[#9B1B33] text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0 self-start sm:self-auto">
            <CheckCircle2 size={15} className="text-emerald-600" />
            <span>All 9 Editions Ready for Preview & Download</span>
          </div>
        </div>

        {/* Editions Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {filteredBooks.map((book) => {
            const pdfUrl = `/pdfs/${book.filename}`;
            return (
              <div 
                key={book.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                style={{ borderTop: `4px solid ${book.color}` }}
              >
                <div>
                  {/* Top Bar on Card */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider">
                        EDITION {book.editionNum}
                      </span>
                      <span className="badge badge-gray text-[10px]">{book.category}</span>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <span className="badge badge-gray text-[10px]">{book.pages}</span>
                      <span className="badge badge-gray text-[10px]">{book.size}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-1">
                    {book.title}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">
                    {book.subtitle}
                  </p>

                  {/* Topics Pills */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">
                    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">
                      Coverage Highlights
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      {book.topics}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setPreviewBook(book)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#9B1B33] hover:bg-[#801428] text-white rounded-xl py-2 px-3 font-bold text-xs shadow-sm transition-colors"
                  >
                    <Eye size={14} /> Preview Book
                  </button>

                  <a
                    href={pdfUrl}
                    download={book.filename}
                    className="flex items-center justify-center gap-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl py-2 px-3 font-semibold text-xs transition-colors"
                    title="Download PDF"
                  >
                    <Download size={14} /> <span className="hidden sm:inline">Download</span>
                  </a>

                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl p-2 transition-colors"
                    title="Open in new window"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive In-App PDF Reader Modal */}
        {previewBook && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-0 sm:p-4">
            <div className={`w-full h-full ${isFullscreen ? 'sm:w-screen sm:h-screen sm:rounded-none' : 'sm:w-[94vw] sm:max-w-6xl sm:h-[90vh] sm:rounded-2xl'} bg-white overflow-hidden flex flex-col shadow-2xl transition-all`}>
              {/* Modal Bar */}
              <div className="bg-slate-900 text-white p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-800">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="bg-[#9B1B33] px-2 py-0.5 rounded text-[11px] font-extrabold shrink-0">
                    EDITION {previewBook.editionNum}
                  </span>
                  <span className="font-bold text-xs sm:text-sm truncate">
                    {previewBook.title}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 shrink-0">
                  <a
                    href={`/pdfs/${previewBook.filename}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <ExternalLink size={13} /> Open in Tab
                  </a>

                  <a
                    href={`/pdfs/${previewBook.filename}`}
                    download={previewBook.filename}
                    className="text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Download size={13} /> Download
                  </a>

                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="hidden sm:flex text-slate-400 hover:text-white p-1.5 transition-colors"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setPreviewBook(null);
                      setIsFullscreen(false);
                    }}
                    className="text-rose-400 hover:text-rose-300 p-1.5 transition-colors"
                    title="Close Viewer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="flex-1 bg-slate-700 relative">
                <iframe
                  src={`/pdfs/${previewBook.filename}#toolbar=1&navpanes=1`}
                  title={previewBook.title}
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
