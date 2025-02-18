"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQueryStatus = exports.createQuery = exports.getQueries = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Query_1 = __importDefault(require("../models/Query"));
const schemas_1 = require("../schemas");
exports.getQueries = (0, express_async_handler_1.default)(async (_req, res) => {
    const queries = await Query_1.default.find({}).sort({ createdAt: -1 });
    res.json(queries);
});
exports.createQuery = (0, express_async_handler_1.default)(async (req, res) => {
    const queryData = schemas_1.querySchema.parse(req.body);
    const query = await Query_1.default.create(queryData);
    res.status(201).json(query);
});
exports.updateQueryStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const query = await Query_1.default.findByIdAndUpdate(req.params.id, { status: 'responded' }, { new: true });
    if (query) {
        res.json(query);
    }
    else {
        res.status(404).json({ message: 'Query not found' });
    }
});
