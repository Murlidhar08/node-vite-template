import express, { Express } from 'express';
import cors from 'cors';
import { ENV } from './config/env.config.js';
import rootRouter from './routers/index.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export const createApp = (): Express => {
    const app = express();

    // Core middlewares
    app.use(cors({ origin: ENV.CLIENT_URL }));
    app.use(express.json());

    // API Routes
    app.use('/api', rootRouter);

    // 404 & Global Error Handling
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    return app;
};