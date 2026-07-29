import React from 'react';
import { Award } from 'lucide-react';
import { LEADERBOARD_DATA } from '../../data/dashboardData';

export default function LeaderboardCard() {
  return (
    <div className="glass-card">
      <div className="card-header-flex">
        <span className="section-card-title">
          <Award size={18} color="var(--accent-amber)" />
          Leaderboard
        </span>
        <select className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}>
          <option>This Week</option>
        </select>
      </div>

      <div>
        {LEADERBOARD_DATA.map((item) => (
          <div key={item.rank} className={`leader-row ${item.isUser ? 'highlight' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={`leader-badge ${item.badgeClass}`}>{item.rank}</span>
              <span style={{ fontWeight: item.isUser ? 700 : 600 }}>{item.name}</span>
            </div>
            <span style={{ fontWeight: 800, color: item.isUser ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
              {item.score}
            </span>
          </div>
        ))}
      </div>

      <a href="#" className="view-all-link" style={{ display: 'inline-block', marginTop: '0.75rem' }} onClick={(e)=>e.preventDefault()}>
        View Full Leaderboard →
      </a>
    </div>
  );
}
