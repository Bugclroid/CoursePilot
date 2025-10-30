import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import courseRouter from './routes/courseRoutes.js';
dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get('/',(req, res) => {
    res.send('API is running successfully...')
});

app.use("/api/auth",authRouter);
app.use("/api/course", courseRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port http://www.localhost:${PORT}`)
});