import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { InstructorDashboardClient } from "./client";

export default async function InstructorDashboardPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");
    if (user.role !== "INSTRUCTOR") redirect("/student");

    const courses = await db.course.findMany({
        where: { instructorId: user.id },
        include: {
            category: true,
            chapters: {
                include: {
                    lessons: { select: { id: true } },
                },
            },
            _count: { select: { purchases: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    const totalRevenue = await db.purchase.aggregate({
        where: {
            course: { instructorId: user.id },
        },
        _sum: { price: true },
    });

    const totalStudents = await db.purchase.count({
        where: {
            course: { instructorId: user.id },
        },
    });

    const stats = {
        totalCourses: courses.length,
        totalStudents,
        totalRevenue: totalRevenue._sum.price || 0,
        totalLessons: courses.reduce(
            (acc, c) => acc + c.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
            0
        ),
    };

    return (
        <InstructorDashboardClient
            user={user}
            courses={JSON.parse(JSON.stringify(courses))}
            stats={stats}
        />
    );
}
