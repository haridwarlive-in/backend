import express from 'express';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getNews)
  .post(protect, admin, createNews);

router.route('/:id')
  .get(getNewsById)
  .put(protect, admin, updateNews)
  .delete(protect, admin, deleteNews);

export default router;