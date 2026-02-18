import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { StudentDashboardClient } from "./client";

export default async function StudentDashboardPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");
    if (user.role === "INSTRUCTOR") redirect("/instructor");

    // Get user's purchased courses with progress
    const purchases = await db.purchase.findMany({
        where: { userId: user.id },
        include: {
            course: {
                include: {
                    category: true,
                    instructor: { select: { name: true, avatar: true } },
                    chapters: {
                        where: { isPublished: true },
                        include: {
                            lessons: {
                                where: { isPublished: true },
                                include: {
                                    progress: {
                                        where: { userId: user.id },
                                    },
                                },
                            },
                        },
                        orderBy: { position: "asc" },
                    },
                },
            },
        },
    });

    const coursesWithProgress = purchases.map((p) => {
        const totalLessons = p.course.chapters.reduce(
            (acc, ch) => acc + ch.lessons.length,
            0
        );
        const completedLessons = p.course.chapters.reduce(
            (acc, ch) =>
                acc +
                ch.lessons.filter((l) =>
                    l.progress.some((pr) => pr.isCompleted)
                ).length,
            0
        );

        return {
            ...p.course,
            totalLessons,
            completedLessons,
            progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        };
    });

    const stats = {
        totalCourses: coursesWithProgress.length,
        completedCourses: coursesWithProgress.filter((c) => c.progress === 100).length,
        inProgressCourses: coursesWithProgress.filter(
            (c) => c.progress > 0 && c.progress < 100
        ).length,
        totalLessonsCompleted: coursesWithProgress.reduce(
            (acc, c) => acc + c.completedLessons,
            0
        ),
        averageProgress:
            coursesWithProgress.length > 0
                ? Math.round(
                    coursesWithProgress.reduce((acc, c) => acc + c.progress, 0) /
                    coursesWithProgress.length
                )
                : 0,
    };

    return (
        <StudentDashboardClient
            user={user}
            courses={JSON.parse(JSON.stringify(coursesWithProgress))}
            stats={stats}
        />
    );
}
