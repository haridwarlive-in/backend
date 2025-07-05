import mongoose from 'mongoose';
import { Advertisement } from '../types';

const advertisementSchema = new mongoose.Schema<Advertisement>({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Archived', 'Published'],
  },
  image: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    default: 5
  }
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
export default Advertisement;