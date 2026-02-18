import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { courseId } = await params;

        const course = await db.course.findUnique({
            where: { id: courseId, isPublished: true },
        });

        if (!course) {
            return NextResponse.json(
                { error: "Curso no encontrado" },
                { status: 404 }
            );
        }

        const existingPurchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId,
                },
            },
        });

        if (existingPurchase) {
            return NextResponse.json(
                { error: "Ya has adquirido este curso" },
                { status: 400 }
            );
        }

        const purchase = await db.purchase.create({
            data: {
                userId: user.id,
                courseId,
                price: course.price ?? 0,
            },
        });

        return NextResponse.json({ purchase }, { status: 201 });
    } catch (error) {
        console.error("[PURCHASE_ERROR]", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
