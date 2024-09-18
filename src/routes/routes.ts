import { middlewares } from '@/middlewares/middlewares';
import { authRouter } from '@/routes/auth.routes';
import { userRouter } from '@/routes/user.routes';
import express from 'express';


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