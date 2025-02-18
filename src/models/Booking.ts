import mongoose from 'mongoose';
import { Booking } from '../types';

const bookingSchema = new mongoose.Schema<Booking>({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  totalDays: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'PENDING'
  },
  message: {
    type: String
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel"
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;