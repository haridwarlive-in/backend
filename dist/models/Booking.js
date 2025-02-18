"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    totalDays: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'PENDING'
    },
    message: {
        type: String
    },
    hotelId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Hotel"
    }
}, { timestamps: true });
const Booking = mongoose_1.default.model('Booking', bookingSchema);
exports.default = Booking;
