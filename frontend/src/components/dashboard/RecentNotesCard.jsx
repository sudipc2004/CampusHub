import React from 'react';
import { FileText } from 'lucide-react';
import { RECENT_NOTES_DATA } from '../../data/dashboardData';

export default function RecentNotesCard({ onSelectNote }) {
  return (
    <div className="glass-card">
      <div className="card-header-flex">
        <span className="section-card-title">
          <FileText size={18} color="var(--accent-rose)" />
          Recent Notes
        </span>
        <a href="#" className="view-all-link" onClick={(e)=>e.preventDefault()}>View All</a>
      </div>

      <div>
        {RECENT_NOTES_DATA.map((note) => (
          <div 
            key={note.id} 
            className="note-list-item" 
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectNote(note)}
          >
            <div className="note-info">
              <div className="note-icon-bg">
                <FileText size={18} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>{note.title}</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{note.sub}</p>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{note.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
