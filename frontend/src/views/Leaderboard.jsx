import React from 'react';
import { Trophy, Award, Flame, Star, Sparkles, Medal } from 'lucide-react';

export default function Leaderboard() {
  const leaderData = [
    { rank: 1, name: 'Priya Sharma', dept: 'CS Sem 6', points: 1420, streak: 14, badge: '👑 Campus Champion' },
    { rank: 2, name: 'Rohan Gupta', dept: 'CS Sem 6', points: 1280, streak: 11, badge: '⚡ Quiz Master' },
    { rank: 3, name: 'Alex Sharma (You)', dept: 'CS Sem 6', points: 1150, streak: 7, badge: '🧠 RAG Specialist', isCurrent: true },
    { rank: 4, name: 'Ananya Verma', dept: 'Physics Sem 4', points: 1090, streak: 5, badge: '📚 Notes Contributor' },
    { rank: 5, name: 'Karan Patel', dept: 'ECE Sem 6', points: 980, streak: 8, badge: '🔥 Consistent Learner' },
  ];

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <Trophy size={28} color="var(--accent-amber)" />
            Campus Gamification & Global Department Leaderboard
          </span>
          <span className="streak-counter">
            <Flame size={18} color="#F59E0B" /> 7-Day Streak
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Earn study XP by uploading notes, completing AI quizzes, asking RAG doubts, and maintaining your daily study streak.
        </p>
      </div>

      <div className="glass-card">
        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Top Department Scholars</h4>
        
        <div className="leaderboard-list">
          {leaderData.map((item) => (
            <div 
              key={item.rank} 
              className="leader-item" 
              style={{
                padding: '0.85rem 1.25rem',
                background: item.isCurrent ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-glass)',
                border: item.isCurrent ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="leader-rank" style={{ fontSize: '1.1rem', color: item.rank === 1 ? '#F59E0B' : item.rank === 2 ? '#94A3B8' : item.rank === 3 ? '#B45309' : 'var(--text-muted)' }}>
                  #{item.rank}
                </span>
                <div>
                  <h5 style={{ fontSize: '0.95rem', margin: 0, fontWeight: item.isCurrent ? 700 : 600, color: item.isCurrent ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                    {item.name}
                  </h5>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.dept}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span className="badge-item" style={{ fontSize: '0.75rem' }}>{item.badge}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                  🔥 {item.streak}d
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-amber)', minWidth: '70px', textAlign: 'right' }}>
                  {item.points} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
