import { Request, Response } from 'express';
import { HTTP_STATUS } from '../config/constants.js';

export const notFoundMiddleware = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
};