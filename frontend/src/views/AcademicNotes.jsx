import React, { useState } from 'react';
import { BookOpen, Search, Filter, FileText, Download, Eye, Upload, Star, Bookmark, CheckCircle, X, Layers } from 'lucide-react';
import { uploadNoteMaterial } from '../services/ragApi';

export default function AcademicNotes() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSem, setSelectedSem] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewNote, setPreviewNote] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([1, 3]);

  const [notesList, setNotesList] = useState([
    { id: 1, title: 'Data Structures & Algorithms Complete Notes', subject: 'Data Structures', dept: 'Computer Science', sem: 6, author: 'Dr. Sunita Rao', downloads: 342, rating: 4.9, format: 'PDF', size: '4.2 MB', readProgress: 85, snippet: 'A Binary Search Tree maintains keys smaller than root in left subtree and larger in right subtree.' },
    { id: 2, title: 'Quantum Mechanics & Modern Physics Handbook', subject: 'Physics', dept: 'Physics', sem: 4, author: 'Prof. R. Verma', downloads: 215, rating: 4.7, format: 'PDF', size: '3.1 MB', readProgress: 40, snippet: 'Wavefunctions describe quantum states of particles using the Schrödinger equation.' },
    { id: 3, title: 'Operating Systems & Concurrency Controls', subject: 'Operating Systems', dept: 'Computer Science', sem: 5, author: 'Dr. A. K. Sharma', downloads: 512, rating: 4.8, format: 'PPT', size: '8.5 MB', readProgress: 100, snippet: 'Bankers algorithm tests safe states to prevent deadlock conditions.' },
    { id: 4, title: 'Database Management Systems & SQL Optimization', subject: 'Database Systems', dept: 'Computer Science', sem: 5, author: 'Prof. Meera Nair', downloads: 418, rating: 4.9, format: 'PDF', size: '5.6 MB', readProgress: 60, snippet: 'ACID properties guarantee transaction atomicity, consistency, isolation, and durability.' },
    { id: 5, title: 'Computer Networks & TCP/IP Protocol Suite', subject: 'Computer Networks', dept: 'Electrical Eng.', sem: 6, author: 'Dr. V. K. Singh', downloads: 189, rating: 4.6, format: 'DOCX', size: '6.2 MB', readProgress: 25, snippet: 'TCP provides reliable, ordered stream delivery using 3-way handshake.' },
  ]);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const filteredNotes = notesList.filter(n => {
    const matchesDept = selectedDept === 'All' || n.dept.includes(selectedDept);
    const matchesSem = selectedSem === 'All' || n.sem === Number(selectedSem);
    const matchesSubject = selectedSubject === 'All' || n.subject === selectedSubject;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSem && matchesSubject && matchesSearch;
  });

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="section-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={28} color="var(--accent-primary)" />
              Academic Notes Repository & Reading Progress Tracker
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '0.3rem 0 0 0' }}>
              Filter notes by subject, semester, and department. Preview PDF documents, download files, and track reading progress.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowUploadModal(true)} style={{ gap: '0.4rem', fontWeight: 600 }}>
            <Upload size={18} />
            <span>Upload Notes</span>
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="glass-card" style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="header-search" style={{ width: '280px', background: 'var(--bg-primary)' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Filter by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            style={{ padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)', fontSize: '0.82rem' }}
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Electrical Eng.">Electrical Eng.</option>
          </select>

          {/* Semester Filter */}
          <select
            value={selectedSem}
            onChange={e => setSelectedSem(e.target.value)}
            style={{ padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)', fontSize: '0.82rem' }}
          >
            <option value="All">All Semesters</option>
            {[1,2,3,4,5,6,7,8].map(s => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            style={{ padding: '0.4rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)', fontSize: '0.82rem' }}
          >
            <option value="All">All Subjects</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Operating Systems">Operating Systems</option>
            <option value="Database Systems">Database Systems</option>
            <option value="Physics">Physics</option>
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredNotes.map(note => {
          const isBookmarked = bookmarkedIds.includes(note.id);
          return (
            <div key={note.id} className="glass-card interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge-item" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)', fontSize: '0.75rem' }}>
                    {note.dept} • Sem {note.sem}
                  </span>
                  <button 
                    onClick={() => toggleBookmark(note.id)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? '#f59e0b' : 'var(--text-muted)' }}
                    title={isBookmarked ? "Remove Bookmark" : "Bookmark Note"}
                  >
                    <Bookmark size={18} fill={isBookmarked ? "#f59e0b" : "none"} />
                  </button>
                </div>

                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', lineHeight: '1.3' }}>{note.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                  Subject: <strong>{note.subject}</strong> • Author: <strong>{note.author}</strong>
                </p>

                {/* Reading Progress Indicator */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
                    <span>Reading Progress</span>
                    <strong style={{ color: note.readProgress === 100 ? '#10b981' : 'var(--primary-color)' }}>{note.readProgress}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${note.readProgress}%`, height: '100%', background: note.readProgress === 100 ? '#10b981' : 'var(--gradient-brand)' }} />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{note.format} • {note.size}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary" onClick={() => setPreviewNote(note)} style={{ padding: '0.35rem 0.6rem' }} title="Preview Note">
                    <Eye size={14} /> Preview
                  </button>
                  <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note Preview Modal */}
      {previewNote && (
        <div className="modal-overlay" onClick={() => setPreviewNote(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary-color)' }}>{previewNote.title}</h3>
              <button className="icon-btn" onClick={() => setPreviewNote(null)}><X size={18} /></button>
            </div>
            
            <div style={{ padding: '1rem', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-color)' }}>Inline Document Text Snippet:</strong>
              {previewNote.snippet}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{previewNote.dept} • Semester {previewNote.sem}</span>
              <button className="btn btn-primary" onClick={() => setPreviewNote(null)}>Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
