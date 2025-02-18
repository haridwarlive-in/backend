"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const templeSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    locationUrl: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: [{
            type: String,
        }]
}, { timestamps: true });
const Temple = mongoose_1.default.model('Temple', templeSchema);
exports.default = Temple;
