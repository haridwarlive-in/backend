import mongoose from 'mongoose';
import { News } from '../types';

const newsSchema = new mongoose.Schema<News>({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
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
  tags: [{
    type: String,
    required: true
  }],
  clicks: {
    type: Number,
    default: 0
  },
  isBreakingNews: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);
export default News;