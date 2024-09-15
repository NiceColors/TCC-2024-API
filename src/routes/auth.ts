import { eq } from 'drizzle-orm';
import { Router } from 'express';
import { db } from '..';
import { authController } from '../controllers/authController';
import { users } from '../schema/schema';


export const authRouter = Router();


authRouter.get('/', async (req, res) => {
    res.json({ message: 'Auth route' });
});


authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;



    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const result = await authController.login({ email, password });

        console.log(result);

        return res.json(result);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }


});


authRouter.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    const result = await authController.refreshToken({ refreshToken });

    if (!result) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }

    return res.json(result);

});


authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();

    if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
    }


    try {
        const result = await authController.register({ name, email, password });
        return res.json(result);
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
});

authRouter.get('/logout', async (req, res) => {
    return res.json({ message: 'Logout route' });
});

