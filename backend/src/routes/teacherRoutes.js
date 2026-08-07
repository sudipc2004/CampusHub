import express from 'express';
import {
  getAllTeachers,
  bookSession,
  getSessions,
  updateSessionStatus,
  getWeakTopicAnalysis,
} from '../controllers/teacherController.js';

const router = express.Router();

router.get('/', getAllTeachers);
router.post('/book', bookSession);
router.get('/sessions', getSessions);
router.patch('/sessions/:id/status', updateSessionStatus);
router.get('/agent/weak-topics', getWeakTopicAnalysis);

export default router;
