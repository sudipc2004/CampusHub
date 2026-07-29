import React, { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { TIMEFRAME_CHART_DATA } from '../../data/dashboardData';

export default function LearningProgressChart({ activeTimeframe, setActiveTimeframe }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const currentData = useMemo(() => {
    return TIMEFRAME_CHART_DATA[activeTimeframe] || TIMEFRAME_CHART_DATA['This Week'];
  }, [activeTimeframe]);

  const { days: chartDays, score: scoreData, confidence: confidenceData } = currentData;

  const svgWidth = 500;
  const svgHeight = 170;
  const paddingX = 35;
  const paddingY = 25;

  const getX = (index) => paddingX + (index * (svgWidth - 2 * paddingX)) / (chartDays.length - 1);
  const getY = (val) => svgHeight - paddingY - (val / 100) * (svgHeight - 2 * paddingY);

  const scorePoints = useMemo(() => scoreData.map((val, idx) => `${getX(idx)},${getY(val)}`).join(' '), [scoreData, chartDays]);
  const confidencePoints = useMemo(() => confidenceData.map((val, idx) => `${getX(idx)},${getY(val)}`).join(' '), [confidenceData, chartDays]);

  const scoreAreaPoints = useMemo(() => `${getX(0)},${svgHeight - paddingY} ${scorePoints} ${getX(scoreData.length - 1)},${svgHeight - paddingY}`, [scorePoints, scoreData]);
  const confidenceAreaPoints = useMemo(() => `${getX(0)},${svgHeight - paddingY} ${confidencePoints} ${getX(confidenceData.length - 1)},${svgHeight - paddingY}`, [confidencePoints, confidenceData]);

  return (
    <div className="glass-card">
      <div className="card-header-flex">
        <span className="section-card-title">
          <TrendingUp size={18} color="var(--accent-primary)" />
          Learning Progress
        </span>
        <select 
          className="btn btn-secondary" 
          style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', cursor: 'pointer' }}
          value={activeTimeframe}
          onChange={(e) => setActiveTimeframe(e.target.value)}
        >
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ width: '14px', height: '4px', background: 'var(--accent-primary)', borderRadius: '2px' }}></span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Score (%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{ width: '14px', height: '4px', background: 'var(--accent-emerald)', borderRadius: '2px' }}></span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Confidence (%)</span>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto', position: 'relative' }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', minWidth: '320px' }}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {[25, 50, 75, 100].map((level) => (
            <line 
              key={level} 
              x1={paddingX} 
              y1={getY(level)} 
              x2={svgWidth - paddingX} 
              y2={getY(level)} 
              stroke="#e2e8f0" 
              strokeDasharray="4 4"
            />
          ))}

          <polygon points={scoreAreaPoints} fill="url(#scoreGrad)" />
          <polygon points={confidenceAreaPoints} fill="url(#confGrad)" />

          <polyline
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="3"
            points={scorePoints}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            fill="none"
            stroke="var(--accent-emerald)"
            strokeWidth="3"
            points={confidencePoints}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {scoreData.map((val, idx) => (
            <circle
              key={`score-${idx}`}
              cx={getX(idx)}
              cy={getY(val)}
              r={hoveredPoint === idx ? "7" : "5"}
              fill="var(--accent-primary)"
              stroke="#ffffff"
              strokeWidth="2.5"
              style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={() => setHoveredPoint(idx)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {confidenceData.map((val, idx) => (
            <circle
              key={`conf-${idx}`}
              cx={getX(idx)}
              cy={getY(val)}
              r={hoveredPoint === idx ? "7" : "5"}
              fill="var(--accent-emerald)"
              stroke="#ffffff"
              strokeWidth="2.5"
              style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={() => setHoveredPoint(idx)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {chartDays.map((day, idx) => (
            <text
              key={day}
              x={getX(idx)}
              y={svgHeight - 4}
              fontSize="10"
              fontWeight="600"
              fill="#94a3b8"
              textAnchor="middle"
            >
              {day}
            </text>
          ))}
        </svg>

        {hoveredPoint !== null && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            background: '#0f172a',
            color: '#ffffff',
            padding: '0.4rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            pointerEvents: 'none'
          }}>
            <div><strong>{chartDays[hoveredPoint]}</strong></div>
            <div style={{ color: '#818cf8' }}>Score: {scoreData[hoveredPoint]}%</div>
            <div style={{ color: '#34d399' }}>Confidence: {confidenceData[hoveredPoint]}%</div>
          </div>
        )}
      </div>
    </div>
  );
}
