import { eq } from 'drizzle-orm';
import { users } from '../schema/user.schema';
import { db } from '../server';

export const userController = {

  getAllUsers: async () => {
    return await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
    }).from(users);
  },

  createUser: async (name: string, email: string, password: string) => {
    const result = await db.insert(users).values({ name, email, password }).returning();
    return result[0];
  },

  getUserById: async (id: number) => {
    const result = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
    }).from(users).where(eq(users.id, id));
    return result[0] || null;
  },

  updateUser: async (id: number, name: string, email: string) => {
    const result = await db.update(users)
      .set({ name, email })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  },

  deleteUser: async (id: number) => {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result[0] || null;
  }
};