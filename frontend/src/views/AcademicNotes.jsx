import React, { useState } from 'react';
import { BookOpen, Search, Filter, FileText, Download, Eye, Bookmark, Star, Tag } from 'lucide-react';

export default function AcademicNotes() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const notesList = [
    { id: 1, title: 'Data Structures & Algorithms Complete Notes', dept: 'CS', sem: 'Sem 6', author: 'Dr. Sunita Rao', downloads: 342, rating: 4.9, format: 'PDF', size: '4.2 MB' },
    { id: 2, title: 'Quantum Mechanics & Modern Physics Handbook', dept: 'Physics', sem: 'Sem 4', author: 'Prof. R. Verma', downloads: 215, rating: 4.7, format: 'PDF', size: '3.1 MB' },
    { id: 3, title: 'Operating Systems & Concurrency Controls', dept: 'CS', sem: 'Sem 5', author: 'Dr. A. K. Sharma', downloads: 512, rating: 4.8, format: 'PPTX', size: '8.5 MB' },
    { id: 4, title: 'Database Management Systems & SQL Optimization', dept: 'CS', sem: 'Sem 5', author: 'Prof. Meera Nair', downloads: 418, rating: 4.9, format: 'PDF', size: '5.6 MB' },
    { id: 5, title: 'Computer Networks & TCP/IP Protocol Suite', dept: 'ECE', sem: 'Sem 6', author: 'Dr. V. K. Singh', downloads: 189, rating: 4.6, format: 'PDF', size: '6.2 MB' },
  ];

  const filteredNotes = notesList.filter(n => {
    const matchesDept = selectedDept === 'All' || n.dept === selectedDept;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <BookOpen size={28} color="var(--accent-primary)" />
            Academic Notes Repository & PDF Viewer
          </span>
          <span className="rag-pill">RAG Indexable</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Browse Department and Semester-wise verified professor notes with inline PDF preview, instant bookmarking, and single-click vector indexing.
        </p>
      </div>

      {/* Filter and Search controls */}
      <div className="glass-card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="header-search" style={{ width: '380px', background: 'var(--bg-primary)' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Filter by subject or professor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Filter size={16} color="var(--text-muted)" />
          {['All', 'CS', 'Physics', 'ECE'].map(dept => (
            <button 
              key={dept} 
              className={`btn ${selectedDept === dept ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
              onClick={() => setSelectedDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredNotes.map(note => (
          <div key={note.id} className="glass-card interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge-item" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)', fontSize: '0.75rem' }}>
                  {note.dept} • {note.sem}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Star size={14} fill="var(--accent-amber)" /> {note.rating}
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>{note.title}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Author: <strong>{note.author}</strong> • {note.format} ({note.size})
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📥 {note.downloads} Downloads</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem' }} title="Preview PDF">
                  <Eye size={14} />
                </button>
                <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                  <Download size={14} /> Get File
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
