import { Sparkles, Calendar, FileText, X, Send, Download, BookOpen, ShieldAlert, UserCheck } from 'lucide-react';

export function AiTutorModal({ show, onClose, messages, query, setQuery, onSend, isLoading }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', width: '92%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color, #e2e8f0)', paddingBottom: '0.85rem' }}>
          <span className="section-card-title" style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={22} color="var(--primary-color)" /> Ask CampusHub AI Tutor
          </span>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ height: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '88%',
              background: m.sender === 'user' ? 'var(--gradient-brand)' : 'var(--bg-tertiary, #f8fafc)',
              color: m.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
              padding: '0.8rem 1.1rem',
              borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              fontSize: '0.88rem',
              lineHeight: '1.5',
              border: m.sender === 'user' ? 'none' : '1px solid var(--border-color, #e2e8f0)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}>
              <div style={{ whitespace: 'pre-line' }}>{m.text}</div>

              {/* Citations badges */}
              {m.citations && m.citations.length > 0 && (
                <div style={{ marginTop: '0.6rem', paddingTop: '0.4rem', borderTop: '1px dashed rgba(0,0,0,0.1)', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {m.citations.map((cit, cIdx) => (
                    <span key={cIdx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.12)', color: '#4f46e5', fontWeight: 600 }}>
                      <BookOpen size={11} /> {cit.noteTitle} {cit.pageNumber ? `(p. ${cit.pageNumber})` : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.84rem', padding: '0.5rem' }}>
              <Sparkles className="animate-spin" size={16} color="var(--primary-color)" />
              <span>Analyzing curriculum & generating AI response...</span>
            </div>
          )}
        </div>

        <form onSubmit={onSend} style={{ display: 'flex', gap: '0.6rem' }}>
          <input 
            type="text" 
            placeholder="Ask any question about Data Structures, OS, DBMS..."
            className="header-search-popover"
            style={{ position: 'static', width: '100%', boxShadow: 'none' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }} disabled={isLoading}>
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
