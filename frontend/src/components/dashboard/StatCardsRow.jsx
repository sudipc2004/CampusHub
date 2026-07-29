import React from 'react';
import { STAT_CARDS_DATA } from '../../data/dashboardData';

export default function StatCardsRow() {
  return (
    <div className="stats-row">
      {STAT_CARDS_DATA.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className="stat-card-single" style={{ '--card-accent': card.accentColor }}>
            <div className="stat-icon-wrapper" style={{ background: card.bgColor, color: card.accentColor }}>
              <Icon size={22} />
            </div>
            <div className="stat-content">
              <p>{card.title}</p>
              <h3>{card.value}</h3>
              <span className="stat-badge-trend" style={{ background: card.bgColor, color: card.accentColor }}>
                {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
