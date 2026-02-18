"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    BookOpen,
    Users,
    DollarSign,
    FileText,
    PlusCircle,
    BarChart3,
    ArrowRight,
    Eye,
    EyeOff,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { SafeUser, InstructorStats } from "@/types";

interface CourseData {
    id: string;
    title: string;
    isPublished: boolean;
    category: { name: string } | null;
    chapters: { lessons: { id: string }[] }[];
    _count: { purchases: number };
}

interface Props {
    user: SafeUser;
    courses: CourseData[];
    stats: InstructorStats;
}

const statCards = [
    {
        key: "totalCourses",
        title: "Mis Cursos",
        icon: BookOpen,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
    },
    {
        key: "totalStudents",
        title: "Estudiantes",
        icon: Users,
        color: "text-sky-400",
        bg: "bg-sky-500/10",
    },
    {
        key: "totalRevenue",
        title: "Ingresos Totales",
        icon: DollarSign,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        format: "currency",
    },
    {
        key: "totalLessons",
        title: "Total Lecciones",
        icon: FileText,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
    },
];

export function InstructorDashboardClient({ user, courses, stats }: Props) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold">
                        Panel de{" "}
                        <span className="gradient-text">Instructor</span>
                    </h1>
                    <p className="text-muted mt-1">
                        Gestiona tus cursos y revisa tus métricas
                    </p>
                </div>
                <Link href="/instructor/courses/create">
                    <Button variant="gradient" className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Crear Curso
                    </Button>
                </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted font-medium uppercase tracking-wider">
                                            {stat.title}
                                        </p>
                                        <p className="text-3xl font-bold mt-1">
                                            {stat.format === "currency"
                                                ? formatPrice(stats[stat.key as keyof InstructorStats] as number)
                                                : stats[stat.key as keyof InstructorStats]}
                                        </p>
                                    </div>
                                    <div
                                        className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}
                                    >
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Courses List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Tus Cursos</h2>
                {courses.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <BookOpen className="h-12 w-12 text-muted mb-4" />
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
                    <div className="space-y-3">
                        {courses.map((course, i) => {
                            const lessonCount = course.chapters.reduce(
                                (acc, ch) => acc + ch.lessons.length,
                                0
                            );
                            return (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link href={`/instructor/courses/${course.id}`}>
                                        <Card className="card-hover cursor-pointer">
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl gradient-primary-subtle flex items-center justify-center shrink-0">
                                                    <BookOpen className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-sm truncate">
                                                            {course.title}
                                                        </h3>
                                                        <Badge
                                                            variant={
                                                                course.isPublished ? "success" : "warning"
                                                            }
                                                            className="shrink-0"
                                                        >
                                                            {course.isPublished ? (
                                                                <>
                                                                    <Eye className="h-3 w-3 mr-1" />
                                                                    Publicado
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <EyeOff className="h-3 w-3 mr-1" />
                                                                    Borrador
                                                                </>
                                                            )}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-muted">
                                                        {course.category && (
                                                            <span>{course.category.name}</span>
                                                        )}
                                                        <span>
                                                            {course.chapters.length} cap. · {lessonCount}{" "}
                                                            lecciones
                                                        </span>
                                                        <span>
                                                            {course._count.purchases} estudiantes
                                                        </span>
                                                    </div>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-muted shrink-0" />
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
