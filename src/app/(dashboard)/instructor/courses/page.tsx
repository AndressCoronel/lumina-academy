import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle, ArrowRight, Eye, EyeOff, BarChart3 } from "lucide-react";

export default async function InstructorCoursesPage() {
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Mis <span className="gradient-text">Cursos</span>
                    </h1>
                    <p className="text-muted mt-1">
                        Gestiona y edita tus cursos
                    </p>
                </div>
                <Link href="/instructor/courses/create">
                    <Button variant="gradient" className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Nuevo Curso
                    </Button>
                </Link>
            </div>

            {courses.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <BookOpen className="h-16 w-16 text-muted mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No tienes cursos todavía
                        </h3>
                        <p className="text-sm text-muted mb-4">
                            Crea tu primer curso y comparte tu conocimiento
                        </p>
                        <Link href="/instructor/courses/create">
                            <Button variant="gradient" className="gap-2">
                                <PlusCircle className="h-4 w-4" />
                                Crear mi primer curso
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course) => {
                        const lessonCount = course.chapters.reduce(
                            (acc, ch) => acc + ch.lessons.length,
                            0
                        );
                        return (
                            <Card key={course.id} className="card-hover group">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <Badge
                                            variant={course.isPublished ? "success" : "warning"}
                                        >
                                            {course.isPublished ? (
                                                <>
                                                    <Eye className="h-3 w-3 mr-1" /> Publicado
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="h-3 w-3 mr-1" /> Borrador
                                                </>
                                            )}
                                        </Badge>
                                        <div className="flex items-center gap-2">
                                            <Link href={`/instructor/courses/${course.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    Editar
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                        {course.title}
                                    </h3>

                                    {course.category && (
                                        <Badge variant="secondary" className="mb-3 text-xs">
                                            {course.category.name}
                                        </Badge>
                                    )}

                                    <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
                                        <div className="text-center">
                                            <p className="text-lg font-bold">{course.chapters.length}</p>
                                            <p className="text-xs text-muted">Capítulos</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-bold">{lessonCount}</p>
                                            <p className="text-xs text-muted">Lecciones</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-bold">{course._count.purchases}</p>
                                            <p className="text-xs text-muted">Estudiantes</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
