import 'module-alias/register';


import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import express from 'express';

dotenv.config();

const port = process.env.PORT || 3000;


const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);

export const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});