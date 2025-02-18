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

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/temples', templeRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/bookings', bookingRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});