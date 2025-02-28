import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import hotelRoutes from './routes/hotelRoutes';
import templeRoutes from './routes/templeRoutes';
import newsRoutes from './routes/newsRoutes';
import queryRoutes from './routes/queryRoutes';
import bookingRoutes from './routes/bookingRoutes';
import awsRoutes from './routes/awsRoutes';
import { Admin } from './models/Admin';

dotenv.config();

const app = express();

const allowedOrigins = ["https://www.haridwarlivein.in", "https://www.haridwarlivein.com", "https://dashboard.haridwarlivein.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/temples', templeRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', awsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});