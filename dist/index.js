"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const hotelRoutes_1 = __importDefault(require("./routes/hotelRoutes"));
const templeRoutes_1 = __importDefault(require("./routes/templeRoutes"));
const newsRoutes_1 = __importDefault(require("./routes/newsRoutes"));
const queryRoutes_1 = __importDefault(require("./routes/queryRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const awsRoutes_1 = __importDefault(require("./routes/awsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/hotels', hotelRoutes_1.default);
app.use('/api/temples', templeRoutes_1.default);
app.use('/api/news', newsRoutes_1.default);
app.use('/api/queries', queryRoutes_1.default);
app.use('/api/bookings', bookingRoutes_1.default);
app.use('/api/upload', awsRoutes_1.default);
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
