import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { eq, sql } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { users } from '../schema/user.schema';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

function generateToken({ user, secret, expires = '15m' }: {
    user: { id: number; email: string; };
    secret: string;
    expires?: '30s' | '15m' | '8h';
}): string {
    const payload = {
        id: user.id,
        email: user.email,
    };
    return jwt.sign(payload, secret, { expiresIn: expires });
}


export const authController = {
    login: async ({ email, password }: {
        email: string;
        password: string;
    }) => {


        const user = await db.select().from(users).where(eq(users.email, email)).get();

        if (!user) {
            return ({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            ({ message: 'Invalid credentials' });
        }

        const accessToken = generateToken({ user, secret: ACCESS_TOKEN_SECRET, expires: '30s' });
        const refreshToken = generateToken({ user, secret: REFRESH_TOKEN_SECRET, expires: '8h' });

        await db.update(users).set({
            refreshToken: refreshToken,
            refreshTokenExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours now
        }).where(eq(users.id, user.id));

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }


    },
    logout: async ({ refreshToken }: { refreshToken: string }) => {
        try {
            const user = await db.select().from(users).where(eq(users.refreshToken, refreshToken)).get();

            if (!user) {
                return ({ message: 'Invalid refresh token' });
            }

            await db.update(users).set({
                refreshToken: null,
                refreshTokenExpiresAt: null
            }).where(eq(users.id, user.id));

            return ({ message: 'Logout successful' });

        } catch (error) {
            console.error('Logout error:', error);
            return ({ message: 'An error occurred during logout' });
        }
    },
    register: async ({ name, email, password }: {
        name: string;
        email: string;
        password: string;
    }) => {
        try {

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.insert(users).values({
                name: name,
                email: email,
                password: hashedPassword,
                refreshToken: null,
                refreshTokenExpiresAt: null
            }).returning();

            return ({
                message: 'User registered successfully',
            });

        } catch (error) {
            console.error('Registration error:', error);
            return ({ message: 'An error occurred during registration' });
        }
    },
    refreshToken: async ({ refreshToken }: { refreshToken: string }) => {
        try {

            const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { id: number };
            const user = await db.select().from(users)
                .where(sql`${eq(users.id, payload.id)} AND ${eq(users.refreshToken, refreshToken)}`).get();

            if (!user || new Date(user.refreshTokenExpiresAt!) < new Date()) {
                return ({ message: 'Invalid or expired refresh token' });
            }

            const newAccessToken = generateToken({ user: { id: user.id, email: user.email }, secret: ACCESS_TOKEN_SECRET, expires: '30s' });
            const newRefreshToken = generateToken({ user: { id: user.id, email: user.email }, secret: REFRESH_TOKEN_SECRET, expires: '8h' });

            await db.update(users).set({
                refreshToken: newRefreshToken,
                refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
            }).where(eq(users.id, user.id));

            return ({ accessToken: newAccessToken, refreshToken: newRefreshToken });

        } catch (error) {
            console.error('Refresh token error:', error);
            return ({ message: 'Invalid refresh token' });
        }
    },

}
