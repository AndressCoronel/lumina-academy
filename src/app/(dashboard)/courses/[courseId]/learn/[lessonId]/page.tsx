import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { LessonPlayerClient } from "./client";

export default async function LessonPage({
    params,
}: {
    params: Promise<{ courseId: string; lessonId: string }>;
}) {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const { courseId, lessonId } = await params;

    // Verify purchase
    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: { userId: user.id, courseId },
        },
    });

    const lesson = await db.lesson.findUnique({
        where: { id: lessonId },
        include: {
            chapter: {
                include: {
                    course: {
                        select: { id: true, title: true, instructorId: true },
                    },
                    quiz: {
                        include: {
                            questions: { orderBy: { position: "asc" } },
                        },
                    },
                },
            },
            progress: {
                where: { userId: user.id },
            },
        },
    });

    if (!lesson) notFound();

    // Check access: must be purchased or lesson is free
    if (!purchase && !lesson.isFree) {
        redirect(`/courses/${courseId}`);
    }

    // Get all lessons for sidebar navigation
    const allChapters = await db.chapter.findMany({
        where: { courseId, isPublished: true },
        orderBy: { position: "asc" },
        include: {
            lessons: {
                where: { isPublished: true },
                orderBy: { position: "asc" },
                select: {
                    id: true,
                    title: true,
                    duration: true,
                    position: true,
                    isFree: true,
                },
            },
        },
    });

    // Get user progress for all lessons
    const allProgress = await db.userProgress.findMany({
        where: {
            userId: user.id,
            lesson: {
                chapter: { courseId },
            },
        },
        select: { lessonId: true, isCompleted: true, videoProgress: true },
    });

    const progressMap: Record<string, { isCompleted: boolean; videoProgress: number }> = {};
    allProgress.forEach((p) => {
        progressMap[p.lessonId] = {
            isCompleted: p.isCompleted,
            videoProgress: p.videoProgress,
        };
    });

    // Find next and prev lesson
    const allLessons = allChapters.flatMap((ch) =>
        ch.lessons.map((l) => ({ ...l, chapterId: ch.id }))
    );
    const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
    const nextLesson = allLessons[currentIndex + 1] || null;
    const prevLesson = allLessons[currentIndex - 1] || null;

    return (
        <LessonPlayerClient
            lesson={JSON.parse(JSON.stringify(lesson))}
            courseId={courseId}
            courseTitle={lesson.chapter.course.title}
            chapters={JSON.parse(JSON.stringify(allChapters))}
            progressMap={progressMap}
            nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null}
            prevLesson={prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null}
            quiz={lesson.chapter.quiz ? JSON.parse(JSON.stringify(lesson.chapter.quiz)) : null}
            initialVideoProgress={lesson.progress[0]?.videoProgress || 0}
            initialCompleted={lesson.progress[0]?.isCompleted || false}
        />
    );
}
