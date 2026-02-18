import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CourseDetailClient } from "./client";

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const { courseId } = await params;

    const course = await db.course.findUnique({
        where: { id: courseId, isPublished: true },
        include: {
            category: true,
            instructor: { select: { id: true, name: true, avatar: true, bio: true } },
            chapters: {
                where: { isPublished: true },
                orderBy: { position: "asc" },
                include: {
                    lessons: {
                        where: { isPublished: true },
                        orderBy: { position: "asc" },
                        select: {
                            id: true,
                            title: true,
                            duration: true,
                            isFree: true,
                            position: true,
                        },
                    },
                },
            },
            _count: { select: { purchases: true } },
        },
    });

    if (!course) notFound();

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId: user.id,
                courseId,
            },
        },
    });

    const totalLessons = course.chapters.reduce(
        (acc, ch) => acc + ch.lessons.length,
        0
    );
    const totalDuration = course.chapters.reduce(
        (acc, ch) =>
            acc + ch.lessons.reduce((a, l) => a + (l.duration || 0), 0),
        0
    );

    return (
        <CourseDetailClient
            course={JSON.parse(JSON.stringify(course))}
            isPurchased={!!purchase}
            totalLessons={totalLessons}
            totalDuration={totalDuration}
            studentsCount={course._count.purchases}
        />
    );
}
