import { Request, Response } from 'express';
import { HTTP_STATUS } from '../config/constants.js';

export class HealthController {
    static check(req: Request, res: Response) {
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: 'UP',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
    }
}