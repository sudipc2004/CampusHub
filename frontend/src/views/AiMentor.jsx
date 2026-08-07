import React, { useState } from 'react';
import { Bot, Sparkles, Send, Brain, AlertCircle, Clock, Zap, BookOpen, UserCheck, ShieldAlert, Heart, Star, Compass } from 'lucide-react';
import { askRagTutor } from '../services/ragApi';

export default function AiMentor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am your AI Learning Companion ⭐. I continuously remember your weak topics, peak study hours, and preferred learning style to guide your revision step-by-step!",
      time: "10:14 AM",
      confidence: 98,
      citations: [
        { noteTitle: 'CS601 Advanced Data Structures', pageNumber: 14 }
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // AI Learning Companion Memory State
  const companionMemory = {
    weakTopics: ['Quantum Physics Wavefunctions', 'B-Tree Node Splitting', 'Banker Algorithm'],
    studyHabits: 'Peak focus between 7:00 PM – 10:00 PM (35% higher retention)',
    learningStyle: 'Visual & Interactive Diagrammatic Explanations',
    mentorPersona: 'Encouraging, Structured, & Step-by-Step AI Guide',
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userQuery = inputText;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userQuery,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const ragResponse = await askRagTutor(userQuery);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: ragResponse.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: ragResponse.confidenceScore,
        isLowConfidence: ragResponse.isLowConfidence,
        citations: ragResponse.citations,
        teacherRecommendation: ragResponse.teacherRecommendation,
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Error retrieving AI answer. Please verify backend server connection.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 0
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={28} color="var(--accent-purple)" />
            AI Learning Companion ⭐ & RAG Doubt Solver
          </span>
          <span className="nav-badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple)', fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
            Personalized AI Memory Active
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Your personal AI mentor remembers your weak areas, study habits, and learning style to deliver tailored RAG doubt solutions.
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Main Chat Interface */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '580px' }}>
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon" style={{ background: 'var(--accent-purple)', width: '32px', height: '32px' }}>
              <Sparkles size={16} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>AI Learning Companion</h4>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>● Memory Synchronized with Student Profile</span>
            </div>
          </div>

          {/* Messages List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '0.85rem 1.1rem',
                  borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  background: msg.sender === 'user' ? 'var(--gradient-brand)' : 'var(--bg-glass)',
                  border: msg.sender === 'user' ? 'none' : msg.isLowConfidence ? '1px solid #f59e0b' : '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.5', whitespace: 'pre-line', margin: 0 }}>{msg.text}</p>

                  {/* Low Confidence Alert Banner */}
                  {msg.isLowConfidence && (
                    <div style={{ marginTop: '0.75rem', padding: '0.6rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', fontSize: '0.82rem', color: '#fbbf24' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                        <ShieldAlert size={16} />
                        <span>Low AI Confidence ({msg.confidence}%)</span>
                      </div>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem' }}>
                        The AI is unsure. We recommend consulting a teacher.
                      </p>
                    </div>
                  )}

                  {/* Teacher Recommendation Card */}
                  {msg.teacherRecommendation && (
                    <div style={{ marginTop: '0.5rem', padding: '0.65rem', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid #ec4899', fontSize: '0.82rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: '#f472b6' }}>
                        <UserCheck size={16} />
                        <span>Teacher Agent Rec: {msg.teacherRecommendation.recommendedTeacher}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Office Hours: {msg.teacherRecommendation.officeHours}
                      </div>
                    </div>
                  )}

                  {/* Source Citations Badges */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div style={{ marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {msg.citations.map((cit, idx) => (
                        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                          <BookOpen size={12} />
                          <span>{cit.noteTitle} (p. {cit.pageNumber})</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', fontSize: '0.7rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                    <span>{msg.time}</span>
                    {msg.confidence !== undefined && (
                      <span style={{ fontWeight: 600, color: msg.confidence >= 80 ? '#10b981' : msg.confidence >= 60 ? '#3b82f6' : '#f59e0b' }}>
                        {msg.confidence}% RAG Confidence
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Sparkles className="animate-spin" size={16} color="var(--primary-color)" />
                <span>Searching vector database and synthesizing answer...</span>
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <input 
              type="text" 
              className="header-search" 
              style={{ width: '100%', background: 'var(--bg-primary)' }}
              placeholder="Ask your AI Learning Companion (e.g., Explain BST complexity or Deadlocks)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* 🤖 AI Learning Companion Persistent Memory Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card" style={{ border: '2px solid var(--primary-color)' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)' }}>
              <Compass size={18} />
              <span>AI Mentor Persistent Memory</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <strong style={{ color: '#ef4444', display: 'block', marginBottom: '3px' }}>🎯 Remembered Weak Topics:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{companionMemory.weakTopics.join(' • ')}</span>
              </div>

              <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <strong style={{ color: 'var(--primary-color)', display: 'block', marginBottom: '3px' }}>🕒 Remembered Study Habit:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{companionMemory.studyHabits}</span>
              </div>

              <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <strong style={{ color: '#10b981', display: 'block', marginBottom: '3px' }}>💡 Preferred Learning Style:</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{companionMemory.learningStyle}</span>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} color="var(--accent-amber)" />
              <span>Suggested Revision Prompts</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setInputText('Explain Binary Search Tree search complexity step-by-step')}
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', textAlign: 'left' }}
              >
                🎯 Explain Binary Search Tree complexity
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setInputText('What are the four Coffman deadlock conditions with examples?')}
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', textAlign: 'left' }}
              >
                📖 What are Coffman deadlock conditions?
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setInputText('How does Adam optimizer work in Neural Networks?')}
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', textAlign: 'left' }}
              >
                💡 How does Adam optimizer work?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
