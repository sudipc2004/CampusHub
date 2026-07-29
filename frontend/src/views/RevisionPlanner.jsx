import React from 'react';
import { CalendarClock, Target, CheckCircle2, Clock, Calendar, AlertTriangle, Sparkles } from 'lucide-react';

export default function RevisionPlanner() {
  const scheduleItems = [
    { time: '09:00 AM - 10:00 AM', subject: 'Data Structures', topic: 'B-Tree Node Splitting & Rotation', status: 'Completed', type: 'High Priority' },
    { time: '11:30 AM - 12:30 PM', subject: 'Physics', topic: 'Quantum Wavefunctions (Weak Topic Review)', status: 'In Progress', type: 'Weak Area' },
    { time: '03:00 PM - 04:00 PM', subject: 'Operating Systems', topic: 'Page Replacement Algorithms (LRU vs FIFO)', status: 'Upcoming', type: 'Exam Predictor' },
    { time: '07:00 PM - 08:00 PM', subject: 'AI Practice', topic: '15 MCQ Flashcards & Spaced Repetition', status: 'Upcoming', type: 'Daily Quiz' }
  ];

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <CalendarClock size={28} color="var(--accent-cyan)" />
            AI Revision Planner & Exam Predictor
          </span>
          <span className="badge-item" style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)' }}>
            Exam in 12 Days
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Automated daily revision schedule tailored dynamically to your weak subjects, memory retention curves, and predicted mid-sem exam topics.
        </p>
      </div>

      {/* Daily Progress Overview */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Today's Revision Goals (65% Complete)</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>2 of 4 Sessions Done</span>
        </div>
        <div style={{ height: '8px', background: 'var(--bg-glass)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', background: 'var(--gradient-brand)' }}></div>
        </div>
      </div>

      {/* Revision Schedule Table / Cards */}
      <div className="glass-card">
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <span className="section-title">
            <Clock size={20} color="var(--accent-primary)" />
            AI Scheduled Timetable for Today
          </span>
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
            <Sparkles size={14} color="var(--accent-purple)" /> Re-optimize Schedule
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {scheduleItems.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: item.status === 'In Progress' ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-glass)',
              border: item.status === 'In Progress' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {item.status === 'Completed' && <CheckCircle2 size={22} color="var(--accent-emerald)" />}
                {item.status === 'In Progress' && <Target size={22} color="var(--accent-primary)" />}
                {item.status === 'Upcoming' && <Clock size={22} color="var(--text-muted)" />}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.topic}</span>
                    <span className="badge-item" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>{item.type}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.subject} • {item.time}</span>
                </div>
              </div>

              <div>
                <span className="badge-item" style={{
                  background: item.status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' : item.status === 'In Progress' ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-glass)',
                  color: item.status === 'Completed' ? 'var(--accent-emerald)' : item.status === 'In Progress' ? 'var(--accent-primary)' : 'var(--text-muted)'
                }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
