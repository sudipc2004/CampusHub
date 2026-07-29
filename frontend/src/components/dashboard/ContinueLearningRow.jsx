import React from 'react';
import { Layers } from 'lucide-react';
import { CONTINUE_LEARNING_DATA } from '../../data/dashboardData';

export default function ContinueLearningRow() {
  return (
    <div>
      <div className="card-header-flex" style={{ marginBottom: '0.95rem' }}>
        <span className="section-card-title" style={{ fontSize: '1.1rem' }}>
          <Layers size={20} color="var(--accent-primary)" />
          Continue Learning
        </span>
      </div>

      <div className="continue-learning-row">
        {CONTINUE_LEARNING_DATA.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="learning-card">
              <div className="stat-icon-wrapper" style={{ background: item.bgColor, color: item.accentColor }}>
                <Icon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0 }}>{item.title}</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>{item.sub}</p>
                <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.progress}%`, height: '100%', background: item.gradient }}></div>
                </div>
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: item.accentColor }}>{item.progress}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
