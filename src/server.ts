import 'module-alias/register';


import dotenv from 'dotenv';
import express from 'express';
import { authRoutes, routes } from './routes/routes';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

dotenv.config();


const port = process.env.PORT || 3000;

export const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use('/auth', authRoutes);

app.use('/api', routes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});