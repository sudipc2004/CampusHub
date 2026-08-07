import React, { useState, useEffect } from 'react';
import { CalendarClock, Target, CheckCircle2, Clock, Calendar, Sparkles, Zap, Award, BookOpen } from 'lucide-react';
import { fetchExamPredictorApi, fetchRevisionPlannerApi } from '../services/agentApi';

export default function RevisionPlanner() {
  const [plannerData, setPlannerData] = useState(null);
  const [predictorData, setPredictorData] = useState(null);

  useEffect(() => {
    loadAgentData();
  }, []);

  const loadAgentData = async () => {
    const pData = await fetchRevisionPlannerApi();
    if (pData) setPlannerData(pData);

    const exData = await fetchExamPredictorApi();
    if (exData) setPredictorData(exData);
  };

  const defaultSchedule = [
    { time: '09:00 AM - 10:30 AM', subject: 'Data Structures', task: 'Revise AVL Trees & B-Tree Node Splitting', status: 'Completed' },
    { time: '11:00 AM - 12:30 PM', subject: 'Operating Systems', task: 'Solve Banker Algorithm Deadlock Numerical Problems', status: 'In Progress' },
    { time: '02:00 PM - 03:30 PM', subject: 'Machine Learning', task: 'Review Gradient Descent & Adam Optimizer Equations', status: 'Pending' },
    { time: '04:00 PM - 05:00 PM', subject: 'AI Quiz Arena', task: 'Take 10-Question MCQ Challenge on Weak Topics', status: 'Pending' },
  ];

  const defaultPredictions = [
    { topic: 'B-Tree Insertion & Deletion Mechanics', probability: '94% High Probability', subject: 'Data Structures', paperFrequency: 'Appeared in 4 of last 5 exams' },
    { topic: 'Banker Algorithm Safe State Verification', probability: '89% High Probability', subject: 'Operating Systems', paperFrequency: 'Appeared in 5 of last 5 exams' },
    { topic: 'B-Tree vs BST Disk I/O Tradeoffs', probability: '82% Medium Probability', subject: 'Database Systems', paperFrequency: 'Appeared in 3 of last 5 exams' },
  ];

  const schedule = plannerData?.dailySchedule || defaultSchedule;
  const predictions = predictorData?.predictedTopics || defaultPredictions;

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="section-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarClock size={28} color="var(--accent-cyan)" />
              AI Revision Planner & Exam Predictor Agent
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '0.3rem 0 0 0' }}>
              Predicts high-probability exam topics by scanning 5-year previous papers and dynamically builds your daily revision schedule.
            </p>
          </div>
          <span className="badge-item" style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
            Exam in 14 Days
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Daily Schedule */}
        <div className="glass-card">
          <div className="section-header" style={{ marginBottom: '1rem' }}>
            <span className="section-title" style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={20} color="var(--accent-primary)" />
              AI Daily Study Schedule
            </span>
            <button className="btn btn-secondary" onClick={loadAgentData} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', gap: '0.3rem' }}>
              <Sparkles size={14} color="var(--accent-purple)" /> Re-optimize
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {schedule.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  background: item.status === 'In Progress' ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-tertiary)',
                  border: item.status === 'In Progress' ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  {item.status === 'Completed' ? <CheckCircle2 size={20} color="#10b981" /> : item.status === 'In Progress' ? <Target size={20} color="var(--primary-color)" /> : <Clock size={20} color="var(--text-muted)" />}

                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-color)' }}>{item.task}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.subject} • {item.time}</div>
                  </div>
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: item.status === 'Completed' ? 'rgba(16,185,129,0.2)' : item.status === 'In Progress' ? 'rgba(99,102,241,0.2)' : 'var(--bg-tertiary)', color: item.status === 'Completed' ? '#10b981' : item.status === 'In Progress' ? 'var(--primary-color)' : 'var(--text-muted)' }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Predictor Agent Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card" style={{ border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b' }}>
              <Zap size={18} />
              <span>Exam Predictor Agent</span>
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              Scanned previous year question papers & note importance weights:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {predictions.map((pred, pIdx) => (
                <div key={pIdx} style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b' }}>{pred.probability}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{pred.subject}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-color)' }}>{pred.topic}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>📊 {pred.paperFrequency}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
