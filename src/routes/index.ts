import { middlewares } from '@/middlewares';
import express from 'express';
import { userRouter } from './users';


export const routes = express.Router();

routes.use('/users', middlewares.auth, middlewares.permission, userRouter);

routes.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});


