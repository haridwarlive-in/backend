"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelController_1 = require("../controllers/hotelController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(hotelController_1.getHotels)
    .post(auth_1.protect, auth_1.admin, hotelController_1.createHotel);
router.route('/:id')
    .get(hotelController_1.getHotelById)
    .put(auth_1.protect, hotelController_1.updateHotel)
    .delete(auth_1.protect, auth_1.admin, hotelController_1.deleteHotel);
router.route('/auth')
    .post(hotelController_1.hotelLogin);
exports.default = router;
