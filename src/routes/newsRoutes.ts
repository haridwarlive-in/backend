import express from 'express';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getBreakingNews,
  getNewsByCategory,
  incrementNewsClick,
  getTrendingNews,
  getNewsByTitle
} from '../controllers/newsController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getNews)
  .post(protect, createNews);

router.get('/breaking-news', getBreakingNews);
router.get('/trending-news', getTrendingNews)

router.get('/category/:category', getNewsByCategory);
router.get('/title/:title', getNewsByTitle)
router.put('/:id/click', incrementNewsClick);

router.route('/:id')
  .get(getNewsById)
  .put(protect, updateNews)
  .delete(protect, deleteNews);

export default router;