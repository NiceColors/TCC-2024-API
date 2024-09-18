import bcrypt from "bcrypt";
import { eq } from 'drizzle-orm';

import { users } from "@/schema/user.schema";
import { db } from "./db";

export function passwordToSaltedHash(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash

}

export async function comparePasswordToHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

