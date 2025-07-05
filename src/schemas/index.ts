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
  key: z.string(),
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
  key: z.string(),
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
  key: z.string(),
  tags: z.array(z.string()),
  isBreakingNews: z.boolean(),
  clicks: z.number().default(0).optional(),
  author: z.string().optional(),
  urlTitle: z.string(),
  videoUrl: z.string().optional()
});

export const querySchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string(),
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

export const advertisementSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  key: z.string(),
  expiry: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  status: z.string(),
  duration: z.number(),
});

