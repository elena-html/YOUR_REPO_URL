import express from 'express';
import { getJustifications, submitJustification, updateJustificationStatus } from '../controllers/justificationController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', protect, getJustifications);
router.post('/', protect, upload.single('file'), submitJustification);
router.put('/:id', protect, adminOnly, updateJustificationStatus);

export default router;
