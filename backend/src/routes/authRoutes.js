import express from 'express';
import {
  registerStudent,
  registerTeacher,
  registerAdmin,
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  approveTeacher,
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Auth Endpoints
router.post('/register/student', registerStudent);
router.post('/register/teacher', registerTeacher);
router.post('/register/admin', registerAdmin);
router.post('/login', login);

// Private User Profile Endpoints (STUDENT, TEACHER, ADMIN)
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin Only RBAC Endpoints
router.get('/admin/users', protect, authorize('ADMIN'), getAllUsers);
router.patch('/admin/approve-teacher/:id', protect, authorize('ADMIN'), approveTeacher);

export default router;
