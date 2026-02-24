import * as dotenv from 'dotenv';
import app from './app';
// import { prisma } from '@campus-scribe/database';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Database connection test could go here
        // await prisma.$connect();
        // console.log('Database connected successfully');

        app.listen(PORT, () => {
            console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
