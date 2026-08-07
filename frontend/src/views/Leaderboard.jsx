import React, { useState, useEffect } from 'react';
import { Trophy, Award, Flame, Star, Sparkles, Medal, Target, CheckCircle2 } from 'lucide-react';
import { fetchLeaderboardApi } from '../services/socialApi';
import { useAuth } from '../context/AuthContext';

export default function Leaderboard() {
  const { user } = useAuth();
  const [leaderData, setLeaderData] = useState([]);

  const weeklyChallenges = [
    { id: 1, title: 'Ace 3 AI Topic Quizzes', progress: 2, total: 3, xpReward: 150, completed: false },
    { id: 2, title: 'Solve 5 Doubts with RAG AI', progress: 5, total: 5, xpReward: 200, completed: true },
    { id: 3, title: 'Maintain 7-Day Study Streak', progress: 7, total: 7, xpReward: 300, completed: true },
  ];

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const data = await fetchLeaderboardApi();
    if (data && data.length > 0) {
      setLeaderData(data);
    } else {
      setLeaderData([
        { rank: 1, studentName: 'Aman Sharma (You)', department: 'Computer Science', points: 1450, streakDays: 12, isCurrent: true },
        { rank: 2, studentName: 'Priya Patel', department: 'Computer Science', points: 1320, streakDays: 10 },
        { rank: 3, studentName: 'Rohan Gupta', department: 'Electrical Eng.', points: 1180, streakDays: 8 },
        { rank: 4, studentName: 'Sneha Verma', department: 'Mechanical Eng.', points: 1050, streakDays: 7 },
        { rank: 5, studentName: 'Vikram Singh', department: 'Computer Science', points: 940, streakDays: 5 },
      ]);
    }
  };

  const badges = [
    { title: '👑 Campus Scholar', desc: 'Top 1% XP Achiever on Campus', icon: '👑', unlocked: true },
    { title: '🔥 12-Day Streak', desc: 'Maintained 12 consecutive study days', icon: '🔥', unlocked: true },
    { title: '⚡ Quiz Master', desc: 'Aced 5 AI MCQ Quizzes with >80% score', icon: '⚡', unlocked: true },
    { title: '📚 Notes Contributor', desc: 'Uploaded verified study notes', icon: '📚', unlocked: true },
    { title: '🧠 RAG Specialist', desc: 'Solved 20+ doubts via RAG AI Tutor', icon: '🧠', unlocked: true },
    { title: '🤝 Peer Mentor', desc: 'Helped classmates in Study Groups', icon: '🤝', unlocked: false },
  ];

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="section-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={28} color="var(--accent-amber)" />
              Campus Gamification & Leaderboard Rankings
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '0.3rem 0 0 0' }}>
              Earn XP points by completing AI quizzes, asking RAG doubts, uploading study materials, and maintaining daily study streaks.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', background: 'rgba(245,158,11,0.2)', borderRadius: '20px', color: '#f59e0b', fontWeight: 700 }}>
            <Flame size={18} />
            <span>12-Day Study Streak</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Campus Leaderboard Table */}
        <div className="glass-card">
          <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Medal size={18} color="#f59e0b" />
            <span>Campus Leaderboard Rankings</span>
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {leaderData.map((item, idx) => {
              const r = item.rank || idx + 1;
              const isUser = item.isCurrent || (user && item.studentName.includes(user.name));
              return (
                <div
                  key={r}
                  style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    padding: '0.85rem 1rem',
                    background: isUser ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)',
                    border: isUser ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: r === 1 ? '#F59E0B' : r === 2 ? '#94A3B8' : r === 3 ? '#B45309' : 'var(--text-muted)', minWidth: '24px' }}>
                      #{r}
                    </span>
                    <div>
                      <div style={{ fontWeight: isUser ? 700 : 600, fontSize: '0.9rem', color: isUser ? 'var(--primary-color)' : 'var(--text-color)' }}>
                        {item.studentName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.department}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                      🔥 {item.streakDays || 12}d
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-color)', minWidth: '70px', textAlign: 'right' }}>
                      {item.points} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Challenges & Achievement Badges Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Weekly Challenges Card */}
          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)' }}>
              <Target size={18} />
              <span>Weekly Academic Challenges</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {weeklyChallenges.map(ch => (
                <div key={ch.id} style={{ padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ch.title}</span>
                    <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700 }}>+{ch.xpReward} XP</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                    <span>Progress: {ch.progress}/{ch.total}</span>
                    {ch.completed && <span style={{ color: '#10b981', fontWeight: 700 }}>✓ Completed</span>}
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-glass)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(ch.progress / ch.total) * 100}%`, height: '100%', background: ch.completed ? '#10b981' : 'var(--gradient-brand)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges Grid */}
          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={18} color="#f59e0b" />
              <span>Achievement Badges ({badges.filter(b => b.unlocked).length}/{badges.length})</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.65rem',
                    borderRadius: '8px',
                    background: b.unlocked ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-tertiary)',
                    border: b.unlocked ? '1px solid #f59e0b' : '1px solid var(--border-color)',
                    opacity: b.unlocked ? 1 : 0.5,
                  }}
                >
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.15rem' }}>{b.icon}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-color)' }}>{b.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
