import React, { useState } from 'react';
import { Bot, Sparkles, Send, User, Brain, AlertCircle, Clock, Zap } from 'lucide-react';

export default function AiMentor() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello Alex! I am your personal AI Study Companion. I noticed from your recent RAG logs that you had some confusion about Quantum Mechanics Wavefunctions and B-Trees. How can I assist your study session today?", time: "10:14 AM" },
    { id: 2, sender: 'user', text: "Can you summarize the main difference between B-Trees and Binary Search Trees in simple terms?", time: "10:15 AM" },
    { id: 3, sender: 'bot', text: "Great question! While a Binary Search Tree has at most 2 children per node, a B-Tree is a multi-way self-balancing tree designed for storage systems. Each node in a B-Tree can contain multiple keys and more than two child pointers, keeping all leaf nodes at the same height for faster disk I/O!", time: "10:15 AM", confidence: 96 }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `I checked your CS601 course notes for "${inputText}". Based on Unit 3, the key concept focuses on balanced tree invariants and O(log N) retrieval complexity! Would you like a 3-question quick quiz on this?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 94
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <Bot size={28} color="var(--accent-purple)" />
            Personal AI Learning Companion & Mentor
          </span>
          <span className="nav-badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple)', fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
            Active Memory Sync
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Your dedicated AI mentor tracks weak subjects (Quantum Mechanics), adjusts to your study pace, and offers continuous 24/7 interactive guidance.
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Chat Interface */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '550px' }}>
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon" style={{ background: 'var(--accent-purple)', width: '32px', height: '32px' }}>
              <Sparkles size={16} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>CampusHub AI Mentor</h4>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>● Online & Reading Courseware</span>
            </div>
          </div>

          {/* Messages list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '0.85rem 1.1rem',
                  borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  background: msg.sender === 'user' ? 'var(--gradient-brand)' : 'var(--bg-glass)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{msg.text}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem', fontSize: '0.7rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                    <span>{msg.time}</span>
                    {msg.confidence && <span>{msg.confidence}% RAG Accuracy</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <input 
              type="text" 
              className="header-search" 
              style={{ width: '100%', background: 'var(--bg-primary)' }}
              placeholder="Ask your AI Mentor anything about your syllabus..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Companion Memory & Insights Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Brain size={18} color="var(--accent-purple)" />
              Learner Memory Insights
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'rgba(244,63,94,0.1)', borderLeft: '3px solid var(--accent-rose)' }}>
                <strong>Weak Area:</strong> Quantum Mechanics & Wavefunctions (Confidence 54%)
              </div>
              <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', borderLeft: '3px solid var(--accent-emerald)' }}>
                <strong>Strong Area:</strong> Data Structures - Linked Lists & Arrays (Confidence 96%)
              </div>
              <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'rgba(6,182,212,0.1)', borderLeft: '3px solid var(--accent-cyan)' }}>
                <strong>Optimal Study Hour:</strong> 7:00 PM – 10:00 PM
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} color="var(--accent-amber)" />
              Suggested Mentor Tasks
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem' }}>
                🎯 Generate 5-min recap on B-Trees
              </button>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem' }}>
                📖 Summarize Quantum Physics Unit 2
              </button>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem' }}>
                💡 Explain LRU Page Replacement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
