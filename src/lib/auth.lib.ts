import bcrypt from "bcrypt";
import { eq } from 'drizzle-orm';

import { users } from "@/schema/user.schema";
import { db } from '../server';

export function passwordToSaltedHash(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash

}

async function getUserFromDb(id: string) {
    const result = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
    }).from(users).where(eq(users.id, parseInt(id)));

    return result
}
