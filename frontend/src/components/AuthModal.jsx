import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, GraduationCap, Key, Lock, Mail, User, BookOpen, Clock, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ show, onClose }) {
  const { login, registerStudent, registerTeacher, registerAdmin, authLoading, authError } = useAuth();
  
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState('STUDENT'); // 'STUDENT' | 'TEACHER' | 'ADMIN'
  const [errorMsg, setErrorMsg] = useState('');

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Computer Science',
    semester: 6,
    skills: 'Data Structures, Python, React',
    interests: 'Artificial Intelligence, Web Dev',
    qualification: 'M.Tech / Ph.D in CS',
    expertise: 'Algorithms, Machine Learning',
    subjectsTaught: 'Data Structures, Operating Systems',
    officeHours: 'Mon-Wed 2:00 PM - 4:00 PM',
    adminSecret: 'CAMPUSHUB_ADMIN_2026',
  });

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password, role);
      } else {
        if (role === 'STUDENT') {
          await registerStudent({
            ...formData,
            semester: Number(formData.semester),
            skills: formData.skills.split(',').map(s => s.trim()),
            interests: formData.interests.split(',').map(i => i.trim()),
          });
        } else if (role === 'TEACHER') {
          await registerTeacher({
            ...formData,
            expertise: formData.expertise.split(',').map(s => s.trim()),
            subjectsTaught: formData.subjectsTaught.split(',').map(s => s.trim()),
          });
        } else if (role === 'ADMIN') {
          await registerAdmin({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            adminSecret: formData.adminSecret,
          });
        }
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check inputs.');
    }
  };

  const handleQuickDemoRole = (demoRole) => {
    setRole(demoRole);
    if (demoRole === 'STUDENT') {
      setFormData(prev => ({
        ...prev,
        name: 'Aman Sharma',
        email: 'aman.student@campushub.edu',
        password: 'password123',
        department: 'Computer Science',
      }));
    } else if (demoRole === 'TEACHER') {
      setFormData(prev => ({
        ...prev,
        name: 'Dr. Rajesh Verma',
        email: 'rajesh.verma@campushub.edu',
        password: 'password123',
        department: 'Computer Science',
      }));
    } else if (demoRole === 'ADMIN') {
      setFormData(prev => ({
        ...prev,
        name: 'System Admin',
        email: 'admin@campushub.edu',
        password: 'password123',
        department: 'Administration',
        adminSecret: 'CAMPUSHUB_ADMIN_2026',
      }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', padding: '1.75rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.35rem' }}>
              <ShieldCheck style={{ color: 'var(--primary-color)' }} />
              <span>CampusHub Security Portal</span>
            </h2>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Sign in or create an account with Role-Based Access Control (RBAC)
            </p>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Auth Mode Toggle (Login vs Signup) */}
        <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: '8px', padding: '4px', marginBottom: '1.25rem' }}>
          <button
            type="button"
            className={`btn ${mode === 'login' ? 'btn-primary' : ''}`}
            onClick={() => setMode('login')}
            style={{ flex: 1, padding: '0.45rem', fontSize: '0.9rem', justifyContent: 'center' }}
          >
            Log In
          </button>
          <button
            type="button"
            className={`btn ${mode === 'signup' ? 'btn-primary' : ''}`}
            onClick={() => setMode('signup')}
            style={{ flex: 1, padding: '0.45rem', fontSize: '0.9rem', justifyContent: 'center' }}
          >
            Create Account
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            SELECT YOUR ACCESS ROLE:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleQuickDemoRole('STUDENT')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.6rem 0.4rem',
                borderRadius: '8px',
                border: role === 'STUDENT' ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                background: role === 'STUDENT' ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-secondary)',
                color: role === 'STUDENT' ? 'var(--primary-color)' : 'var(--text-color)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <GraduationCap size={18} />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoRole('TEACHER')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.6rem 0.4rem',
                borderRadius: '8px',
                border: role === 'TEACHER' ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                background: role === 'TEACHER' ? 'rgba(236, 72, 153, 0.15)' : 'var(--bg-secondary)',
                color: role === 'TEACHER' ? 'var(--accent-color)' : 'var(--text-color)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <UserCheck size={18} />
              <span>Teacher</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoRole('ADMIN')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.6rem 0.4rem',
                borderRadius: '8px',
                border: role === 'ADMIN' ? '2px solid #10b981' : '1px solid var(--border-color)',
                background: role === 'ADMIN' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                color: role === 'ADMIN' ? '#10b981' : 'var(--text-color)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <Lock size={18} />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.6rem 0.8rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          
          {mode === 'signup' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Aman Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.55rem 0.55rem 0.55rem 2.2rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Campus Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
              <input
                type="email"
                name="email"
                required
                placeholder={role === 'STUDENT' ? 'aman@campushub.edu' : role === 'TEACHER' ? 'rajesh@campushub.edu' : 'admin@campushub.edu'}
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.55rem 0.55rem 0.55rem 2.2rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.55rem 0.55rem 0.55rem 2.2rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
              />
            </div>
          </div>

          {/* Role specific fields on Signup */}
          {mode === 'signup' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Eng.">Electrical Eng.</option>
                    <option value="Mechanical Eng.">Mechanical Eng.</option>
                    <option value="Information Tech.">Information Tech.</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>

                {role === 'STUDENT' && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Semester</label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    >
                      {[1,2,3,4,5,6,7,8].map(s => (
                        <option key={s} value={s}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {role === 'STUDENT' && (
                <>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Skills (comma separated)</label>
                    <input
                      type="text"
                      name="skills"
                      placeholder="Data Structures, Python, React"
                      value={formData.skills}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Interests (comma separated)</label>
                    <input
                      type="text"
                      name="interests"
                      placeholder="Artificial Intelligence, Web Dev"
                      value={formData.interests}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    />
                  </div>
                </>
              )}

              {role === 'TEACHER' && (
                <>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Qualification & Designation</label>
                    <input
                      type="text"
                      name="qualification"
                      placeholder="Ph.D in AI / Associate Professor"
                      value={formData.qualification}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Subjects Taught (comma separated)</label>
                    <input
                      type="text"
                      name="subjectsTaught"
                      placeholder="Data Structures, Operating Systems"
                      value={formData.subjectsTaught}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Office Hours Availability</label>
                    <input
                      type="text"
                      name="officeHours"
                      placeholder="Mon-Wed 2:00 PM - 4:00 PM"
                      value={formData.officeHours}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    />
                  </div>
                </>
              )}

              {role === 'ADMIN' && (
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Admin Secret Authorization Passcode</label>
                  <div style={{ position: 'relative' }}>
                    <Key size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                    <input
                      type="password"
                      name="adminSecret"
                      required
                      placeholder="CAMPUSHUB_ADMIN_2026"
                      value={formData.adminSecret}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.55rem 0.55rem 0.55rem 2.2rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={authLoading}
            style={{ width: '100%', padding: '0.7rem', justifyContent: 'center', marginTop: '0.5rem', fontWeight: 600 }}
          >
            {authLoading ? 'Processing JWT Authorization...' : mode === 'login' ? `Log In as ${role}` : `Create ${role} Account`}
          </button>
        </form>

        {/* Quick Demo Pre-fill Footer */}
        <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Demo Role Fast Switch:</span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => handleQuickDemoRole('STUDENT')} style={{ padding: '2px 6px', fontSize: '0.75rem' }}>Student</button>
            <button type="button" className="btn btn-secondary" onClick={() => handleQuickDemoRole('TEACHER')} style={{ padding: '2px 6px', fontSize: '0.75rem' }}>Teacher</button>
            <button type="button" className="btn btn-secondary" onClick={() => handleQuickDemoRole('ADMIN')} style={{ padding: '2px 6px', fontSize: '0.75rem' }}>Admin</button>
          </div>
        </div>

      </div>
    </div>
  );
}
