import React from 'react';
import { Users, MessageSquare, Plus, Globe, Lock, Sparkles, BookOpen } from 'lucide-react';

export default function StudyGroups() {
  const groups = [
    { id: 1, title: 'Sem 6 CS Core Algorithms Squad', members: 14, activeTopic: 'Dynamic Programming & Matrix Chain', type: 'Public', isJoined: true },
    { id: 2, title: 'Physics Quantum Mechanics Prep', members: 8, activeTopic: 'Schrödinger Equation Numerical Problems', type: 'Public', isJoined: false },
    { id: 3, title: 'OS Kernel & Concurrency Club', members: 19, activeTopic: 'Mutex Locks & Deadlock Detection', type: 'Public', isJoined: true },
    { id: 4, title: 'Gate CSE Exam Aspirants 2026', members: 42, activeTopic: 'Mock Test #4 Vector Analysis', type: 'Private', isJoined: false }
  ];

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <Users size={28} color="var(--accent-primary)" />
            Collaborative Peer Study Groups & Shared RAG Workspace
          </span>
          <button className="btn btn-primary">
            <Plus size={16} /> Create Group
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Join peer study rooms, share ChromaDB document collections, and resolve complex assignment problems collaboratively.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {groups.map(g => (
          <div key={g.id} className="glass-card interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge-item" style={{ fontSize: '0.75rem', background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>
                  {g.type === 'Public' ? <Globe size={12} style={{ marginRight: '0.3rem' }} /> : <Lock size={12} style={{ marginRight: '0.3rem' }} />}
                  {g.type}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>👥 {g.members} Peers</span>
              </div>

              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{g.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Active Discussion: <strong style={{ color: 'var(--text-primary)' }}>{g.activeTopic}</strong>
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>● 3 Members Online</span>
              <button className={`btn ${g.isJoined ? 'btn-secondary' : 'btn-primary'}`} style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}>
                {g.isJoined ? 'Enter Room' : 'Join Group'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
