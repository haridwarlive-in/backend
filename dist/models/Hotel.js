"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hotelSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    locationUrl: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    roomsAvailable: {
        type: Number,
        default: 0
    },
    amenities: [{
            type: String
        }],
    image: {
        type: String
    },
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        website: String
    },
    bookings: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Booking"
        }]
}, { timestamps: true });
const Hotel = mongoose_1.default.model('Hotel', hotelSchema);
exports.default = Hotel;
