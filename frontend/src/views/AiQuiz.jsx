import React, { useState, useEffect } from 'react';
import { FileQuestion, Sparkles, CheckCircle2, XCircle, RotateCcw, Award, Layers, Search, Zap } from 'lucide-react';
import { generateAiQuiz, submitQuizAttemptApi, fetchQuizHistoryApi, fetchFlashcardsApi } from '../services/quizApi';

export default function AiQuiz() {
  const [subject, setSubject] = useState('Data Structures');
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const [flashcards, setFlashcards] = useState([]);
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    handleGenerateNewQuiz();
    loadQuizExtras();
  }, [subject, difficulty]);

  const loadQuizExtras = async () => {
    const fCards = await fetchFlashcardsApi(subject);
    if (fCards) setFlashcards(fCards);

    const qHist = await fetchQuizHistoryApi();
    if (qHist) setQuizHistory(qHist);
  };

  const handleGenerateNewQuiz = async (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setShowExplanations(false);
    setSelectedAnswers({});
    setQuizResult(null);
    setCurrentQIndex(0);

    const targetSubject = customTopic.trim() ? customTopic : subject;
    const generated = await generateAiQuiz(targetSubject, difficulty, 5);

    if (generated) {
      setActiveQuiz(generated);
    } else {
      // Fallback AI quiz
      setActiveQuiz({
        id: `quiz_${Date.now()}`,
        title: `AI ${difficulty} Quiz on ${targetSubject}`,
        subject: targetSubject,
        difficulty: difficulty,
        totalQuestions: 4,
        questions: [
          {
            questionText: `[${targetSubject}] What is the primary algorithmic time complexity for optimal operation in this topic?`,
            options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
            correctAnswer: 1,
            explanation: `In ${targetSubject}, divide-and-conquer strategy maintains O(log N) operations by halving search space.`
          },
          {
            questionText: `[${targetSubject}] Which data invariant must be preserved during dynamic updates?`,
            options: ['Linear probing', 'Structural balance & boundary limits', 'Garbage collection', 'Polling'],
            correctAnswer: 1,
            explanation: 'Structural balance invariants ensure consistent performance across operations.'
          },
          {
            questionText: `[${targetSubject}] What is the key memory allocation property?`,
            options: ['Contiguous block indexing', 'Non-deterministic hashing', 'O(1) worst-case search', 'Unrestricted pointers'],
            correctAnswer: 0,
            explanation: 'Contiguous block allocation maximizes cache spatial locality for faster memory access.'
          },
          {
            questionText: `[${targetSubject}] How does AI RAG context retrieval optimize student comprehension?`,
            options: ['By suppressing errors', 'By indexing note chunks and providing verified page citations', 'By ignoring notes', 'By turning off vector search'],
            correctAnswer: 1,
            explanation: 'AI RAG retrieves verified chunks directly from uploaded course notes to generate accurate explanations.'
          }
        ]
      });
    }

    setIsGenerating(false);
  };

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return;

    let scoreCount = 0;
    activeQuiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) scoreCount++;
    });

    const accuracy = Math.round((scoreCount / activeQuiz.questions.length) * 100);

    const resultObj = {
      score: scoreCount,
      totalQuestions: activeQuiz.questions.length,
      accuracyPercentage: accuracy,
    };

    setQuizResult(resultObj);
    setShowExplanations(true);

    await submitQuizAttemptApi({
      subject: customTopic.trim() || subject,
      difficulty,
      userAnswers: selectedAnswers,
      questions: activeQuiz.questions,
    });

    loadQuizExtras();
  };

  const currentQ = activeQuiz?.questions?.[currentQIndex];

  return (
    <div className="dashboard-view">
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="section-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileQuestion size={28} color="var(--accent-amber)" />
              AI MCQ Quiz Generator & Revision Arena
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '0.3rem 0 0 0' }}>
              Students can generate custom MCQs on any topic or subject directly using RAG AI with instant feedback and step-by-step explanations.
            </p>
          </div>
          <span className="badge-item" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', fontWeight: 700 }}>
            AI Generator Active
          </span>
        </div>
      </div>

      {/* 🤖 Custom Student Topic AI Quiz Generator Input Box */}
      <div className="glass-card" style={{ background: 'var(--bg-secondary)', border: '2px solid var(--primary-color)' }}>
        <h4 style={{ fontSize: '1rem', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)' }}>
          <Sparkles size={18} />
          <span>Student AI Topic Quiz Generator</span>
        </h4>

        <form onSubmit={handleGenerateNewQuiz} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Type any topic (e.g. Recursion, Wavefunctions, Memory Management)..."
              value={customTopic}
              onChange={e => setCustomTopic(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 0.6rem 0.6rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)', fontSize: '0.88rem' }}
            />
          </div>

          <select
            value={subject}
            onChange={e => { setCustomTopic(''); setSubject(e.target.value); }}
            style={{ padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)', fontSize: '0.85rem' }}
          >
            <option value="Data Structures">Data Structures</option>
            <option value="Operating Systems">Operating Systems</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Database Systems">Database Systems</option>
          </select>

          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-tertiary)', padding: '3px', borderRadius: '8px' }}>
            {['Easy', 'Medium', 'Hard'].map(diff => (
              <button
                type="button"
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`btn ${difficulty === diff ? 'btn-primary' : ''}`}
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
              >
                {diff}
              </button>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isGenerating} style={{ padding: '0.6rem 1rem', fontSize: '0.88rem', fontWeight: 600, gap: '0.4rem' }}>
            <Zap size={16} />
            <span>{isGenerating ? 'Generating...' : 'Generate AI Quiz'}</span>
          </button>
        </form>
      </div>

      <div className="dashboard-grid">
        {/* Interactive MCQ Quiz Box */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {activeQuiz && currentQ ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span className="badge-item" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '0.78rem' }}>
                  {activeQuiz.title}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Question {currentQIndex + 1} of {activeQuiz.questions.length}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                {currentQ.questionText}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {currentQ.options.map((optText, optIdx) => {
                  const isSelected = selectedAnswers[currentQIndex] === optIdx;
                  const isCorrect = currentQ.correctAnswer === optIdx;

                  let btnBg = 'var(--bg-glass)';
                  let borderCol = 'var(--border-color)';

                  if (showExplanations) {
                    if (isCorrect) {
                      btnBg = 'rgba(16, 185, 129, 0.15)';
                      borderCol = '#10b981';
                    } else if (isSelected) {
                      btnBg = 'rgba(244, 63, 94, 0.15)';
                      borderCol = '#ef4444';
                    }
                  } else if (isSelected) {
                    btnBg = 'rgba(99, 102, 241, 0.15)';
                    borderCol = 'var(--primary-color)';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => !showExplanations && handleSelectOption(optIdx)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        background: btnBg,
                        border: `1px solid ${borderCol}`,
                        cursor: showExplanations ? 'default' : 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        color: 'var(--text-color)',
                        fontSize: '0.9rem',
                      }}
                    >
                      <span><strong>{String.fromCharCode(65 + optIdx)}.</strong> {optText}</span>
                      {showExplanations && isCorrect && <CheckCircle2 size={18} color="#10b981" />}
                      {showExplanations && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
                    </button>
                  );
                })}
              </div>

              {/* RAG Step-by-Step AI Explanation Box */}
              {showExplanations && (
                <div style={{ padding: '0.85rem 1rem', background: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid var(--primary-color)', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  <strong style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                    <Sparkles size={14} /> AI Answer Reasoning:
                  </strong>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
              Generating AI Quiz questions...
            </div>
          )}

          {/* Bottom Quiz Controls */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {activeQuiz?.questions?.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQIndex(idx)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: currentQIndex === idx ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                    background: selectedAnswers[idx] !== undefined ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-tertiary)',
                    color: 'var(--text-color)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {!showExplanations ? (
              <button className="btn btn-primary" onClick={handleSubmitQuiz} style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem', fontWeight: 600 }}>
                Submit Quiz & View AI Explanations
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={handleGenerateNewQuiz} style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem', gap: '0.4rem' }}>
                <RotateCcw size={16} /> Generate Next AI Quiz
              </button>
            )}
          </div>
        </div>

        {/* Flashcards & Attempt History Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Flashcard Revision Deck */}
          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="var(--accent-cyan)" />
              Flashcard Revision Deck
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Click any card to flip and reveal the definition.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {flashcards.slice(0, 3).map(fc => {
                const isFlipped = flippedCardId === fc.id;
                return (
                  <div
                    key={fc.id}
                    onClick={() => setFlippedCardId(isFlipped ? null : fc.id)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '8px',
                      background: isFlipped ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-tertiary)',
                      border: isFlipped ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '2px' }}>
                      {isFlipped ? 'DEFINITION' : 'TERM (CLICK TO FLIP)'}
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-color)' }}>
                      {isFlipped ? fc.definition : fc.term}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Past Quiz Attempt History */}
          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="#f59e0b" />
              Quiz Score Tracking History
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {quizHistory.slice(0, 3).map((item, idx) => (
                <div key={item._id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '0.82rem' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.subject} ({item.difficulty || 'Medium'})</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Score: {item.score} / {item.totalQuestions || 5}</div>
                  </div>
                  <span style={{ fontWeight: 700, color: item.accuracyPercentage >= 75 ? '#10b981' : '#f59e0b' }}>
                    {item.accuracyPercentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
