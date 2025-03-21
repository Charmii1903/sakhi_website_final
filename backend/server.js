import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import profileRouter from './routes/profileRoute.js';
import newsletterRouter from './routes/newsletterRoute.js';
import reviewRouter from './routes/reviewRoutes.js';
import returnRouter from './routes/returnRoute.js';
import recommenderRouter from './routes/recommenderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to the database and cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS CONFIGURATION - FIXED
const allowedOrigins = ['https://sakhi-frontendd.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all required HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers
    credentials: true, // Allow cookies and authentication
}));

// ✅ FIX PRE-FLIGHT REQUESTS (For OPTIONS requests)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://sakhi-frontendd.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Mount routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/profile', profileRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/return', returnRouter);
app.use('/api/recommender', recommenderRouter);

// Test API route
app.get('/', (req, res) => {
    res.send('API working');
});

// Start server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
