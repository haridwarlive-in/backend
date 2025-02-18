import express from "express";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking,
  updateBookingStatus,
} from "../controllers/bookingController";
import { protect, admin } from "../middleware/auth";

const router = express.Router();

router.route("/")
  .get(getBookings)
  .post(createBooking);

router
  .route("/:id")
  .get(getBookingById)
  .put(protect, admin, updateBooking)
  .delete(protect, admin, deleteBooking);

router
  .route("/:id/status")
  .put(protect, updateBookingStatus)

export default router;
