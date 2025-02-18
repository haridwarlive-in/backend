"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route("/")
    .get(bookingController_1.getBookings)
    .post(bookingController_1.createBooking);
router
    .route("/:id")
    .get(bookingController_1.getBookingById)
    .put(auth_1.protect, auth_1.admin, bookingController_1.updateBooking)
    .delete(auth_1.protect, auth_1.admin, bookingController_1.deleteBooking);
router
    .route("/:id/status")
    .put(auth_1.protect, bookingController_1.updateBookingStatus);
exports.default = router;
