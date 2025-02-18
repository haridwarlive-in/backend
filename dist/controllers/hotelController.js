"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.createHotel = exports.hotelLogin = exports.getHotelById = exports.getHotels = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Hotel_1 = __importDefault(require("../models/Hotel"));
const schemas_1 = require("../schemas");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.getHotels = (0, express_async_handler_1.default)(async (_req, res) => {
    const hotels = await Hotel_1.default.find({});
    res.json(hotels);
});
exports.getHotelById = (0, express_async_handler_1.default)(async (req, res) => {
    const hotel = await Hotel_1.default.findById(req.params.id).populate("bookings");
    if (hotel) {
        res.json(hotel);
    }
    else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});
exports.hotelLogin = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const hotel = await Hotel_1.default.find({ email, password }).populate('bookings');
    if (hotel) {
        const token = await jsonwebtoken_1.default.sign({ hotel }, process.env.JWT_SECRET);
        res.json({ hotel, token });
    }
    else {
        res.status(404).json({ message: 'Invalid email or password' });
    }
});
exports.createHotel = (0, express_async_handler_1.default)(async (req, res) => {
    const hotelData = schemas_1.hotelSchema.parse(req.body);
    const hotel = await Hotel_1.default.create(hotelData);
    res.status(201).json(hotel);
});
exports.updateHotel = (0, express_async_handler_1.default)(async (req, res) => {
    const hotelData = schemas_1.hotelSchema.parse(req.body);
    const hotel = await Hotel_1.default.findByIdAndUpdate(req.params.id, hotelData, {
        new: true,
        runValidators: true
    });
    if (hotel) {
        res.json(hotel);
    }
    else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});
exports.deleteHotel = (0, express_async_handler_1.default)(async (req, res) => {
    const hotel = await Hotel_1.default.findByIdAndDelete(req.params.id);
    if (hotel) {
        res.json({ message: 'Hotel removed' });
    }
    else {
        res.status(404).json({ message: 'Hotel not found' });
    }
});
