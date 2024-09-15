import type { InferSelectModel } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    refreshToken: text('refresh_token'),
    refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .default(sql`CURRENT_TIMESTAMP`)
})

export const selectUserSchema = createSelectSchema(users, {
    email: schema =>
        schema.email.email().regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i),
});

export const verifyUserSchema = z.object({
    query: selectUserSchema.pick({
        email: true,
    }),
});

export const deleteUserSchema = z.object({
    body: selectUserSchema.pick({
        email: true,
    }),
});

export const loginSchema = z.object({
    body: selectUserSchema.pick({
        email: true,
        password: true,
    }),
});

export const addUserSchema = z.object({
    body: selectUserSchema.pick({
        name: true,
        email: true,
        password: true,
    }),
});

export const updateUserSchema = z.object({
    body: selectUserSchema
        .pick({
            name: true,
            email: true,
            password: true,
        })
        .partial(),
});

export const newUserSchema = z.object({
    body: selectUserSchema.pick({
        name: true,
        email: true,
        password: true,
    }),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = z.infer<typeof newUserSchema>['body'];
export type UpdateUser = z.infer<typeof updateUserSchema>['body'];