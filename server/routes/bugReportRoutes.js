import express from 'express';
import { getBugReports, submitBugReport, updateBugReportStatus } from '../controllers/bugReportController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getBugReports);
router.post('/', protect, submitBugReport);
router.put('/:id', protect, adminOnly, updateBugReportStatus);

export default router;
