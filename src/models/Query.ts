import mongoose from 'mongoose';
import { Query } from '../types';

const querySchema = new mongoose.Schema<Query>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Query = mongoose.model('Query', querySchema);
export default Query;