import express from 'express';
import { getAbsences, toggleAbsence } from '../controllers/absenceController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getAbsences);

router.route('/toggle')
  .post(protect, adminOnly, toggleAbsence);

export default router;
