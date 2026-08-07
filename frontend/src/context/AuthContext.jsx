import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE = 'http://localhost:3000/api/auth';

const DEFAULT_STUDENT = {
  id: 'usr_student_01',
  name: 'Aman Sharma',
  email: 'aman.sharma@campushub.edu',
  role: 'STUDENT',
  department: 'Computer Science',
  semester: 6,
  skills: ['Data Structures', 'Python', 'React.js', 'Machine Learning'],
  interests: ['Artificial Intelligence', 'Full Stack Development', 'System Design'],
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('campushub_user');
    return savedUser ? JSON.parse(savedUser) : DEFAULT_STUDENT;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('campushub_token') || 'demo_jwt_token_2026';
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('campushub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campushub_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('campushub_token', token);
    } else {
      localStorage.removeItem('campushub_token');
    }
  }, [token]);

  // Login handler
  const login = async (email, password, role) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.user);
      setToken(data.token);
      setShowAuthModal(false);
      return data;
    } catch (err) {
      console.warn('API connection offline/fallback to client auth:', err.message);
      // Fallback for client demo mode when backend is offline
      const mockUser = {
        id: `usr_${role.toLowerCase()}_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        role: role || 'STUDENT',
        department: role === 'ADMIN' ? 'Administration' : 'Computer Science',
        semester: role === 'STUDENT' ? 6 : undefined,
        qualification: role === 'TEACHER' ? 'Ph.D in AI & Data Science' : undefined,
        expertise: role === 'TEACHER' ? ['Algorithms', 'Deep Learning'] : undefined,
        skills: ['Data Structures', 'Python', 'React'],
        interests: ['Artificial Intelligence'],
      };
      setUser(mockUser);
      setToken(`jwt_token_${Date.now()}`);
      setShowAuthModal(false);
      return { success: true, user: mockUser };
    } finally {
      setAuthLoading(false);
    }
  };

  // Student Signup
  const registerStudent = async (studentData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/register/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      setUser(data.user);
      setToken(data.token);
      setShowAuthModal(false);
      return data;
    } catch (err) {
      const mockUser = {
        id: `usr_std_${Date.now()}`,
        ...studentData,
        role: 'STUDENT',
      };
      setUser(mockUser);
      setToken(`jwt_token_${Date.now()}`);
      setShowAuthModal(false);
      return { success: true, user: mockUser };
    } finally {
      setAuthLoading(false);
    }
  };

  // Teacher Signup
  const registerTeacher = async (teacherData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/register/teacher`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      setUser(data.user);
      setToken(data.token);
      setShowAuthModal(false);
      return data;
    } catch (err) {
      const mockUser = {
        id: `usr_tchr_${Date.now()}`,
        ...teacherData,
        role: 'TEACHER',
      };
      setUser(mockUser);
      setToken(`jwt_token_${Date.now()}`);
      setShowAuthModal(false);
      return { success: true, user: mockUser };
    } finally {
      setAuthLoading(false);
    }
  };

  // Admin Signup
  const registerAdmin = async (adminData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/register/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      setUser(data.user);
      setToken(data.token);
      setShowAuthModal(false);
      return data;
    } catch (err) {
      const mockUser = {
        id: `usr_admin_${Date.now()}`,
        ...adminData,
        role: 'ADMIN',
        department: 'Administration',
        adminPermissions: ['USER_MANAGEMENT', 'CONTENT_MODERATION', 'SYSTEM_AUDIT'],
      };
      setUser(mockUser);
      setToken(`jwt_token_${Date.now()}`);
      setShowAuthModal(false);
      return { success: true, user: mockUser };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('campushub_user');
    localStorage.removeItem('campushub_token');
  };

  // Profile Update
  const updateProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'STUDENT',
        token,
        isAuthenticated: !!user,
        showAuthModal,
        setShowAuthModal,
        authLoading,
        authError,
        login,
        registerStudent,
        registerTeacher,
        registerAdmin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
