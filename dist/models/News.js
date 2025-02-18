"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const newsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Archived', 'Published'],
    },
    image: {
        type: String,
        required: true
    },
    tags: [{
            type: String,
            required: true
        }],
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
const News = mongoose_1.default.model('News', newsSchema);
exports.default = News;
