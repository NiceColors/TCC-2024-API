import { db } from '@/lib/db';
import { createUser, getAllUsers, getUserByEmail } from '@/services/user.services';
import { eq } from 'drizzle-orm';
import { users } from '../schema/user.schema';

export const userController = {

  getAllUsers: async () => {
    const users = await getAllUsers();
    return users

  },


  createUser: async (name: string, email: string, password: string) => {

    const userParams = { name, email, password };
    const existingUser = await getUserByEmail(userParams.email);

    if (existingUser) {
      throw new Error('User already exists');
    }


    const result = await createUser({
      name: userParams.name,
      email: userParams.email,
      password: userParams.password
    });

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