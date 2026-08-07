import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, BrainCircuit, Clock, Target, AlertTriangle, Sparkles, BookOpen, UserCheck, Zap } from 'lucide-react';
import { fetchLearningInsightsApi, fetchWeakTopicsApi } from '../services/agentApi';

export default function LearningAnalytics() {
  const [insightsData, setInsightsData] = useState(null);
  const [weakTopicsData, setWeakTopicsData] = useState(null);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    const iData = await fetchLearningInsightsApi();
    if (iData) setInsightsData(iData);

    const wData = await fetchWeakTopicsApi();
    if (wData) setWeakTopicsData(wData);
  };

  const subjectProficiency = [
    { name: 'Data Structures & Algorithms', score: 92, status: 'Mastered', color: '#10b981' },
    { name: 'Operating Systems & Concurrency', score: 84, status: 'Good', color: '#06b6d4' },
    { name: 'Database Systems & SQL', score: 88, status: 'Good', color: '#6366f1' },
    { name: 'Quantum Mechanics & Physics', score: 54, status: 'Needs Review', color: '#ef4444' },
  ];

  const defaultWeakTopics = [
    { topic: 'Quantum Mechanics & Wavefunctions', subject: 'Physics', errorRate: 42, confidence: 54, priority: 'HIGH' },
    { topic: 'B-Tree Node Splitting & I/O Complexity', subject: 'Data Structures', errorRate: 35, confidence: 62, priority: 'MEDIUM' },
    { topic: 'Deadlock Banker Algorithm Safe States', subject: 'Operating Systems', errorRate: 28, confidence: 68, priority: 'MEDIUM' },
  ];

  const defaultInsights = [
    'Your retention is 35% higher when studying Data Structures between 7:00 PM and 9:00 PM.',
    'Weakness detected in Quantum Physics Wavefunctions. Taking a 5-question AI Quiz is recommended.',
    'You are on track for a top 5% rank on the Campus Leaderboard!',
  ];

  const weakTopics = weakTopicsData?.weakTopics || defaultWeakTopics;
  const insightsList = insightsData?.insights || defaultInsights;

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="section-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={28} color="var(--accent-cyan)" />
              AI Learning Insights & Weak Topic Analytics
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '0.3rem 0 0 0' }}>
              Synthesizes student study habits, peak active hours, quiz errors, and RAG accuracy into actionable study recommendations.
            </p>
          </div>
          <span className="badge-item" style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
            Real-Time Agentic Processing
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>{insightsData?.metrics?.overallConfidenceScore || '92%'}</h3>
            <p>Overall RAG AI Confidence</p>
            <span className="stat-trend trend-up">↑ +5.2% this month</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-color)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>{insightsData?.metrics?.totalStudyHours || '24.5 Hours'}</h3>
            <p>Active Study Time Logged</p>
            <span className="stat-trend trend-up">Peak: {insightsData?.metrics?.peakActiveHours || '7 PM - 10 PM'}</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <Target size={24} />
          </div>
          <div className="stat-info">
            <h3>{insightsData?.metrics?.avgQuizAccuracy || '84.5%'}</h3>
            <p>Quiz Accuracy Score</p>
            <span className="stat-trend trend-up">Top 5% of CS Class</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Subject Mastery Progress Bars */}
        <div className="glass-card">
          <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <BrainCircuit size={18} color="var(--primary-color)" />
            Subject Mastery & Confidence Heatmap
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {subjectProficiency.map((sub, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 600 }}>{sub.name}</span>
                  <span style={{ fontWeight: 700, color: sub.color }}>{sub.score}% • {sub.status}</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${sub.score}%`, height: '100%', background: sub.color, transition: 'width 0.4s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topic Detection Agent Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Weak Topics Heatmap */}
          <div className="glass-card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f87171' }}>
              <AlertTriangle size={18} />
              <span>Weak Topic Detection Agent</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {weakTopics.map((wt, idx) => (
                <div key={idx} style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#f87171' }}>{wt.topic}</strong>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '1px 6px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                      {wt.priority} PRIORITY
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Subject: {wt.subject} • Error Rate: {wt.errorRate}% (Confidence {wt.confidence}%)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Learning Insights Cards */}
          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)' }}>
              <Sparkles size={18} />
              <span>AI Learning Habit Insights</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {insightsList.map((ins, idx) => (
                <div key={idx} style={{ padding: '0.6rem 0.75rem', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-color)', lineHeight: 1.4 }}>
                  💡 {ins}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
