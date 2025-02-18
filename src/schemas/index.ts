import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const hotelSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  title: z.string().min(2),
  description: z.string().min(10),
  address: z.string(),
  locationUrl: z.string().url(),
  amenities: z.array(z.string()),
  image: z.string().url(),
  likes: z.number().default(0),
  roomsAvailable: z.number().default(0),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    website: z.string().url().optional()
  })
});

export const templeSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  location: z.string().optional(),
  locationUrl: z.string().url().optional(),
  image: z.string().optional(),
  tags: z.array(z.string())
});

export const newsSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
  status: z.enum(['Archived', 'Published']),
  date: z.preprocess((value) => {
    if (typeof value === 'string' || value instanceof String) {
      return new Date(value as string); // Convert string to Date
    }
    return value; // Return the value as-is if not a string
  }, z.date()), // Validate as a Date object
  category: z.string(),
  image: z.string().url().optional(),
  tags: z.array(z.string())
});

export const querySchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export const bookingSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().min(5),
  message: z.string(),
  hotelId: z.string(),
  date: z.string(),
  totalDays: z.string(),
});
