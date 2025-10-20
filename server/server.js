import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get('/',(req, res) => {
    res.send('API is running sucessfully...')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
});