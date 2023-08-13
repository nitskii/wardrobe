import { randomBytes, randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import db from "../db";
import { User, users } from "../db/schema";

export type UserData = {
    nickname: string,
    password: string
};

const signup = async (userData: UserData) => {
    const userExists = (
        await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.nickname, userData.nickname))
            .limit(1)
            .all()
    ).length > 0;

    if (userExists) {
        throw new Error("User exists");
    }

    const salt = randomBytes(8).toString("hex");
    const password = await Bun.password.hash(
        `${userData.password}${salt}`,
        "bcrypt"
    );

    const newUserId = randomUUID();

    const userToInsert: User = {
        id: newUserId,
        ...userData,
        password,
        salt
    }

    await db
        .insert(users)
        .values(userToInsert)
        .run();

    return newUserId;
}

export default {
    signup
};