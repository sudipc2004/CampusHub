import express from 'express';
import { solveDoubt } from '../controllers/doubtSolverController.js';

const router = express.Router();

router.post('/', solveDoubt);

export default router;
