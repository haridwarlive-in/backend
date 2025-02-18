"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBookingStatus = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getBookings = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const schemas_1 = require("../schemas");
const Booking_1 = __importDefault(require("../models/Booking"));
const Hotel_1 = __importDefault(require("../models/Hotel"));
exports.getBookings = (0, express_async_handler_1.default)(async (_req, res) => {
    const bookings = await Booking_1.default.find({}).populate('hotelId');
    res.json(bookings);
});
exports.getBookingById = (0, express_async_handler_1.default)(async (req, res) => {
    const booking = await Booking_1.default.findById(req.params.id);
    if (booking) {
        res.json(booking);
    }
    else {
        res.status(404).json({ message: 'Booking not found' });
    }
});
exports.createBooking = (0, express_async_handler_1.default)(async (req, res) => {
    const bookingData = schemas_1.bookingSchema.parse(req.body);
    const booking = await Booking_1.default.create(bookingData);
    await Hotel_1.default.findByIdAndUpdate(bookingData.hotelId, { $push: { bookings: booking._id } });
    res.status(201).json(booking);
});
exports.updateBooking = (0, express_async_handler_1.default)(async (req, res) => {
    const bookingData = schemas_1.bookingSchema.parse(req.body);
    const booking = await Booking_1.default.findByIdAndUpdate(req.params.id, bookingData, {
        new: true,
        runValidators: true
    });
    if (booking) {
        res.json(booking);
    }
    else {
        res.status(404).json({ message: 'Booking not found' });
    }
});
exports.updateBookingStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const { status } = req.body;
    const booking = await Booking_1.default.findByIdAndUpdate(req.params.id, {
        status: status
    }, {
        new: true,
        runValidators: true
    });
    if (booking) {
        res.json(booking);
    }
    else {
        res.status(404).json({ message: 'Booking not found' });
    }
});
exports.deleteBooking = (0, express_async_handler_1.default)(async (req, res) => {
    const booking = await Booking_1.default.findById(req.params.id);
    if (booking) {
        const hotelId = booking?.hotelId;
        await Booking_1.default.findByIdAndDelete(req.params.id);
        await Hotel_1.default.findByIdAndUpdate(hotelId, { $pull: { bookings: req.params.id } });
        res.json({ message: 'Booking removed' });
    }
    else {
        res.status(404).json({ message: 'Booking not found' });
    }
});
