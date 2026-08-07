import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Plus, Globe, Send, Sparkles, X, CheckCircle, ThumbsUp, Share2, Search, UserCheck, Heart } from 'lucide-react';
import { fetchStudyGroups, createStudyGroupApi, postGroupMessageApi } from '../services/socialApi';
import { useAuth } from '../context/AuthContext';

export default function StudyGroups() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('groups'); // 'groups' or 'feed'
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [msgInput, setMsgInput] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Search & Follow Teachers State
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [followedTeachers, setFollowedTeachers] = useState(['Dr. Rajesh Verma']);

  // Shared Notes Feed State
  const [feedPosts, setFeedPosts] = useState([
    { id: 1, author: 'Dr. Sunita Rao (Teacher)', role: 'TEACHER', title: 'Unit 3 B-Tree Balancing & Node Splitting Cheatsheet', likes: 48, commentsCount: 12, isLiked: false, text: 'Uploaded clean diagrammatic breakdown of B-Tree node splitting algorithms for Sem 6 midterm revision.' },
    { id: 2, author: 'Aman Sharma', role: 'STUDENT', title: 'Operating Systems Banker Algorithm Numerical Shortcuts', likes: 35, commentsCount: 8, isLiked: true, text: 'Here are 3 quick steps to verify safe sequences during Banker Deadlock avoidance calculations.' },
  ]);
  const [commentInputs, setCommentInputs] = useState({});

  const facultyMembers = [
    { name: 'Dr. Rajesh Verma', dept: 'Computer Science', designation: 'Professor' },
    { name: 'Prof. Sunita Rao', dept: 'Computer Science', designation: 'Associate Professor' },
    { name: 'Dr. V. K. Singh', dept: 'Electrical Eng.', designation: 'Professor' },
  ];

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const data = await fetchStudyGroups();
    if (data && data.length > 0) {
      setGroups(data);
      setActiveGroup(data[0]);
    } else {
      const fallback = [
        {
          _id: 'grp_01',
          name: 'CS601 Data Structures Masters',
          department: 'Computer Science',
          subject: 'Data Structures',
          description: 'Channel for discussing B-Trees, AVL rotation algorithms, and mid-term exam prep.',
          memberCount: 24,
          discussions: [
            { senderName: 'Priya Patel', senderRole: 'STUDENT', text: 'Does anyone have clean notes on Red-Black tree deletion cases?' },
            { senderName: 'Aman Sharma', senderRole: 'STUDENT', text: 'Yes! Check out Unit 3 notes in the Academic Notes repository.' }
          ]
        },
        {
          _id: 'grp_02',
          name: 'OS502 Concurrency & Kernel Room',
          department: 'Computer Science',
          subject: 'Operating Systems',
          description: 'Deep dive into Bankers Deadlock Avoidance and Virtual Memory Page Replacement.',
          memberCount: 19,
          discussions: [
            { senderName: 'Rohan Gupta', senderRole: 'STUDENT', text: 'Can someone explain how LRU page replacement handles dirty bits?' }
          ]
        }
      ];
      setGroups(fallback);
      setActiveGroup(fallback[0]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!msgInput.trim() || !activeGroup) return;

    const newMsg = {
      senderName: user ? user.name : 'Aman Sharma',
      senderRole: user ? user.role : 'STUDENT',
      text: msgInput,
      timestamp: new Date(),
    };

    setActiveGroup(prev => ({
      ...prev,
      discussions: [...(prev.discussions || []), newMsg],
    }));

    const textToSubmit = msgInput;
    setMsgInput('');

    await postGroupMessageApi(activeGroup._id, textToSubmit);
  };

  const handleLikePost = (postId) => {
    setFeedPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p)
    );
  };

  const toggleFollowTeacher = (name) => {
    setFollowedTeachers(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    );
  };

  return (
    <div className="dashboard-view">
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="section-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={28} color="var(--accent-primary)" />
              Social Learning, Notes Feed & Peer Study Groups
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '0.3rem 0 0 0' }}>
              Engage in academic discussions, share notes feed posts, follow domain faculty, and collaborate in peer study rooms.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={`btn ${activeTab === 'groups' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('groups')}>
              Study Groups
            </button>
            <button className={`btn ${activeTab === 'feed' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('feed')}>
              Notes Feed
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'groups' ? (
        <div className="dashboard-grid">
          {/* Study Groups Directory */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-muted)' }}>ACTIVE STUDY ROOMS</h4>
              <button className="btn btn-primary" onClick={() => setShowCreateModal(true)} style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}>
                <Plus size={14} /> Create Room
              </button>
            </div>

            {groups.map(g => (
              <div
                key={g._id}
                onClick={() => setActiveGroup(g)}
                className="glass-card interactive"
                style={{
                  borderLeft: activeGroup?._id === g._id ? '4px solid var(--primary-color)' : '1px solid var(--border-color)',
                  background: activeGroup?._id === g._id ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-glass)',
                  padding: '0.85rem 1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span className="badge-item" style={{ fontSize: '0.72rem', background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>
                    {g.department} • {g.subject}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>👥 {g.memberCount || 18}</span>
                </div>
                <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.2rem 0' }}>{g.name}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {g.description}
                </p>
              </div>
            ))}
          </div>

          {/* Live Channel Discussion Chat Box */}
          {activeGroup && (
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '540px' }}>
              <div style={{ paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--primary-color)' }}>{activeGroup.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{activeGroup.description}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>● Live Discussion</span>
              </div>

              {/* Messages Stream */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {activeGroup.discussions && activeGroup.discussions.length > 0 ? (
                  activeGroup.discussions.map((msg, idx) => (
                    <div key={idx} style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <strong style={{ fontSize: '0.82rem', color: 'var(--primary-color)' }}>{msg.senderName} ({msg.senderRole || 'STUDENT'})</strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', margin: 0, color: 'var(--text-color)', lineHeight: 1.4 }}>{msg.text}</p>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No messages yet. Start the conversation in {activeGroup.name}!
                  </div>
                )}
              </div>

              {/* Post Message Input Form */}
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
                <input
                  type="text"
                  placeholder={`Post message to ${activeGroup.name}...`}
                  value={msgInput}
                  onChange={e => setMsgInput(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)', fontSize: '0.88rem' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1rem' }}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        /* Notes Feed & Follow Teachers View */
        <div className="dashboard-grid">
          {/* Notes Feed Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {feedPosts.map(post => (
              <div key={post.id} className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>{post.author}</strong>
                    <span className="badge-item" style={{ fontSize: '0.72rem', background: post.role === 'TEACHER' ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.2)', color: post.role === 'TEACHER' ? '#10b981' : 'var(--primary-color)' }}>
                      {post.role}
                    </span>
                  </div>
                </div>

                <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.4rem 0' }}>{post.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.85rem' }}>
                  {post.text}
                </p>

                {/* Actions: Upvote, Comment, Share */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    style={{ background: 'none', border: 'none', color: post.isLiked ? '#ef4444' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}
                  >
                    <ThumbsUp size={16} fill={post.isLiked ? "#ef4444" : "none"} /> {post.likes} Upvotes
                  </button>

                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem' }}>
                    <MessageSquare size={16} /> {post.commentsCount} Comments
                  </button>

                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem' }}>
                    <Share2 size={16} /> Share Link
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Search Users & Follow Teachers Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-card">
              <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Search size={18} color="var(--primary-color)" />
                <span>Search Users & Follow Teachers</span>
              </h4>

              <input
                type="text"
                placeholder="Search faculty or students..."
                value={userSearchTerm}
                onChange={e => setUserSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-color)', fontSize: '0.85rem', marginBottom: '0.85rem' }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {facultyMembers.map((fac, idx) => {
                  const isFollowing = followedTeachers.includes(fac.name);
                  return (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'var(--bg-tertiary)' }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{fac.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{fac.designation} • {fac.dept}</div>
                      </div>
                      <button
                        onClick={() => toggleFollowTeacher(fac.name)}
                        className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                      >
                        {isFollowing ? 'Following' : '+ Follow'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
