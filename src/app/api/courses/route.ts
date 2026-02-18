import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { courseSchema } from "@/lib/validations";

export async function GET() {
    try {
        const courses = await db.course.findMany({
            where: { isPublished: true },
            include: {
                category: true,
                instructor: { select: { id: true, name: true, avatar: true } },
                _count: { select: { purchases: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ courses });
    } catch (error) {
        console.error("[COURSES_GET]", error);
        return NextResponse.json(
            { error: "Error interno" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user || user.role !== "INSTRUCTOR") {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const parsed = courseSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Datos inválidos" },
                { status: 400 }
            );
        }

        const course = await db.course.create({
            data: {
                ...parsed.data,
                instructorId: user.id,
            },
        });

        return NextResponse.json({ course }, { status: 201 });
    } catch (error) {
        console.error("[COURSES_POST]", error);
        return NextResponse.json(
            { error: "Error interno" },
            { status: 500 }
        );
    }
}
