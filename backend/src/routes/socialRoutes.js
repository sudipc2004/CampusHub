import express from 'express';
import {
  getStudyGroups,
  createStudyGroup,
  postGroupMessage,
  getLeaderboard,
} from '../controllers/socialController.js';

const router = express.Router();

router.get('/groups', getStudyGroups);
router.post('/groups', createStudyGroup);
router.post('/groups/:id/message', postGroupMessage);
router.get('/leaderboard', getLeaderboard);

export default router;
