import { Router } from 'express';
import healthRouter from './health.router.js';
import userRouter from './user.router.js';

const rootRouter = Router();

rootRouter.use('/health', healthRouter);
rootRouter.use('/users', userRouter);

export default rootRouter;