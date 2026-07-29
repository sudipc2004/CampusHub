import React from 'react';
import { Sparkles, BookOpen, CheckSquare, UserCheck } from 'lucide-react';

export default function AiRecommendationsCard({ onAskTutor, onBookSession }) {
  return (
    <div className="glass-card">
      <div className="card-header-flex">
        <span className="section-card-title" style={{ color: 'var(--accent-primary)' }}>
          <Sparkles size={18} /> AI Recommendations
        </span>
      </div>

      <div className="rec-item" onClick={onAskTutor}>
        <div className="rec-icon-box" style={{ background: '#EEF2FF', color: 'var(--accent-primary)' }}>
          <BookOpen size={20} />
        </div>
        <div>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>Revise Data Structures</h5>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Based on your performance</p>
        </div>
      </div>

      <div className="rec-item" onClick={() => alert("⚡ Starting 5-minute Quiz on Arrays & Linked Lists!")}>
        <div className="rec-icon-box" style={{ background: '#FDF2F8', color: 'var(--accent-pink)' }}>
          <CheckSquare size={20} />
        </div>
        <div>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>Take a Quiz</h5>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Arrays & Linked Lists</p>
        </div>
      </div>

      <div className="rec-item" onClick={onBookSession}>
        <div className="rec-icon-box" style={{ background: '#ECFDF5', color: 'var(--accent-emerald)' }}>
          <UserCheck size={20} />
        </div>
        <div>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>Meet a Teacher</h5>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Get help from top teachers</p>
        </div>
      </div>

      <a 
        href="#" 
        className="view-all-link" 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.4rem' }} 
        onClick={(e) => { e.preventDefault(); onAskTutor(); }}
      >
        View all recommendations →
      </a>
    </div>
  );
}
