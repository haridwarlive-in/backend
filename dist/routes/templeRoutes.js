"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const templeController_1 = require("../controllers/templeController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(templeController_1.getTemples)
    .post(auth_1.protect, auth_1.admin, templeController_1.createTemple);
router.route('/:id')
    .get(templeController_1.getTempleById)
    .put(auth_1.protect, auth_1.admin, templeController_1.updateTemple)
    .delete(auth_1.protect, auth_1.admin, templeController_1.deleteTemple);
exports.default = router;
