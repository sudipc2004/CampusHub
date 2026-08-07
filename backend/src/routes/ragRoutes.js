import express from 'express';
import { askAiTutor, searchSemantic, getVectorStats } from '../controllers/ragController.js';

const router = express.Router();

router.post('/ask', askAiTutor);
router.post('/search', searchSemantic);
router.get('/stats', getVectorStats);

export default router;
