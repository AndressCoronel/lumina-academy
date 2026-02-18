import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Play, Trophy, CheckCircle2 } from "lucide-react";

export default async function MyCoursesPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const purchases = await db.purchase.findMany({
        where: { userId: user.id },
        include: {
            course: {
                include: {
                    category: true,
                    instructor: { select: { name: true } },
                    chapters: {
                        where: { isPublished: true },
                        orderBy: { position: "asc" },
                        include: {
                            lessons: {
                                where: { isPublished: true },
                                orderBy: { position: "asc" },
                                include: {
                                    progress: {
                                        where: { userId: user.id },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const courses = purchases.map((p) => {
        const allLessons = p.course.chapters.flatMap((ch) => ch.lessons);
        const totalLessons = allLessons.length;
        const completedLessons = allLessons.filter((l) =>
            l.progress.some((pr) => pr.isCompleted)
        ).length;
        const progress =
            totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0;
        // Find next incomplete lesson
        const nextLesson = allLessons.find(
            (l) => !l.progress.some((pr) => pr.isCompleted)
        );

        return {
            id: p.course.id,
            title: p.course.title,
            category: p.course.category?.name,
            instructor: p.course.instructor.name,
            totalLessons,
            completedLessons,
            progress,
            nextLessonId: nextLesson?.id || allLessons[0]?.id,
        };
    });

    const courseEmojis: Record<string, string> = {
        "Desarrollo Web": "🚀",
        "Data Science": "📊",
        "Diseño": "🎨",
        "IA & ML": "🤖",
        "DevOps": "☁️",
        "Ciberseguridad": "🔒",
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Mis <span className="gradient-text">Cursos</span>
                </h1>
                <p className="text-muted mt-1">
                    Tu progreso de aprendizaje en un solo lugar
                </p>
            </div>

            {courses.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <BookOpen className="h-16 w-16 text-muted mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            Aún no te has inscrito en ningún curso
                        </h3>
                        <p className="text-sm text-muted mb-4">
                            Explora nuestro catálogo y empieza a aprender
                        </p>
                        <Link href="/student/courses">
                            <Button variant="gradient" className="gap-2">
                                Explorar Cursos
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}/learn/${course.nextLessonId}`}
                        >
                            <Card className="card-hover cursor-pointer h-full overflow-hidden group">
                                <div className="relative h-36 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
                                    <span className="text-5xl">
                                        {courseEmojis[course.category || ""] || "📚"}
                                    </span>
                                    {course.progress === 100 && (
                                        <div className="absolute top-3 right-3">
                                            <Badge variant="success" className="gap-1">
                                                <Trophy className="h-3 w-3" />
                                                Completado
                                            </Badge>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center shadow-xl">
                                            <Play className="h-5 w-5 text-white ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    {course.category && (
                                        <Badge variant="secondary" className="mb-2 text-xs">
                                            {course.category}
                                        </Badge>
                                    )}
                                    <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-xs text-muted mb-4">
                                        {course.instructor}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                {course.completedLessons}/{course.totalLessons} lecciones
                                            </span>
                                            <span className="font-semibold text-primary">
                                                {course.progress}%
                                            </span>
                                        </div>
                                        <Progress value={course.progress} />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
