import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Hotel from '../models/Hotel';
import { hotelSchema } from '../schemas';
import jwt from "jsonwebtoken"

export const getHotels = asyncHandler(async (_req: Request, res: Response) => {
  const hotels = await Hotel.find({});
  res.json(hotels);
});

export const getHotelById = asyncHandler(async (req: Request, res: Response) => {
  const hotel = await Hotel.findById(req.params.id).populate("bookings");
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
  const hotel = await Hotel.create(hotelData);
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
    res.json({ message: 'Hotel removed' });
  } else {
    res.status(404).json({ message: 'Hotel not found' });
  }
});