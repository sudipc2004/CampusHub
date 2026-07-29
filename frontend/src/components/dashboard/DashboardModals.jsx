import React from 'react';
import { Sparkles, Calendar, FileText, X, Send, Download } from 'lucide-react';

export function AiTutorModal({ show, onClose, messages, query, setQuery, onSend }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem' }}>
          <span className="section-card-title" style={{ color: 'var(--accent-primary)' }}>
            <Sparkles size={22} /> Ask CampusHub AI Tutor
          </span>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ height: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              background: m.sender === 'user' ? 'var(--gradient-brand)' : '#f1f5f9',
              color: m.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
              padding: '0.75rem 1rem',
              borderRadius: '14px',
              fontSize: '0.88rem',
              lineHeight: '1.4'
            }}>
              {m.text}
            </div>
          ))}
        </div>

        <form onSubmit={onSend} style={{ display: 'flex', gap: '0.6rem' }}>
          <input 
            type="text" 
            placeholder="Ask any question about Data Structures, OS, DBMS..."
            className="header-search-popover"
            style={{ position: 'static', width: '100%', boxShadow: 'none' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

export function SessionBookingModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem' }}>
          <span className="section-card-title">
            <Calendar size={20} color="var(--accent-emerald)" /> Book 1-on-1 Teacher Session
          </span>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Select Subject & Professor</label>
            <select className="btn btn-secondary" style={{ width: '100%', justifyContent: 'space-between' }}>
              <option>Prof. Neha Sharma — Database Management Systems</option>
              <option>Prof. Rahul Verma — Operating Systems</option>
              <option>Prof. Amit Singh — Data Structures & Algorithms</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Available Time Slots (Tomorrow)</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>10:00 AM</button>
              <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>02:00 PM</button>
              <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>04:30 PM</button>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            onClick={() => {
              alert("✅ Session Confirmed! Google Meet link synced to your Google Calendar.");
              onClose();
            }}
          >
            Confirm Session Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export function NoteViewModal({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem' }}>
          <span className="section-card-title">
            <FileText size={20} color="var(--accent-rose)" /> {note.title}
          </span>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Subject: <strong>{note.sub}</strong> • RAG Vector Status: Indexed (ChromaDB Vector Store)
        </p>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => alert(`📥 Downloading ${note.title}...`)}>
            <Download size={16} /> Download File
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
