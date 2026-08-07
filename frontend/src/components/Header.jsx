import React, { useState } from 'react';
import { Menu, Search, Bell, X, User, LogOut, ShieldCheck, CheckCircle2, MessageSquare, AlertTriangle, FileQuestion } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ sidebarOpen, setSidebarOpen, onSearchQuery }) {
  const { user, role, logout, setShowAuthModal } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, type: 'QUIZ_READY', title: 'Quiz Ready', message: 'AI MCQ Quiz on Data Structures generated.', time: '5m ago', icon: <FileQuestion size={16} color="#f59e0b" /> },
    { id: 2, type: 'SESSION_UPDATE', title: 'Session Approved', message: 'Dr. Rajesh Verma approved your 1-on-1 Meet session.', time: '20m ago', icon: <CheckCircle2 size={16} color="#10b981" /> },
    { id: 3, type: 'COMMENT', title: 'New Comment', message: 'Priya Patel commented on your Operating Systems post.', time: '1h ago', icon: <MessageSquare size={16} color="var(--primary-color)" /> },
    { id: 4, type: 'TEACHER_REC', title: 'Teacher Recommendation', message: 'Low confidence detected (48%). Faculty referral issued.', time: '2h ago', icon: <AlertTriangle size={16} color="#ef4444" /> },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearchQuery) {
      onSearchQuery(query);
      setShowSearch(false);
    }
  };

  const getRoleColor = () => {
    if (role === 'ADMIN') return '#10b981';
    if (role === 'TEACHER') return '#ec4899';
    return '#6366f1';
  };

  return (
    <header className="header" style={{ position: 'relative' }}>
      {/* Left side: Hamburger menu when sidebar is collapsed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {!sidebarOpen && (
          <button 
            className="icon-btn" 
            onClick={() => setSidebarOpen(true)}
            title="Open Sidebar"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Header Right Actions */}
      <div className="header-actions" style={{ alignItems: 'center', gap: '0.85rem' }}>
        {/* Search Icon Button */}
        <button 
          className="icon-btn" 
          onClick={() => setShowSearch(!showSearch)}
          title="Search"
        >
          {showSearch ? <X size={18} /> : <Search size={18} />}
        </button>

        {/* Expandable Search Input Popover */}
        {showSearch && (
          <form className="header-search-popover" onSubmit={handleSearchSubmit}>
            <Search size={16} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search notes, topics, teachers..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" style={{ display: 'none' }}></button>
          </form>
        )}

        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            <span className="notification-badge">{notifications.length}</span>
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '42px',
              width: '320px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.75rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
              zIndex: 100,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.88rem' }}>Real-time Notifications</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--primary-color)', fontWeight: 700 }}>4 New</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ display: 'flex', gap: '0.65rem', padding: '0.55rem', borderRadius: '6px', background: 'var(--bg-tertiary)' }}>
                    <div style={{ marginTop: '2px' }}>{n.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{n.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{n.message}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User RBAC Profile Badge & Menu */}
        {user ? (
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setShowMenu(!showMenu)} 
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.25rem 0.6rem', borderRadius: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
            >
              <img 
                src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"} 
                alt={user.name}
                className="user-avatar-img"
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-color)', lineHeight: 1.1 }}>
                  {user.name}
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: getRoleColor() }}>
                  {role}
                </span>
              </div>
            </div>

            {/* Dropdown Menu */}
            {showMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '42px',
                width: '220px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '0.5rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                zIndex: 100,
              }}>
                <div style={{ padding: '0.5rem 0.6rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                  <div style={{ fontSize: '0.72rem', color: getRoleColor(), marginTop: '2px', fontWeight: 600 }}>
                    Department: {user.department || 'Computer Science'}
                  </div>
                </div>

                <button 
                  className="btn" 
                  onClick={() => { setShowAuthModal(true); setShowMenu(false); }}
                  style={{ width: '100%', justifyContent: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', padding: '0.45rem 0.6rem' }}
                >
                  <ShieldCheck size={16} />
                  <span>Switch Role / Portal</span>
                </button>

                <button 
                  className="btn" 
                  onClick={() => { logout(); setShowMenu(false); }}
                  style={{ width: '100%', justifyContent: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', padding: '0.45rem 0.6rem', color: '#ef4444' }}
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={() => setShowAuthModal(true)}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
          >
            <ShieldCheck size={16} />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}
