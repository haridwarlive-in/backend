import express from 'express';
import {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  hotelLogin
} from '../controllers/hotelController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(getHotels)
  .post(protect, admin, createHotel);

router.route('/:id')
  .get(getHotelById)
  .put(protect, updateHotel)
  .delete(protect, admin, deleteHotel);

router.route('/auth')
  .post(hotelLogin)

export default router;