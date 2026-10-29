import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';
import { HTTP_STATUS } from '../config/constants.js';

export class UserController {
    static async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAllUsers();
            res.status(HTTP_STATUS.OK).json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Invalid or missing user ID' });
                return;
            }

            const user = await UserService.getUserById(id);
            if (!user) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'User not found' });
                return;
            }
            res.status(HTTP_STATUS.OK).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name } = req.body;
            if (!email) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Email is required' });
                return;
            }

            const newUser = await UserService.createUser({ email, name });
            res.status(HTTP_STATUS.CREATED).json({ success: true, data: newUser });
        } catch (error) {
            next(error);
        }
    }
}
