"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = exports.querySchema = exports.newsSchema = exports.templeSchema = exports.hotelSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.hotelSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    title: zod_1.z.string().min(2),
    description: zod_1.z.string().min(10),
    address: zod_1.z.string(),
    locationUrl: zod_1.z.string().url(),
    amenities: zod_1.z.array(zod_1.z.string()),
    image: zod_1.z.string().url(),
    likes: zod_1.z.number().default(0),
    roomsAvailable: zod_1.z.number().default(0),
    contact: zod_1.z.object({
        phone: zod_1.z.string(),
        email: zod_1.z.string().email(),
        website: zod_1.z.string().url().optional()
    })
});
exports.templeSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    description: zod_1.z.string().min(10),
    location: zod_1.z.string().optional(),
    locationUrl: zod_1.z.string().url().optional(),
    image: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string())
});
exports.newsSchema = zod_1.z.object({
    title: zod_1.z.string().min(5),
    content: zod_1.z.string().min(10),
    status: zod_1.z.enum(['Archived', 'Published']),
    date: zod_1.z.preprocess((value) => {
        if (typeof value === 'string' || value instanceof String) {
            return new Date(value); // Convert string to Date
        }
        return value; // Return the value as-is if not a string
    }, zod_1.z.date()), // Validate as a Date object
    category: zod_1.z.string(),
    image: zod_1.z.string().url().optional(),
    tags: zod_1.z.array(zod_1.z.string())
});
exports.querySchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email().optional(),
    subject: zod_1.z.string().min(5),
    message: zod_1.z.string().min(10),
});
exports.bookingSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(5),
    message: zod_1.z.string(),
    hotelId: zod_1.z.string(),
    date: zod_1.z.string(),
    totalDays: zod_1.z.string(),
});
