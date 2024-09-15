import { middlewares } from '@/middlewares';
import express from 'express';
import { authRouter } from './auth';
import { userRouter } from './users';


export const routes = express.Router();

routes.use('/users', middlewares.auth, middlewares.permission, userRouter);

routes.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

export const authRoutes = express.Router();

authRoutes.use('/', authRouter);

authRoutes.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});