import React, { useState, useEffect } from 'react';
import { Video, Calendar, UserCheck, Star, Clock, AlertTriangle, Sparkles, CheckCircle, XCircle, Link, Check, X, Users, MessageSquare, ShieldAlert } from 'lucide-react';
import { fetchTeachers, bookOfficeHourSession, fetchBookedSessions, updateSessionApproval } from '../services/teacherApi';
import { useAuth } from '../context/AuthContext';

export default function TeacherSessions() {
  const { user, role } = useAuth();

  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    subject: 'Data Structures',
    topic: 'B-Tree & Memory Allocation',
    date: 'Tomorrow, 3:00 PM',
    timeSlot: '3:00 PM - 3:45 PM',
    notes: 'Requesting office hour consultation following RAG AI low-confidence recommendation.',
  });

  // Teacher Recommendation Referral History
  const recHistory = [
    { id: 1, studentName: 'Aman Sharma', teacherName: 'Dr. Rajesh Verma', subject: 'Data Structures', triggerReason: 'Low RAG AI Confidence (48%) on B-Trees', date: 'Today, 10:15 AM' },
    { id: 2, studentName: 'Priya Patel', teacherName: 'Prof. Sunita Rao', subject: 'Database Systems', triggerReason: 'Low RAG AI Confidence (54%) on B-Tree Indexing', date: 'Yesterday, 4:30 PM' },
  ];

  // Peer Learning Requests
  const peerRequests = [
    { id: 101, studentName: 'Rohan Gupta', topic: 'Red-Black Tree Insertion Case 2', subject: 'Data Structures', status: 'OPEN', time: 'Today, 2:00 PM' },
    { id: 102, studentName: 'Sneha Verma', topic: 'LRU Page Replacement Algorithm', subject: 'Operating Systems', status: 'ACCEPTED', time: 'Tomorrow, 5:00 PM' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const tData = await fetchTeachers();
    if (tData) setTeachers(tData);

    const sData = await fetchBookedSessions();
    if (sData) setSessions(sData);
  };

  const handleOpenBooking = (teacher) => {
    setSelectedTeacher(teacher);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        teacherName: selectedTeacher ? selectedTeacher.name : 'Dr. Rajesh Verma',
        ...bookingForm,
      };
      await bookOfficeHourSession(payload);
      setBookingSuccess(true);
      loadData();

      setTimeout(() => {
        setShowBookingModal(false);
        setBookingSuccess(false);
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSessionAction = async (sessionId, status) => {
    await updateSessionApproval(sessionId, status);
    loadData();
  };

  const displayTeachers = teachers.length > 0 ? teachers : [
    { id: 1, name: 'Dr. Rajesh Verma', department: 'Computer Science', designation: 'Professor & Head of AI Lab', qualification: 'Ph.D in AI & Algorithms', rating: 4.9, reviewCount: 42, officeHours: 'Mon - Wed 2:00 PM - 4:00 PM', googleMeetLink: 'https://meet.google.com/abc-defg-hij', subjects: ['Data Structures', 'Operating Systems', 'Machine Learning'], reviewSnippet: '"Extremely clear explanations on BST balancing and memory management!"' },
    { id: 2, name: 'Prof. Sunita Rao', department: 'Computer Science', designation: 'Associate Professor', qualification: 'Ph.D in Database Systems', rating: 4.8, reviewCount: 31, officeHours: 'Tue - Thu 11:00 AM - 1:00 PM', googleMeetLink: 'https://meet.google.com/xyz-uvwx-rst', subjects: ['Database Systems', 'System Design'], reviewSnippet: '"Helped me resolve my SQL join optimization query during office hours."' },
    { id: 3, name: 'Dr. V. K. Singh', department: 'Electrical Eng.', designation: 'Professor', qualification: 'Ph.D in Signal Processing', rating: 4.7, reviewCount: 25, officeHours: 'Fri 10:00 AM - 12:00 PM', googleMeetLink: 'https://meet.google.com/ece-meet-link', subjects: ['Computer Networks', 'Digital Communications'], reviewSnippet: '"Great 1-on-1 session reviewing TCP 3-way handshake packet headers."' },
  ];

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div className="section-header">
          <span className="section-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Video size={28} color="var(--accent-emerald)" />
            Faculty Mentorship, Session Booking & Peer Learning
          </span>
          <span className="badge-item" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)' }}>
            Google Meet 1-on-1 Office Hours
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Book Google Meet sessions with professors, view faculty approvals, track recommendation history, and manage peer learning requests.
        </p>
      </div>

      {/* Teacher Approvals Tab for TEACHER role */}
      {role === 'TEACHER' && (
        <div className="glass-card" style={{ border: '2px solid var(--accent-color)' }}>
          <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
            <UserCheck size={20} />
            <span>Faculty Session Approval Portal</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {sessions.map((sess, idx) => (
              <div key={sess._id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{sess.studentName} — {sess.subject}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Topic: {sess.topic} • Date: {sess.date}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Notes: {sess.notes}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: sess.status === 'APPROVED' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)', color: sess.status === 'APPROVED' ? '#10b981' : '#f59e0b' }}>
                    {sess.status}
                  </span>

                  {sess.status === 'PENDING' && (
                    <>
                      <button className="btn btn-primary" onClick={() => handleSessionAction(sess._id, 'APPROVED')} style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                        <Check size={14} /> Approve
                      </button>
                      <button className="btn btn-secondary" onClick={() => handleSessionAction(sess._id, 'REJECTED')} style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: '#ef4444' }}>
                        <X size={14} /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        {/* Faculty Directory Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {displayTeachers.map((t, idx) => (
            <div key={t._id || idx} className="glass-card interactive" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <img 
                    src={t.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"} 
                    alt={t.name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span className="badge-item" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', fontSize: '0.75rem' }}>
                    ⭐ {t.rating} ({t.reviewCount || 38} reviews)
                  </span>
                </div>

                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{t.name}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  {t.designation} • {t.department}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                  🎓 {t.qualification || 'Ph.D in Computer Science'}
                </div>

                {/* Subject Mapping */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                  {t.subjects?.map((sub, sIdx) => (
                    <span key={sIdx} style={{ fontSize: '0.72rem', padding: '2px 6px', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-color)' }}>
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Office Hours Availability */}
                <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'var(--bg-tertiary)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  🕒 <strong>Office Hours:</strong> {t.officeHours}
                </div>

                {/* Student Review Snippet */}
                <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-muted)', background: 'var(--bg-glass)', padding: '0.5rem', borderRadius: '6px' }}>
                  💬 {t.reviewSnippet || '"Very supportive during office hours!"'}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={t.googleMeetLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Link size={14} /> Google Meet
                </a>
                <button className="btn btn-primary" onClick={() => handleOpenBooking(t)} style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Side Panel: Recommendation History & Peer Learning Requests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Peer Learning Requests Card */}
          <div className="glass-card">
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)' }}>
              <Users size={18} />
              <span>Peer Learning Requests</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {peerRequests.map((pr) => (
                <div key={pr.id} style={{ padding: '0.65rem 0.75rem', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--primary-color)' }}>{pr.studentName}</strong>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '1px 6px', borderRadius: '10px', background: pr.status === 'ACCEPTED' ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.2)', color: pr.status === 'ACCEPTED' ? '#10b981' : 'var(--primary-color)' }}>
                      {pr.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-color)' }}>{pr.topic} ({pr.subject})</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>🕒 {pr.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Recommendation History */}
          <div className="glass-card" style={{ border: '1px solid rgba(236, 72, 153, 0.4)' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ec4899' }}>
              <ShieldAlert size={18} />
              <span>Teacher Recommendation History</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {recHistory.map((item) => (
                <div key={item.id} style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#f472b6' }}>{item.teacherName}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.date}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Student: <strong>{item.studentName}</strong> • {item.subject}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#ec4899', marginTop: '3px' }}>
                    ⚠️ {item.triggerReason}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                <Calendar style={{ color: 'var(--primary-color)' }} />
                <span>Book Session with {selectedTeacher?.name}</span>
              </h3>
              <button className="icon-btn" onClick={() => setShowBookingModal(false)}>
                <X size={18} />
              </button>
            </div>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#10b981' }}>
                <CheckCircle size={48} style={{ margin: '0 auto 0.75rem auto', display: 'block' }} />
                <h4 style={{ margin: 0 }}>Session Booking Requested!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                  Your request has been sent to {selectedTeacher?.name}. You will receive Google Meet notification upon approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Subject Name</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.subject}
                    onChange={e => setBookingForm({ ...bookingForm, subject: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Doubt Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Binary Search Tree Balancing & Memory Allocation"
                    value={bookingForm.topic}
                    onChange={e => setBookingForm({ ...bookingForm, topic: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Date</label>
                    <input
                      type="text"
                      value={bookingForm.date}
                      onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Time Slot</label>
                    <input
                      type="text"
                      value={bookingForm.timeSlot}
                      onChange={e => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>Consultation Notes</label>
                  <textarea
                    rows={3}
                    value={bookingForm.notes}
                    onChange={e => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)', fontFamily: 'inherit' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.7rem', justifyContent: 'center', fontWeight: 600 }}>
                  Confirm Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
