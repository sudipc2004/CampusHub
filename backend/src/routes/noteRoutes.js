import express from 'express';
import { uploadNote, getAllNotes, getNoteById, upvoteNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/upload', uploadNote);
router.post('/:id/upvote', upvoteNote);

export default router;
