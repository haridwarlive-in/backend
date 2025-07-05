import { Request } from 'express';
import mongoose from 'mongoose';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
}

export interface Hotel {
  email: string,
  password: string,
  title: string;
  description: string;
  address: string;
  locationUrl: string;
  amenities: string[];
  image: string;
  key: string;
  likes: number;
  roomsAvailable: number;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  bookings: string[]
}

export interface Temple {
  title: string;
  description: string;
  location: string;
  locationUrl: string;
  image: string;
  key?: string;
  tags?: string[] 
}

export interface News {
  title: string;
  content: string;
  date: Date;
  status: 'Archived'|'Published';
  category: Category;
  image?: string;
  key?: string;
  tags: string[];
  clicks: number;
  isBreakingNews: boolean;
  author?: string;
  urlTitle: string;
  videoUrl: string;
}

export interface Query {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface Booking {
  date: string,
  name: string,
  totalDays: string,
  phone: string,
  email: string,
  message: string,
  hotelId: mongoose.Schema.Types.ObjectId,
  status: 'CONFIRMED'|'PENDING'|'CANCELLED'
}

export interface Advertisement {
  title: string,
  status: 'Archived'|'Published';
  image: string,
  url: string,
  key: string,
  expiry: Date,
  duration: number
}

type Category =
  | "Local News"
  | "Events"
  | "Business & Economy"
  | "Health & Wellness"
  | "Education"
  | "Sports"
  | "Entertainment"
  | "Weather"
  | "Lifestyle"
  | "Technology"
  | "Transportation"
  | "Real Estate"
  | "Tourism"
  | "Crime & Safety"
  | "Environment"
  | "Politics"
  | "Human Interest"
  | "Opinion"
  | "Business Directory"
  | "Community";