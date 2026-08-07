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
  Menu,
  Flame,
  ShieldCheck,
  Database,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) {
  const { user, role, setShowAuthModal } = useAuth();

  // Navigation Items per Role (STUDENT, TEACHER, ADMIN)
  const studentNavItems = [
    { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
    { id: 'tutor', label: 'AI Doubt Tutor', icon: Bot },
    { id: 'notes', label: 'Notes Repository', icon: BookOpen },
    { id: 'quizzes', label: 'AI Quizzes & Cards', icon: FileQuestion },
    { id: 'teachers', label: 'Book Faculty Session', icon: UserCheck },
    { id: 'groups', label: 'Study Groups', icon: Users },
    { id: 'schedule', label: 'Revision Schedule', icon: Calendar },
    { id: 'analytics', label: 'Learning Progress', icon: BarChart2 },
    { id: 'achievements', label: 'Leaderboard', icon: Award },
  ];

  const teacherNavItems = [
    { id: 'dashboard', label: 'Teacher Command Hub', icon: LayoutDashboard },
    { id: 'teachers', label: 'Session Approvals', icon: CheckCircle },
    { id: 'notes', label: 'Courseware Manager', icon: UploadIcon => <BookOpen size={18} /> },
    { id: 'tutor', label: 'Student Doubts RAG', icon: Bot },
    { id: 'analytics', label: 'Class Weak Topics', icon: BarChart2 },
    { id: 'schedule', label: 'Office Hours Grid', icon: Calendar },
    { id: 'knowledge', label: 'Vector Knowledge Base', icon: Database },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Admin System Console', icon: LayoutDashboard },
    { id: 'security', label: 'RBAC & Audit Logs', icon: ShieldCheck },
    { id: 'teachers', label: 'Faculty Management', icon: UserCheck },
    { id: 'knowledge', label: 'ChromaDB Collections', icon: Database },
    { id: 'notes', label: 'Content Moderation', icon: FileText },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart2 },
  ];

  const getNavItems = () => {
    if (role === 'TEACHER') return teacherNavItems;
    if (role === 'ADMIN') return adminNavItems;
    return studentNavItems;
  };

  const navItems = getNavItems();

  const days = [
    { label: 'M', checked: true },
    { label: 'T', checked: true },
    { label: 'W', checked: true },
    { label: 'T', checked: true },
    { label: 'F', checked: true },
    { label: 'S', checked: false },
    { label: 'S', checked: false }
  ];

  const getRoleBadgeStyle = () => {
    if (role === 'ADMIN') return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
    if (role === 'TEACHER') return { bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' };
    return { bg: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' };
  };

  const badgeStyle = getRoleBadgeStyle();

  return (
    <>
      {/* Mobile Overlay */}
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

          <button 
            className="icon-btn" 
            style={{ width: '34px', height: '34px', background: 'var(--bg-tertiary)' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Dynamic User Role Banner */}
        <div 
          onClick={() => setShowAuthModal(true)}
          style={{ 
            margin: '0.5rem 1rem 0.25rem 1rem', 
            padding: '0.55rem 0.75rem', 
            borderRadius: '8px', 
            background: badgeStyle.bg, 
            border: `1px solid ${badgeStyle.color}40`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: badgeStyle.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              PORTAL: {role}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-color)', marginTop: '1px' }}>
              {user?.department || 'Computer Science'}
            </div>
          </div>
          <ShieldCheck size={16} color={badgeStyle.color} />
        </div>

        {/* Role Nav List */}
        <div className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = typeof item.icon === 'function' ? item.icon : item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Role Widget Panel */}
          {role === 'STUDENT' && (
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
          )}

          {role === 'TEACHER' && (
            <div className="streak-card" style={{ background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f472b6' }}>
                Office Hours Active
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                2 Session Requests Pending
              </div>
            </div>
          )}

          {role === 'ADMIN' && (
            <div className="streak-card" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10b981' }}>
                System Status: 100% Operational
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                RBAC Security Shields Active
              </div>
            </div>
          )}
        </div>

        {/* User Footer */}
        <div className="sidebar-footer" onClick={() => setShowAuthModal(true)} style={{ cursor: 'pointer' }}>
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} 
            alt={user?.name || "User"}
            className="user-avatar-img"
          />
          <div className="user-info">
            <span className="user-name">{user?.name || "Aman Sharma"}</span>
            <span className="user-role">{role === 'STUDENT' ? `Sem ${user?.semester || 6} Student` : role === 'TEACHER' ? 'Faculty Member' : 'System Administrator'}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
