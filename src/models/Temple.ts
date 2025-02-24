import mongoose from 'mongoose';
import { Temple } from '../types';

const templeSchema = new mongoose.Schema<Temple>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  locationUrl: {
    type: String,
    required: true
  },  
  key: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
  }]
  
}, { timestamps: true });

const Temple = mongoose.model('Temple', templeSchema);
export default Temple;