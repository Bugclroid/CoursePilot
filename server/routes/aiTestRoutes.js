import express from 'express';
import { analyzeText } from '../controllers/aiTestController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/test', protect, admin, analyzeText);

export default router;