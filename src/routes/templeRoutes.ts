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
  .post(protect, admin, createTemple);

router.route('/:id')
  .get(getTempleById)
  .put(protect, admin, updateTemple)
  .delete(protect, admin, deleteTemple);

export default router;