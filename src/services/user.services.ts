import { db } from "@/lib/db";
import { User, users } from "@/schema/user.schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
    return await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
    }).from(users);
}

export const createUser = async ({
    email,
    name,
    password
}: {
    email: string,
    name: string,
    password: string
}) => {
    const result = await db.insert(users).values({
        email: email,
        name: name,
        password: password
    }).returning();
    return result[0];
}

export const getUserById = async (id: number) => {
    const result = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
    }).from(users).where(eq(users.id, id));
    return result[0] || null;
}

export const getUserByEmail = async (email: string) => {
    const result = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
    }).from(users).where(eq(users.email, email));
    return result[0] || null;
}

export const updateUser = async (id: number, user: User) => {
    const result = await db.update(users)
        .set({
            email: user.email,
            name: user.name
        })
        .where(eq(users.id, id))
        .returning();
    return result[0] || null;
}

export const deleteUser = async (id: number) => {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result[0] || null;
}

