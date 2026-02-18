import { cookies } from "next/headers";
import { db } from "./db";

const SESSION_COOKIE = "lumina-session";

export async function getSession(): Promise<string | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    return session?.value ?? null;
}

export async function getCurrentUser() {
    const userId = await getSession();
    if (!userId) return null;

    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                bio: true,
                createdAt: true,
            },
        });
        return user;
    } catch {
        return null;
    }
}

export async function setSession(userId: string) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}

export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
}

export async function requireInstructor() {
    const user = await requireAuth();
    if (user.role !== "INSTRUCTOR") {
        throw new Error("Forbidden: Instructor access required");
    }
    return user;
}

// Simple hash for demo purposes (not production-grade)
export function simpleHash(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return "hash_" + Math.abs(hash).toString(36) + "_" + password.length;
}

export function verifyHash(password: string, hash: string): boolean {
    return simpleHash(password) === hash;
}
