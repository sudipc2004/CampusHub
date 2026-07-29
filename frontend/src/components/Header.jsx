import React, { useState } from 'react';
import { Menu, Search, Bell, X } from 'lucide-react';

export default function Header({ sidebarOpen, setSidebarOpen, onSearchQuery }) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearchQuery) {
      onSearchQuery(query);
      setShowSearch(false);
    }
  };

  return (
    <header className="header">
      {/* Left side: Show 3-line hamburger menu button (≡) when sidebar is closed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {!sidebarOpen && (
          <button 
            className="icon-btn" 
            onClick={() => setSidebarOpen(true)}
            title="Open Sidebar"
            style={{ background: '#f1f5f9' }}
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Header Right Actions */}
      <div className="header-actions">
        {/* Search Icon Button placed RIGHT BEFORE Notification Bell */}
        <button 
          className="icon-btn" 
          onClick={() => setShowSearch(!showSearch)}
          title="Search"
        >
          {showSearch ? <X size={18} /> : <Search size={18} />}
        </button>

        {/* Expandable Search Input Popover when Search Icon is Clicked */}
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

        {/* Notification Bell */}
        <button className="icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>

        {/* User Profile Avatar */}
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
          alt="Aman Verma"
          className="user-avatar-img"
          style={{ width: '34px', height: '34px', cursor: 'pointer' }}
        />
      </div>
    </header>
  );
}
