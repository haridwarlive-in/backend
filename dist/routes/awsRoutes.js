"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const awsController_1 = require("@/controllers/awsController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/upload')
    .post(auth_1.protect, auth_1.admin, awsController_1.generatePresignedUrl);
exports.default = router;
