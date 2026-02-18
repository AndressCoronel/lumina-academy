import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations";
import { simpleHash, setSession } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Datos inválidos", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, password, role } = parsed.data;

        const existing = await db.user.findUnique({
            where: { email },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Ya existe una cuenta con este email" },
                { status: 409 }
            );
        }

        const hashedPassword = simpleHash(password);

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || "STUDENT",
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
            },
        });

        await setSession(user.id);

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.error("[REGISTER_ERROR]", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
