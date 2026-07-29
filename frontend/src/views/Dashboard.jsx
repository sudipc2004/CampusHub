import React, { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

// Modular Dashboard Subcomponents
import StatCardsRow from '../components/dashboard/StatCardsRow';
import LearningProgressChart from '../components/dashboard/LearningProgressChart';
import WeakTopicsCard from '../components/dashboard/WeakTopicsCard';
import AiRecommendationsCard from '../components/dashboard/AiRecommendationsCard';
import RecentNotesCard from '../components/dashboard/RecentNotesCard';
import UpcomingSessionsCard from '../components/dashboard/UpcomingSessionsCard';
import LeaderboardCard from '../components/dashboard/LeaderboardCard';
import ContinueLearningRow from '../components/dashboard/ContinueLearningRow';
import { AiTutorModal, SessionBookingModal, NoteViewModal } from '../components/dashboard/DashboardModals';

export default function Dashboard({ searchQuery }) {
  const [activeTimeframe, setActiveTimeframe] = useState('This Week');
  const [showAiModal, setShowAiModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // AI Tutor chat state
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorMessages, setTutorMessages] = useState([
    { sender: 'bot', text: 'Hello Aman! How can I help you master Data Structures or Operating Systems today?' }
  ]);

  const handleSendTutorQuery = useCallback((e) => {
    e.preventDefault();
    if (!tutorQuery.trim()) return;

    setTutorMessages(prev => [...prev, { sender: 'user', text: tutorQuery }]);
    const q = tutorQuery;
    setTutorQuery('');

    setTimeout(() => {
      setTutorMessages(prev => [
        ...prev,
        { sender: 'bot', text: `Based on your course notes for "${q}", here is the AI summary: Focus on O(log N) tree balancing and memory allocation formulas!` }
      ]);
    }, 600);
  }, [tutorQuery]);

  return (
    <div className="dashboard-view">
      {/* 1. Header Greeting Banner */}
      <div className="greeting-header">
        <div className="greeting-text">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Hello, Aman! 👋
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
