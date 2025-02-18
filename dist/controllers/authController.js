"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = require("../models/Admin");
const schemas_1 = require("../schemas");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = schemas_1.loginSchema.parse(req.body);
    const admin = await Admin_1.Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
        const token = jsonwebtoken_1.default.sign({ id: admin._id, email: admin.email, isAdmin: admin.isAdmin }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400; sameSite=Lax`);
        res.json({
            token
        });
    }
    else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});
