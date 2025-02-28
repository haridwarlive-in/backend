import express from 'express';
import { generatePresignedUrl } from '../controllers/awsController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/generate-presigned-url', protect, generatePresignedUrl);

export default router;