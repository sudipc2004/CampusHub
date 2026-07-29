import React from 'react';
import { ShieldCheck, Lock, Key, Server, AlertCircle, CheckCircle, FileText } from 'lucide-react';

export default function SecurityAudit() {
  const auditLogs = [
    { id: 1, action: 'JWT Auth Refresh', user: 'alex.sharma@campushub.edu', ip: '192.168.1.104', status: 'Success', timestamp: '10:14:02 AM' },
    { id: 2, action: 'Vector DB Chunk Access', user: 'alex.sharma@campushub.edu', ip: '192.168.1.104', status: 'Authorized', timestamp: '10:15:30 AM' },
    { id: 3, action: 'Role RBAC Verification (Student)', user: 'alex.sharma@campushub.edu', ip: '192.168.1.104', status: 'Passed', timestamp: '10:18:12 AM' },
    { id: 4, action: 'RAG Doubt Query Encryption (TLS 1.3)', user: 'alex.sharma@campushub.edu', ip: '192.168.1.104', status: 'Success', timestamp: '10:20:45 AM' },
  ];

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem' }}>
            <ShieldCheck size={28} color="var(--accent-rose)" />
            Security, Role-Based Access Control (RBAC) & Audit Logs
          </span>
          <span className="badge-item" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)' }}>
            Enterprise Protected
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time JWT authentication monitoring, rate limiting throttles, MongoDB enterprise access controls, and immutable security audit trails.
        </p>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <Lock size={24} />
          </div>
          <div className="stat-info">
            <h3>256-Bit SSL</h3>
            <p>TLS 1.3 Encryption</p>
            <span className="stat-trend trend-up">Active In-Transit</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
            <Key size={24} />
          </div>
          <div className="stat-info">
            <h3>JWT Tokens</h3>
            <p>Auth Expiry: 15 mins</p>
            <span className="stat-trend trend-up">HttpOnly Secure Cookie</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Server size={24} />
          </div>
          <div className="stat-info">
            <h3>MongoDB Security</h3>
            <p>Encrypted Storage</p>
            <span className="stat-trend trend-up">RBAC Policy Enforced</span>
          </div>
        </div>
      </div>

      {/* Security Audit Table */}
      <div className="glass-card">
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <span className="section-title">
            <FileText size={20} color="var(--accent-rose)" />
            Real-time Security Audit Log Stream
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-refreshed via WebSockets</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {auditLogs.map(log => (
            <div key={log.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              fontSize: '0.88rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} color="var(--accent-emerald)" />
                <div>
                  <div style={{ fontWeight: 600 }}>{log.action}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.user} • IP: {log.ip}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="badge-item" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', fontSize: '0.72rem' }}>
                  {log.status}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
