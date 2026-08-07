import express from 'express';
import {
  generateQuiz,
  submitQuizAttempt,
  getQuizHistory,
  getFlashcards,
} from '../controllers/quizController.js';

const router = express.Router();

router.post('/generate', generateQuiz);
router.post('/attempt', submitQuizAttempt);
router.get('/history', getQuizHistory);
router.get('/flashcards', getFlashcards);

export default router;
