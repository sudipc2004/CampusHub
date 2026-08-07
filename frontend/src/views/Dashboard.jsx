import React, { useState, useCallback } from 'react';
import { Sparkles, UserCheck, ShieldCheck, BookOpen, Users, Clock, CheckCircle, AlertTriangle, Video, Upload, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Student Dashboard Components
import StatCardsRow from '../components/dashboard/StatCardsRow';
import LearningProgressChart from '../components/dashboard/LearningProgressChart';
import WeakTopicsCard from '../components/dashboard/WeakTopicsCard';
import AiRecommendationsCard from '../components/dashboard/AiRecommendationsCard';
import RecentNotesCard from '../components/dashboard/RecentNotesCard';
import UpcomingSessionsCard from '../components/dashboard/UpcomingSessionsCard';
import LeaderboardCard from '../components/dashboard/LeaderboardCard';
import ContinueLearningRow from '../components/dashboard/ContinueLearningRow';
import { AiTutorModal, SessionBookingModal, NoteViewModal } from '../components/dashboard/DashboardModals';

import { askRagTutor } from '../services/ragApi';

export default function Dashboard({ searchQuery, onNavigate }) {
  const { user, role } = useAuth();

  const [activeTimeframe, setActiveTimeframe] = useState('This Week');
  const [showAiModal, setShowAiModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // AI Tutor chat state
  const [tutorQuery, setTutorQuery] = useState('');
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [tutorMessages, setTutorMessages] = useState([
    { sender: 'bot', text: `Hello ${user?.name || 'Aman'}! How can I assist your study session today?` }
  ]);

  const handleSendTutorQuery = useCallback(async (e) => {
    e.preventDefault();
    if (!tutorQuery.trim() || isTutorLoading) return;

    const userQuery = tutorQuery.trim();
    setTutorMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setTutorQuery('');
    setIsTutorLoading(true);

    try {
      const ragResponse = await askRagTutor(userQuery);
      setTutorMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: ragResponse.answer,
          citations: ragResponse.citations,
          confidence: ragResponse.confidenceScore,
          isLowConfidence: ragResponse.isLowConfidence,
          teacherRecommendation: ragResponse.teacherRecommendation
        }
      ]);
    } catch (err) {
      setTutorMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Sorry, I encountered an issue retrieving the answer for "${userQuery}". Please try again.`
        }
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  }, [tutorQuery, isTutorLoading]);

  // -------------------------------------------------------------
  // 1. TEACHER ROLE DASHBOARD VIEW
  // -------------------------------------------------------------
  if (role === 'TEACHER') {
    return (
      <div className="dashboard-view">
        <div className="greeting-header" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
          <div className="greeting-text">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Welcome Back, {user?.name || 'Dr. Rajesh Verma'}! 👨‍🏫
            </h1>
            <p>Faculty Command Hub — Manage 1-on-1 consultations, courseware uploads, and review class weak topics.</p>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('teachers')} style={{ gap: '0.4rem' }}>
            <Video size={18} />
            <span>Manage Office Hours</span>
          </button>
        </div>

        {/* Teacher KPI Stat Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="glass-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pending Sessions</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-color)', marginTop: '0.2rem' }}>2 Requests</div>
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>+1 booked today</span>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Notes Uploaded</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '0.2rem' }}>14 Documents</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>540 Total Downloads</span>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Average Student Rating</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.2rem' }}>⭐ 4.9 / 5.0</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Based on 42 reviews</span>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Doubt Resolution Rate</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>96.4%</div>
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>RAG Low Confidence Triggered</span>
          </div>
        </div>

        {/* Teacher Action Center */}
        <div className="dashboard-grid-3col">
          <div className="glass-card">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={18} color="var(--accent-color)" />
              Pending 1-on-1 Session Requests
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Aman Sharma — Data Structures</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Topic: BST Balancing & Memory Allocation</div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                  <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('teachers')} style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}>Approve</button>
                  <button className="btn btn-secondary" onClick={() => onNavigate && onNavigate('teachers')} style={{ padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}>Reschedule</button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={18} color="#f59e0b" />
              Class Weak Topic Insights
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(245,158,11,0.1)', borderLeft: '3px solid #f59e0b' }}>
                <strong>Quantum Wavefunctions:</strong> 42% Error Rate
              </div>
              <div style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(99,102,241,0.1)', borderLeft: '3px solid #6366f1' }}>
                <strong>B-Tree Node Splitting:</strong> 35% Error Rate
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Upload size={18} color="#10b981" />
              Upload Course Materials
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Upload new lecture slides or PDF notes to instantly index them into ChromaDB for RAG doubt solving.
            </p>
            <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('notes')} style={{ width: '100%', justifyContent: 'center' }}>
              Upload Notes for Class
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. ADMIN ROLE DASHBOARD VIEW
  // -------------------------------------------------------------
  if (role === 'ADMIN') {
    return (
      <div className="dashboard-view">
        <div className="greeting-header" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div className="greeting-text">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              CampusHub System Admin Console 🛡️
            </h1>
            <p>Role-Based Access Control (RBAC), user moderation, audit logs, and ChromaDB vector stats.</p>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('security')} style={{ gap: '0.4rem' }}>
            <ShieldCheck size={18} />
            <span>Open Security Audit</span>
          </button>
        </div>

        {/* Admin KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="glass-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Registered Users</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>1,420 Active</div>
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>1,280 Students • 140 Faculty</span>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Vector Store Metrics</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '0.2rem' }}>4,820 Chunks</div>
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>ChromaDB Connected</span>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>API Security Audit</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>Passed 100%</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>JWT + RBAC Middleware</span>
          </div>
          <div className="glass-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Server Uptime</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>99.98%</div>
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>Node.js Express Engine</span>
          </div>
        </div>

        <div className="dashboard-grid-3col">
          <div className="glass-card">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} color="#10b981" />
              RBAC Role Matrix
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                <span>STUDENT Role:</span> <strong>1,280 Users</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                <span>TEACHER Role:</span> <strong>140 Users</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
                <span>ADMIN Role:</span> <strong>4 Superusers</strong>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={18} color="#10b981" />
              Teacher Approval Queue
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
              Dr. Rajesh Verma (Computer Science) - Verification Passed
            </p>
            <button className="btn btn-secondary" onClick={() => onNavigate && onNavigate('security')} style={{ width: '100%', fontSize: '0.8rem' }}>
              View Security & Moderation Logs
            </button>
          </div>

          <div className="glass-card">
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={18} color="var(--primary-color)" />
              System Controls
            </h4>
            <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('security')} style={{ width: '100%', justifyContent: 'center' }}>
              Open Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. DEFAULT STUDENT ROLE DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="dashboard-view">
      {/* 1. Header Greeting Banner */}
      <div className="greeting-header">
        <div className="greeting-text">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Hello, {user?.name || 'Aman'}! 👋
          </h1>
          <p>Let's continue your learning journey today with AI recommendations.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAiModal(true)}>
          <Sparkles size={18} />
          <span>Ask AI Tutor</span>
        </button>
      </div>

      {/* 2. 5 KPI Stat Metric Cards Row */}
      <StatCardsRow />

      {/* 3. Middle 3-Column Grid */}
      <div className="dashboard-grid-3col">
        <LearningProgressChart 
          activeTimeframe={activeTimeframe} 
          setActiveTimeframe={setActiveTimeframe} 
        />
        <WeakTopicsCard />
        <AiRecommendationsCard 
          onAskTutor={() => setShowAiModal(true)} 
          onBookSession={() => setShowBookingModal(true)} 
        />
      </div>

      {/* 4. Lower 3-Column Grid */}
      <div className="dashboard-grid-lower">
        <RecentNotesCard onSelectNote={setSelectedNote} />
        <UpcomingSessionsCard onOpenBooking={() => setShowBookingModal(true)} />
        <LeaderboardCard />
      </div>

      {/* 5. Continue Learning Row */}
      <ContinueLearningRow />

      {/* --- Modals & Drawers --- */}
      <AiTutorModal 
        show={showAiModal} 
        onClose={() => setShowAiModal(false)}
        messages={tutorMessages}
        query={tutorQuery}
        setQuery={setTutorQuery}
        onSend={handleSendTutorQuery}
        isLoading={isTutorLoading}
      />

      <SessionBookingModal 
        show={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />

      <NoteViewModal 
        note={selectedNote} 
        onClose={() => setSelectedNote(null)} 
      />
    </div>
  );
}
