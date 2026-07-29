import React from 'react';
import { Target } from 'lucide-react';
import { WEAK_TOPICS_DATA } from '../../data/dashboardData';

export default function WeakTopicsCard() {
  return (
    <div className="glass-card">
      <div className="card-header-flex">
        <span className="section-card-title">
          <Target size={18} color="var(--accent-rose)" />
          Weak Topics
        </span>
        <a href="#" className="view-all-link" onClick={(e)=>e.preventDefault()}>View All</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {WEAK_TOPICS_DATA.map((item, idx) => (
          <div key={idx} className="weak-topic-item">
            <div className="weak-topic-info">
              <span style={{ fontWeight: 700 }}>{item.name}</span>
              <span style={{ color: item.text, fontWeight: 800 }}>{item.percent}%</span>
            </div>
            <div className="weak-topic-bar-bg">
              <div className="weak-topic-bar-fill" style={{ width: `${item.percent}%`, background: item.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
