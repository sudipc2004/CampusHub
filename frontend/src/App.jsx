import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import AuthModal from './components/AuthModal';
import Dashboard from './views/Dashboard';
import AiMentor from './views/AiMentor';
import AcademicNotes from './views/AcademicNotes';
import AiQuiz from './views/AiQuiz';
import TeacherSessions from './views/TeacherSessions';
import StudyGroups from './views/StudyGroups';
import RevisionPlanner from './views/RevisionPlanner';
import LearningAnalytics from './views/LearningAnalytics';
import Leaderboard from './views/Leaderboard';
import KnowledgeBase from './views/KnowledgeBase';
import SecurityAudit from './views/SecurityAudit';

function MainAppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const { showAuthModal, setShowAuthModal, role } = useAuth();

  const handleSearchQuery = (q) => {
    setSearchQuery(q);
    setActiveTab('dashboard');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'tutor':
      case 'messages':
        return <AiMentor />;
      case 'notes':
      case 'bookmarks':
        return <AcademicNotes />;
      case 'quizzes':
        return <AiQuiz />;
      case 'teachers':
        return <TeacherSessions />;
      case 'groups':
        return <StudyGroups />;
      case 'schedule':
        return <RevisionPlanner />;
      case 'analytics':
        return <LearningAnalytics />;
      case 'achievements':
        return <Leaderboard />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'security':
        return role === 'ADMIN' ? <SecurityAudit /> : <Dashboard searchQuery={searchQuery} onNavigate={setActiveTab} />;
      case 'notifications':
        return <SecurityAudit />;
      case 'dashboard':
      default:
        return <Dashboard searchQuery={searchQuery} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Side Navigation Bar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          onSearchQuery={handleSearchQuery} 
        />
        
        {renderActiveView()}
      </div>

      {/* Mobile Bottom Navigation Bar (< 768px Viewports) */}
      <MobileBottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Auth Modal Trigger */}
      <AuthModal 
        show={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppLayout />
    </AuthProvider>
  );
}
