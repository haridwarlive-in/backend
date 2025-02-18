"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsController_1 = require("../controllers/newsController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(newsController_1.getNews)
    .post(auth_1.protect, auth_1.admin, newsController_1.createNews);
router.route('/:id')
    .get(newsController_1.getNewsById)
    .put(auth_1.protect, auth_1.admin, newsController_1.updateNews)
    .delete(auth_1.protect, auth_1.admin, newsController_1.deleteNews);
exports.default = router;
