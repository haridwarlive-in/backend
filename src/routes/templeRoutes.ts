import express from 'express';
import {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple
} from '../controllers/templeController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getTemples)
  .post(protect, createTemple);

router.route('/:id')
  .get(getTempleById)
  .put(protect, updateTemple)
  .delete(protect, deleteTemple);

export default router;