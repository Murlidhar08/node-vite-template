import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../config/constants.js';

export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Unhandled Error:', err);

    res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};