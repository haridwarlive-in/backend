"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryController_1 = require("../controllers/queryController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(queryController_1.getQueries)
    .post(auth_1.protect, auth_1.admin, queryController_1.createQuery);
router.route('/:id/status')
    .put(auth_1.protect, auth_1.admin, queryController_1.updateQueryStatus);
exports.default = router;
