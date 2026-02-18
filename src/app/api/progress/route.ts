import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { progressSchema } from "@/lib/validations";

export async function PUT(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await req.json();
        const parsed = progressSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Datos inválidos" },
                { status: 400 }
            );
        }

        const { lessonId, isCompleted, videoProgress } = parsed.data;

        const progress = await db.userProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: user.id,
                    lessonId,
                },
            },
            update: {
                ...(isCompleted !== undefined && { isCompleted }),
                ...(videoProgress !== undefined && { videoProgress }),
            },
            create: {
                userId: user.id,
                lessonId,
                isCompleted: isCompleted ?? false,
                videoProgress: videoProgress ?? 0,
            },
        });

        return NextResponse.json({ progress });
    } catch (error) {
        console.error("[PROGRESS_ERROR]", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
