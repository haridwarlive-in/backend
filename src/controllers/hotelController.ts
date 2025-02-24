import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Hotel from '../models/Hotel';
import { hotelSchema } from '../schemas';
import jwt from "jsonwebtoken"
import Booking from '../models/Booking';

export const getHotels = asyncHandler(async (_req: Request, res: Response) => {
  const hotels = await Hotel.find({}).sort({likes: -1});
  res.json(hotels);
});

export const getHotelById = asyncHandler(async (req: Request, res: Response) => {
  const hotel = await Hotel.findById(req.params.id);
  if (hotel) {
    res.json(hotel);
  } else {
    res.status(404).json({ message: 'Hotel not found' });
  }
});

export const hotelLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hotel = await Hotel.find({ email, password }).populate('bookings');
  if (hotel) {
    const token = await jwt.sign({hotel}, process.env.JWT_SECRET as string)
    res.json({ hotel, token });
  } else {
    res.status(404).json({ message: 'Invalid email or password' });
  }
});


export const createHotel = asyncHandler(async (req: Request, res: Response) => {
  const hotelData = hotelSchema.parse(req.body);
  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${hotelData.key}`

  const hotel = await Hotel.create({...hotelData, image: url});
  res.status(201).json(hotel);
});

export const updateHotel = asyncHandler(async (req: Request, res: Response) => {
  const hotelData = hotelSchema.parse(req.body);
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, hotelData, {
    new: true,
    runValidators: true
  });

  if (hotel) {
    res.json(hotel);
  } else {
    res.status(404).json({ message: 'Hotel not found' });
  }
});

export const deleteHotel = asyncHandler(async (req: Request, res: Response) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);
  if (hotel) {
    await Booking.deleteMany({ hotelId: req.params.id });
    res.json({ message: 'Hotel removed' });
  } else {
    res.status(404).json({ message: 'Hotel not found' });
  }
});