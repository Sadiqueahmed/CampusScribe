import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import app from './app';
import routes from './routes';
// import { prisma } from '@campus-scribe/database';

dotenv.config();

const PORT = process.env.PORT || 5000;

// If we are not running on Vercel, start the server normally
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const startServer = async () => {
        try {
            app.listen(PORT, () => {
                console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    };
    startServer();
}

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// API Routes
app.use('/api/v1', routes);

// Export the Express API for Vercel Serverless Functions
export default app;
