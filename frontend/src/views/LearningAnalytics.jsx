import React from 'react';
import { BarChart3, TrendingUp, BrainCircuit, Clock, Target, CheckCircle2 } from 'lucide-react';

export default function LearningAnalytics() {
  const subjectProficiency = [
    { name: 'Data Structures & Algorithms', score: 92, status: 'Mastered', color: 'var(--accent-emerald)' },
    { name: 'Operating Systems & Concurrency', score: 84, status: 'Good', color: 'var(--accent-cyan)' },
    { name: 'Database Systems & SQL', score: 88, status: 'Good', color: 'var(--accent-primary)' },
    { name: 'Quantum Mechanics & Physics', score: 54, status: 'Needs Review', color: 'var(--accent-rose)' },
  ];

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <BarChart3 size={28} color="var(--accent-cyan)" />
            Learning Analytics & Subject Proficiency Heatmap
          </span>
          <span className="rag-pill">Real-time Metrics</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Detailed performance breakdown generated continuously from RAG accuracy, quiz test scores, and study time logs.
        </p>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>82.5%</h3>
            <p>Overall Academic Mastery</p>
            <span className="stat-trend trend-up">↑ +5.2% this month</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>142 Hours</h3>
            <p>Total Study Hours Logged</p>
            <span className="stat-trend trend-up">Semester 6 Total</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
            <Target size={24} />
          </div>
          <div className="stat-info">
            <h3>94%</h3>
            <p>Quiz Completion Rate</p>
            <span className="stat-trend trend-up">Top 5% of CS Class</span>
          </div>
        </div>
      </div>

      {/* Subject Mastery Progress Bars */}
      <div className="glass-card">
        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Subject Mastery & AI Confidence Scores</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {subjectProficiency.map((sub, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 600 }}>{sub.name}</span>
                <span style={{ fontWeight: 700, color: sub.color }}>{sub.score}% • {sub.status}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-glass)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${sub.score}%`, height: '100%', background: sub.color, transition: 'width 0.4s ease' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
