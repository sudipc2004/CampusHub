import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import ragRoutes from './routes/ragRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import socialRoutes from './routes/socialRoutes.js';
import agentRoutes from './routes/agentRoutes.js';

dotenv.config();

// Initialize MongoDB connection
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/agents', agentRoutes);

// Root Check Endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎓 CampusHub Full Suite & Agentic AI Engine is Running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      notes: '/api/notes',
      rag: '/api/rag',
      teachers: '/api/teachers',
      quizzes: '/api/quizzes',
      social: '/api/social',
      agents: '/api/agents',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route not found' });
});

export default app;