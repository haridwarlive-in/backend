import mongoose from 'mongoose';
import { Hotel } from '../types';

const hotelSchema = new mongoose.Schema<Hotel>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  locationUrl: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  roomsAvailable: {
    type: Number,
    default: 0
  },
  amenities: [{
    type: String
  }],
  image: {
    type: String
  },
  key: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    website: String
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  }]
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;