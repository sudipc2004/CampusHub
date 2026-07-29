import React, { useState } from 'react';
import { BrainCircuit, Upload, FileText, CheckCircle, Database, Search, Sparkles, Layers, Cpu } from 'lucide-react';

export default function KnowledgeBase() {
  const [collections, setCollections] = useState([
    { id: 'cs601', name: 'Data_Structures_CS601.pdf', chunks: 128, status: 'Indexed', db: 'ChromaDB #cs601-v1', date: '2 days ago', tag: 'CS Dept' },
    { id: 'phy201', name: 'Physics_Quantum_Notes.pdf', chunks: 96, status: 'Indexed', db: 'ChromaDB #phy201-v2', date: '5 days ago', tag: 'Physics' },
    { id: 'os502', name: 'Operating_Systems_Concurrency.pptx', chunks: 84, status: 'Indexed', db: 'ChromaDB #os502-v1', date: '1 week ago', tag: 'CS Dept' },
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadNew = () => {
    setIsUploading(true);
    setTimeout(() => {
      setCollections(prev => [
        { id: `doc-${Date.now()}`, name: 'Algorithms_Graph_Theory.pdf', chunks: 112, status: 'Indexed', db: `ChromaDB #algo-${Math.floor(Math.random()*100)}`, date: 'Just now', tag: 'CS Dept' },
        ...prev
      ]);
      setIsUploading(false);
    }, 1200);
  };

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <BrainCircuit size={28} color="var(--accent-cyan)" />
            AI Knowledge Base & ChromaDB Vector Collections
          </span>
          <button className="btn btn-primary" onClick={handleUploadNew} disabled={isUploading}>
            <Upload size={16} />
            <span>{isUploading ? 'Chunking & Embedding...' : 'Upload Courseware (PDF/PPT)'}</span>
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)', maxWdith: '800px', fontSize: '0.95rem' }}>
          Upload semester course notes (PDF, PPT, DOCX) to automatically generate high-dimensional vector embeddings, text chunking, and semantic indexes via ChromaDB RAG Engine.
        </p>
      </div>

      {/* Vector Stats Bar */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Database size={24} />
          </div>
          <div className="stat-info">
            <h3>308 Chunks</h3>
            <p>Total Embedded Vectors</p>
            <span className="stat-trend trend-up">1536 Dimensions (Ada-002)</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
            <Layers size={24} />
          </div>
          <div className="stat-info">
            <h3>{collections.length} Collections</h3>
            <p>Active Subject Documents</p>
            <span className="stat-trend trend-up">Auto-synced</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <Cpu size={24} />
          </div>
          <div className="stat-info">
            <h3>&lt; 45ms</h3>
            <p>Vector Retrieval Latency</p>
            <span className="stat-trend trend-up">Cosine Similarity</span>
          </div>
        </div>
      </div>

      {/* Indexed Document Collections */}
      <div className="glass-card">
        <div className="section-header">
          <span className="section-title">
            <FileText size={20} color="var(--accent-primary)" />
            Active Vector Store Collections
          </span>
          <span className="rag-pill">ChromaDB Engine</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {collections.map(item => (
            <div key={item.id} className="glass-card interactive" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="badge-item" style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', background: 'rgba(99,102,241,0.2)', color: 'var(--accent-primary)' }}>
                  {item.tag}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <CheckCircle size={12} /> {item.status}
                </span>
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>{item.name}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {item.chunks} Vector Chunks • {item.db}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span>{item.date}</span>
                <button className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>Query Vector</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
