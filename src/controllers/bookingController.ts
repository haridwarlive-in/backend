import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { bookingSchema, hotelSchema } from '../schemas';
import Booking from '../models/Booking';
import Hotel from '../models/Hotel';

export const getBookings = asyncHandler(async (_req: Request, res: Response) => {
  const bookings = await Booking.find({}).populate('hotelId');
  res.json(bookings);
});

export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const bookingData = bookingSchema.parse(req.body);
  const booking = await Booking.create(bookingData);

  await Hotel.findByIdAndUpdate(
    bookingData.hotelId,
    {$push: { bookings: booking._id }}
  )
  res.status(201).json(booking);
});

export const updateBooking = asyncHandler(async (req: Request, res: Response) => {
  const bookingData = bookingSchema.parse(req.body);
  const booking = await Booking.findByIdAndUpdate(req.params.id, bookingData, {
    new: true,
    runValidators: true
  });

  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(req.params.id, {
    status: status as 'CONFIRMED'|'PENDING'|'CANCELLED'
  }, {
    new: true,
    runValidators: true
  });

  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

export const deleteBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id);

  if(booking) {
    const hotelId = booking?.hotelId;
    await Booking.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(
      hotelId,
      {$pull: { bookings: req.params.id }}
    )

    res.json({ message: 'Booking removed' });
    
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

