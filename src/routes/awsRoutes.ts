import express from 'express';
import { generatePresignedUrl } from '../controllers/awsController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.post('/upload', protect, admin, generatePresignedUrl);

export default router;