import React from 'react';
import { Home, Bot, BookOpen, FileQuestion, User } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'tutor', label: 'AI Tutor', icon: Bot },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: FileQuestion },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id || (item.id === 'dashboard' && activeTab === 'dashboard');
        return (
          <button
            key={item.id}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Icon size={20} color={isActive ? 'var(--accent-primary)' : 'var(--text-muted)'} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
