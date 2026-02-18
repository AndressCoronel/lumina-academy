import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ExploreCoursesClient } from "./client";

export default async function ExploreCoursesPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const courses = await db.course.findMany({
        where: { isPublished: true },
        include: {
            category: true,
            instructor: { select: { id: true, name: true, avatar: true } },
            chapters: {
                where: { isPublished: true },
                include: {
                    lessons: {
                        where: { isPublished: true },
                        select: { id: true, duration: true },
                    },
                },
            },
            purchases: {
                where: { userId: user.id },
                select: { id: true },
            },
            _count: {
                select: { purchases: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const categories = await db.category.findMany({
        orderBy: { name: "asc" },
    });

    const coursesData = courses.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        imageUrl: c.imageUrl,
        price: c.price,
        category: c.category,
        instructor: c.instructor,
        totalLessons: c.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0),
        totalDuration: c.chapters.reduce(
            (acc, ch) =>
                acc + ch.lessons.reduce((a, l) => a + (l.duration || 0), 0),
            0
        ),
        chaptersCount: c.chapters.length,
        studentsCount: c._count.purchases,
        isPurchased: c.purchases.length > 0,
    }));

    return (
        <ExploreCoursesClient
            courses={JSON.parse(JSON.stringify(coursesData))}
            categories={JSON.parse(JSON.stringify(categories))}
        />
    );
}
