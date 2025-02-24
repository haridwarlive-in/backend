import express from "express";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  getBookingsByHotelId,
  updateBooking,
  updateBookingStatus,
} from "../controllers/bookingController";
import { protect, admin } from "../middleware/auth";

const router = express.Router();

router.route("/")
  .get(protect, getBookings)
  .post(createBooking);

router
  .route("/:id")
  .get(protect, getBookingById)
  .put(protect, admin, updateBooking)
  .delete(protect, admin, deleteBooking);

router.get('/hotel/:id', protect, getBookingsByHotelId)

router
  .route("/:id/status")
  .put(protect, updateBookingStatus)

export default router;
