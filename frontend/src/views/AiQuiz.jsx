import React, { useState } from 'react';
import { FileQuestion, Sparkles, CheckCircle2, XCircle, RotateCcw, Award, Layers } from 'lucide-react';

export default function AiQuiz() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const sampleQuestion = {
    id: 1,
    subject: "CS601 - Data Structures & Algorithms",
    question: "What is the worst-case time complexity of searching an element in a balanced B-Tree of height h?",
    options: [
      { id: 'A', text: "O(1)" },
      { id: 'B', text: "O(log N)", isCorrect: true },
      { id: 'C', text: "O(N^2)" },
      { id: 'D', text: "O(N log N)" }
    ],
    explanation: "Because a B-Tree maintains dynamic balance across all leaf nodes, search operation follows O(log N) branch comparisons."
  };

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
    setShowAnswer(true);
    if (sampleQuestion.options.find(o => o.id === id)?.isCorrect) {
      setScore(prev => prev + 10);
    }
  };

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <FileQuestion size={28} color="var(--accent-amber)" />
            AI Quiz & Instant Flashcard Generator
          </span>
          <span className="badge-item" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-amber)' }}>
            Score: {score} XP
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Automatically generate interactive MCQs and instant spaced-repetition flashcards directly from uploaded course PDFs.
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Interactive Quiz Box */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{sampleQuestion.subject}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Question 1 of 5</span>
          </div>

          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>{sampleQuestion.question}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {sampleQuestion.options.map(opt => {
              let optStyle = { padding: '0.85rem 1rem', borderRadius: '10px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
              
              if (showAnswer) {
                if (opt.isCorrect) {
                  optStyle.background = 'rgba(16, 185, 129, 0.15)';
                  optStyle.borderColor = 'var(--accent-emerald)';
                } else if (selectedOption === opt.id) {
                  optStyle.background = 'rgba(244, 63, 94, 0.15)';
                  optStyle.borderColor = 'var(--accent-rose)';
                }
              }

              return (
                <button key={opt.id} style={optStyle} onClick={() => !showAnswer && handleOptionSelect(opt.id)}>
                  <span><strong>{opt.id}.</strong> {opt.text}</span>
                  {showAnswer && opt.isCorrect && <CheckCircle2 size={18} color="var(--accent-emerald)" />}
                  {showAnswer && selectedOption === opt.id && !opt.isCorrect && <XCircle size={18} color="var(--accent-rose)" />}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div style={{ padding: '0.85rem 1rem', background: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '8px', fontSize: '0.88rem' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>RAG Explanation:</strong> {sampleQuestion.explanation}
            </div>
          )}
        </div>

        {/* Generator Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--accent-amber)" />
              Generate New Quiz
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <select className="header-search" style={{ width: '100%', background: 'var(--bg-primary)' }}>
                <option>Data Structures (CS601)</option>
                <option>Quantum Physics (PHY201)</option>
                <option>Operating Systems (OS502)</option>
              </select>
              <button className="btn btn-primary" style={{ width: '100%' }}>
                ⚡ Generate 10 Questions
              </button>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="var(--accent-cyan)" />
              Spaced Repetition Decks
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--bg-glass)', borderRadius: '6px' }}>
                <span>B-Trees & Heaps</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>15 Cards due</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--bg-glass)', borderRadius: '6px' }}>
                <span>Schrödinger Equation</span>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>8 Cards due</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
