"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTemple = exports.updateTemple = exports.createTemple = exports.getTempleById = exports.getTemples = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Temple_1 = __importDefault(require("../models/Temple"));
const schemas_1 = require("../schemas");
exports.getTemples = (0, express_async_handler_1.default)(async (_req, res) => {
    const temples = await Temple_1.default.find({});
    res.json(temples);
});
exports.getTempleById = (0, express_async_handler_1.default)(async (req, res) => {
    const temple = await Temple_1.default.findById(req.params.id);
    if (temple) {
        res.json(temple);
    }
    else {
        res.status(404).json({ message: 'Temple not found' });
    }
});
exports.createTemple = (0, express_async_handler_1.default)(async (req, res) => {
    const templeData = schemas_1.templeSchema.parse(req.body);
    const temple = await Temple_1.default.create(templeData);
    res.status(201).json(temple);
});
exports.updateTemple = (0, express_async_handler_1.default)(async (req, res) => {
    const templeData = schemas_1.templeSchema.parse(req.body);
    const temple = await Temple_1.default.findByIdAndUpdate(req.params.id, templeData, {
        new: true,
        runValidators: true
    });
    if (temple) {
        res.json(temple);
    }
    else {
        res.status(404).json({ message: 'Temple not found' });
    }
});
exports.deleteTemple = (0, express_async_handler_1.default)(async (req, res) => {
    const temple = await Temple_1.default.findByIdAndDelete(req.params.id);
    if (temple) {
        res.json({ message: 'Temple removed' });
    }
    else {
        res.status(404).json({ message: 'Temple not found' });
    }
});
