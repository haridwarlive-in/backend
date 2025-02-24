import express from 'express';
import {
  getQueries,
  createQuery,
  updateQueryStatus
} from '../controllers/queryController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getQueries)
  .post(createQuery);

router.route('/:id/status')
  .put(protect, admin, updateQueryStatus);

export default router;