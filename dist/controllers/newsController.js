"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.createNews = exports.getNewsByCategory = exports.getNewsById = exports.getViralNews = exports.getNews = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const News_1 = __importDefault(require("../models/News"));
const moment_1 = __importDefault(require("moment"));
const schemas_1 = require("../schemas");
exports.getNews = (0, express_async_handler_1.default)(async (req, res) => {
    // Get the page and limit from query params, default to page 1 and limit 10 if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 11;
    // Calculate the number of articles to skip based on the page number
    const skip = (page - 1) * limit;
    // Fetch total count of news articles to calculate total pages
    const totalNewsCount = await News_1.default.countDocuments();
    // Get the news with pagination and sorting by date
    const news = await News_1.default.find({})
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
    // Calculate total pages based on total count and limit
    const totalPages = Math.ceil(totalNewsCount / limit);
    // Return paginated results
    res.json({
        news,
        currentPage: page,
        totalPages,
        totalNewsCount,
    });
});
exports.getViralNews = (0, express_async_handler_1.default)(async (_req, res) => {
    // Get today's date and the date from 10 days ago
    const tenDaysAgo = (0, moment_1.default)().subtract(10, "days").toISOString();
    // Find news articles that were created within the last 10 days and sort by the number of clicks
    const news = await News_1.default.find({
        date: { $gte: tenDaysAgo }, // Only articles from the last 10 days
    })
        .sort({ clicks: -1 })
        .limit(4) // Sort by clicks in descending order (most clicked first)
        .exec();
    // Return the filtered and sorted news
    res.json(news);
});
exports.getNewsById = (0, express_async_handler_1.default)(async (req, res) => {
    const news = await News_1.default.findById(req.params.id);
    if (news) {
        res.json(news);
    }
    else {
        res.status(404).json({ message: 'News not found' });
    }
});
exports.getNewsByCategory = (0, express_async_handler_1.default)(async (req, res) => {
    const category = req.params.category; // Get the category from URL parameters
    // Limit the number of articles to 4
    const limit = 4;
    // Fetch news articles by category, limit to 4 and sort by date
    const news = await News_1.default.find({ category })
        .sort({ date: -1 })
        .limit(limit);
    if (!news.length) {
        res.status(404).json({ message: "No news found for this category" });
    }
    else {
        res.json(news);
    }
});
exports.createNews = (0, express_async_handler_1.default)(async (req, res) => {
    const newsData = schemas_1.newsSchema.parse(req.body);
    const news = await News_1.default.create(newsData);
    res.status(201).json(news);
});
exports.updateNews = (0, express_async_handler_1.default)(async (req, res) => {
    const newsData = schemas_1.newsSchema.parse(req.body);
    const news = await News_1.default.findByIdAndUpdate(req.params.id, newsData, {
        new: true,
        runValidators: true
    });
    if (news) {
        res.json(news);
    }
    else {
        res.status(404).json({ message: 'News not found' });
    }
});
exports.deleteNews = (0, express_async_handler_1.default)(async (req, res) => {
    const news = await News_1.default.findByIdAndDelete(req.params.id);
    if (news) {
        res.json({ message: 'News removed' });
    }
    else {
        res.status(404).json({ message: 'News not found' });
    }
});
