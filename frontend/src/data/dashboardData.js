import { 
  FileText, 
  CheckSquare, 
  Target, 
  Clock, 
  Flame, 
  BookOpen, 
  UserCheck, 
  Layers, 
  Database, 
  Cpu, 
  Globe 
} from 'lucide-react';

export const STAT_CARDS_DATA = [
  {
    id: 'notes',
    title: 'Notes Uploaded',
    value: '48',
    trend: '+12 this week',
    icon: FileText,
    accentColor: '#6366f1',
    bgColor: '#EEF2FF'
  },
  {
    id: 'quizzes',
    title: 'Quizzes Taken',
    value: '32',
    trend: '+8 this week',
    icon: CheckSquare,
    accentColor: '#10b981',
    bgColor: '#ECFDF5'
  },
  {
    id: 'score',
    title: 'Avg. Score',
    value: '78%',
    trend: '+6% this week',
    icon: Target,
    accentColor: '#f59e0b',
    bgColor: '#FFFBEB'
  },
  {
    id: 'time',
    title: 'Study Time',
    value: '24h 30m',
    trend: '+5h this week',
    icon: Clock,
    accentColor: '#3b82f6',
    bgColor: '#EFF6FF'
  },
  {
    id: 'streak',
    title: 'Current Streak',
    value: '12 Days',
    trend: 'Keep it up! 🔥',
    icon: Flame,
    accentColor: '#ec4899',
    bgColor: '#FDF2F8'
  }
];

export const TIMEFRAME_CHART_DATA = {
  'This Week': {
    days: ['May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17', 'May 18'],
    score: [45, 54, 62, 68, 72, 80, 88],
    confidence: [35, 38, 48, 47, 56, 62, 70]
  },
  'Last Week': {
    days: ['May 05', 'May 06', 'May 07', 'May 08', 'May 09', 'May 10', 'May 11'],
    score: [40, 48, 52, 60, 65, 70, 78],
    confidence: [30, 35, 40, 42, 48, 55, 62]
  },
  'This Month': {
    days: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    score: [55, 68, 75, 88],
    confidence: [42, 52, 60, 70]
  }
};

export const WEAK_TOPICS_DATA = [
  { name: 'Data Structures', percent: 35, color: 'linear-gradient(90deg, #f43f5e 0%, #fb7185 100%)', text: '#f43f5e' },
  { name: 'Operating Systems', percent: 45, color: 'linear-gradient(90deg, #f97316 0%, #fb923c 100%)', text: '#f97316' },
  { name: 'DBMS', percent: 50, color: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)', text: '#f59e0b' },
  { name: 'Computer Networks', percent: 60, color: 'linear-gradient(90deg, #0d9488 0%, #14b8a6 100%)', text: '#0d9488' },
  { name: 'OOP Concepts', percent: 70, color: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)', text: '#10b981' }
];

export const RECENT_NOTES_DATA = [
  { id: 1, title: 'DBMS - Normalization.pdf', sub: 'Database Management Systems', time: '2h ago' },
  { id: 2, title: 'Operating Systems - Notes.pdf', sub: 'Operating Systems', time: '1d ago' },
  { id: 3, title: 'Computer Networks - Unit 2.pdf', sub: 'Computer Networks', time: '2d ago' },
  { id: 4, title: 'DSA - Trees and Graphs.pdf', sub: 'Data Structures & Algorithms', time: '3d ago' }
];

export const UPCOMING_SESSIONS_DATA = [
  {
    id: 1,
    title: 'DBMS Doubt Session',
    teacher: 'Prof. Neha Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
    date: 'May 20, 2024',
    time: '10:00 AM',
    color: 'var(--accent-emerald)'
  },
  {
    id: 2,
    title: 'Operating Systems Help',
    teacher: 'Prof. Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80',
    date: 'May 21, 2024',
    time: '02:00 PM',
    color: 'var(--accent-primary)'
  },
  {
    id: 3,
    title: 'DSA Practice Session',
    teacher: 'Prof. Amit Singh',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80',
    date: 'May 22, 2024',
    time: '04:00 PM',
    color: 'var(--accent-amber)'
  }
];

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'Rahul Singh', score: 1250, badgeClass: 'rank-1' },
  { rank: 2, name: 'Priya Sharma', score: 1180, badgeClass: 'rank-2' },
  { rank: 3, name: 'Aman Verma (You)', score: 1050, badgeClass: 'rank-3', isUser: true },
  { rank: 4, name: 'Karan Patel', score: 980, badgeClass: 'rank-other' },
  { rank: 5, name: 'Neha Gupta', score: 870, badgeClass: 'rank-other' }
];

export const CONTINUE_LEARNING_DATA = [
  {
    id: 1,
    title: 'Data Structures',
    sub: 'Linked Lists',
    progress: 60,
    icon: Layers,
    accentColor: '#6366f1',
    bgColor: '#EEF2FF',
    gradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)'
  },
  {
    id: 2,
    title: 'DBMS',
    sub: 'SQL Queries',
    progress: 45,
    icon: Database,
    accentColor: '#10b981',
    bgColor: '#ECFDF5',
    gradient: 'linear-gradient(90deg, #10b981, #06b6d4)'
  },
  {
    id: 3,
    title: 'Operating Systems',
    sub: 'Process Scheduling',
    progress: 30,
    icon: Cpu,
    accentColor: '#f59e0b',
    bgColor: '#FFFBEB',
    gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)'
  },
  {
    id: 4,
    title: 'Computer Networks',
    sub: 'TCP/IP Model',
    progress: 50,
    icon: Globe,
    accentColor: '#3b82f6',
    bgColor: '#EFF6FF',
    gradient: 'linear-gradient(90deg, #3b82f6, #6366f1)'
  }
];
