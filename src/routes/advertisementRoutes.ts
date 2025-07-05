import express from 'express';
import {
  getAdvertisementById,
  getAdvertisements,
  addAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  updateAdvertisementStatusById
} from '../controllers/advertisementController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getAdvertisements)
  .post(protect, addAdvertisement);

router.route('/:id')
  .get(getAdvertisementById)
  .put(protect, updateAdvertisement)
  .patch(protect, updateAdvertisementStatusById)
  .delete(protect, deleteAdvertisement);

export default router;