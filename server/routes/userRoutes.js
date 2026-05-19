import express from 'express';
import { getStudents, getUserProfile, importStudents } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/students', protect, adminOnly, getStudents);
router.post('/students/upload', protect, adminOnly, upload.single('file'), importStudents);
router.get('/profile', protect, getUserProfile);

export default router;
