import React from 'react';
import { 
  GraduationCap,
  LayoutDashboard, 
  Bot, 
  BookOpen, 
  FileQuestion, 
  UserCheck, 
  Users, 
  Calendar, 
  BarChart2, 
  Award, 
  Bookmark, 
  MessageSquare, 
  Bell, 
  ChevronDown,
  Menu,
  Flame
} from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tutor', label: 'AI Tutor', icon: Bot },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: FileQuestion },
    { id: 'teachers', label: 'Teachers', icon: UserCheck },
    { id: 'groups', label: 'Study Groups', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const days = [
    { label: 'M', checked: true },
    { label: 'T', checked: true },
    { label: 'W', checked: true },
    { label: 'T', checked: true },
    { label: 'F', checked: true },
    { label: 'S', checked: false },
    { label: 'S', checked: false }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay when sidebar is open */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'mobile-open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? 'mobile-open open' : 'closed'}`}>
        {/* Sidebar Brand Header */}
        <div className="sidebar-header">
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>
            <div className="logo-icon">
              <GraduationCap size={20} />
            </div>
            <span>CampusHub AI</span>
          </a>

          {/* 3-Line Hamburger Symbol (≡) to Toggle/Close Sidebar */}
          <button 
            className="icon-btn" 
            style={{ width: '34px', height: '34px', background: '#f1f5f9' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'dashboard' && activeTab === 'dashboard');
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('dashboard');
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Study Streak Card Widget */}
          <div className="streak-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              <span>Study Streak</span>
              <Flame size={14} color="#F59E0B" />
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
              12 Days
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Keep it up! 🔥
            </div>

            <div className="streak-days-row">
              {days.map((d, i) => (
                <div key={i} className={`day-circle ${d.checked ? 'checked' : ''}`}>
                  {d.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="sidebar-footer">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
            alt="Aman Verma"
            className="user-avatar-img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="user-info">
            <span className="user-name">Aman Verma</span>
            <span className="user-role">Computer Science</span>
          </div>
          <ChevronDown size={16} color="var(--text-muted)" style={{ marginLeft: 'auto', cursor: 'pointer' }} />
        </div>
      </aside>
    </>
  );
}
