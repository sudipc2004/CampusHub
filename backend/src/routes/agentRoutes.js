import express from 'express';
import {
  getTeacherRec,
  getWeakTopics,
  getStudyRec,
  getRevisionPlanner,
  getExamPredictor,
  getLearningInsights,
} from '../controllers/agentController.js';

const router = express.Router();

router.get('/teacher-recommendation', getTeacherRec);
router.get('/weak-topics', getWeakTopics);
router.get('/study-recommendations', getStudyRec);
router.get('/revision-planner', getRevisionPlanner);
router.get('/exam-predictor', getExamPredictor);
router.get('/learning-insights', getLearningInsights);

export default router;
