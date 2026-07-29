import React from 'react';
import { Video, Calendar, UserCheck, Star, Clock, AlertTriangle, Sparkles } from 'lucide-react';

export default function TeacherSessions() {
  const teachers = [
    { id: 1, name: 'Prof. R. Verma', dept: 'Physics Department', rating: 4.9, slots: '2 Slots Today', triggerReason: 'Triggered by low RAG confidence (<60%) in Quantum Physics', status: 'Recommended' },
    { id: 2, name: 'Dr. Sunita Rao', dept: 'Computer Science Dept', rating: 4.9, slots: 'Approved (Today 4:00 PM)', triggerReason: 'Google Meet sync confirmed', status: 'Booked' },
    { id: 3, name: 'Dr. A. K. Sharma', dept: 'Operating Systems Dept', rating: 4.8, slots: 'Available Tomorrow', triggerReason: 'Concurrency & Deadlocks Office Hours', status: 'Available' }
  ];

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <Video size={28} color="var(--accent-emerald)" />
            Teacher Sessions & Google Meet Integrations
          </span>
          <span className="badge-item" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)' }}>
            Agentic Trigger Active
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          When AI RAG query confidence falls below 60%, CampusHub automatically recommends booking 1-on-1 office hour sessions with domain professors.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {teachers.map(t => (
          <div key={t.id} className="glass-card interactive" style={{ borderLeft: t.status === 'Recommended' ? '4px solid var(--accent-rose)' : '4px solid var(--accent-emerald)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div className="user-avatar" style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}>
                {t.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <span className="badge-item" style={{
                background: t.status === 'Recommended' ? 'rgba(244,63,94,0.15)' : 'rgba(16,185,129,0.15)',
                color: t.status === 'Recommended' ? 'var(--accent-rose)' : 'var(--accent-emerald)',
                fontSize: '0.75rem'
              }}>
                {t.status}
              </span>
            </div>

            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{t.name}</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              {t.dept} • ⭐ {t.rating}
            </p>

            <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-glass)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              ℹ️ {t.triggerReason}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{t.slots}</span>
              <button className={`btn ${t.status === 'Booked' ? 'btn-secondary' : 'btn-primary'}`} style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
                {t.status === 'Booked' ? 'Join Google Meet' : 'Book Office Hour'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
