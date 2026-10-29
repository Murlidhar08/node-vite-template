import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ENV } from './config/env.config.js';
import rootRouter from './routers/index.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApp = (): Express => {
    const app = express();

    // 1. Core Middlewares
    app.use(cors({ origin: ENV.CLIENT_URL }));
    app.use(express.json());

    // 2. API Routes
    app.use('/api', rootRouter);

    // 3. Static Files (Frontend build directory)
    const clientBuildPath = path.resolve(
        __dirname,
        ENV.NODE_ENV === 'production' ? '../public' : '../../public'
    );

    if (fs.existsSync(clientBuildPath)) {
        app.use(express.static(clientBuildPath));
    }

    // 4. Express 5 Safe SPA Fallback (No wildcard crash)
    app.use((req: Request, res: Response, next: NextFunction) => {
        // If request is an API route, pass to notFoundMiddleware
        if (req.path.startsWith('/api')) {
            return next();
        }

        // Only serve index.html for GET requests
        if (req.method === 'GET') {
            const indexPath = path.join(clientBuildPath, 'index.html');
            if (fs.existsSync(indexPath)) {
                return res.sendFile(indexPath);
            }
        }

        next();
    });

    // 5. Error Handlers
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    return app;
};