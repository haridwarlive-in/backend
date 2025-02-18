import express from 'express';
import { generatePresignedUrl } from '@/controllers/awsController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/upload')
  .post(protect, admin, generatePresignedUrl)

export default router;