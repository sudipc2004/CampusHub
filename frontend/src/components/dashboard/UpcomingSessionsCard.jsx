import React from 'react';
import { Calendar } from 'lucide-react';
import { UPCOMING_SESSIONS_DATA } from '../../data/dashboardData';

export default function UpcomingSessionsCard({ onOpenBooking }) {
  return (
    <div className="glass-card">
      <div className="card-header-flex">
        <span className="section-card-title">
          <Calendar size={18} color="var(--accent-emerald)" />
          Upcoming Sessions
        </span>
        <a href="#" className="view-all-link" onClick={(e)=>e.preventDefault()}>View Calendar</a>
      </div>

      <div>
        {UPCOMING_SESSIONS_DATA.map((session) => (
          <div key={session.id} className="session-item">
            <div className="session-teacher">
              <img src={session.avatar} alt={session.teacher} className="teacher-avatar" />
              <div>
                <h5 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>{session.title}</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{session.teacher}</p>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div>{session.date}</div>
              <div style={{ fontWeight: 700, color: session.color }}>{session.time}</div>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="btn btn-secondary" 
        style={{ width: '100%', justifyContent: 'center', marginTop: '0.95rem', fontSize: '0.85rem' }}
        onClick={onOpenBooking}
      >
        📅 Book a Session
      </button>
    </div>
  );
}
