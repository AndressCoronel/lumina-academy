"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    BookOpen,
    Trophy,
    Flame,
    Target,
    ArrowRight,
    Play,
    Clock,
    TrendingUp,
} from "lucide-react";
import type { SafeUser, DashboardStats } from "@/types";

interface CourseWithProgress {
    id: string;
    title: string;
    imageUrl: string | null;
    category: { name: string } | null;
    instructor: { name: string; avatar: string | null };
    totalLessons: number;
    completedLessons: number;
    progress: number;
}

interface Props {
    user: SafeUser;
    courses: CourseWithProgress[];
    stats: DashboardStats;
}

const statCards = [
    {
        key: "totalCourses",
        title: "Cursos Inscritos",
        icon: BookOpen,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        key: "completedCourses",
        title: "Completados",
        icon: Trophy,
        color: "text-sky-400",
        bg: "bg-sky-500/10",
        border: "border-sky-500/20",
    },
    {
        key: "inProgressCourses",
        title: "En Progreso",
        icon: Flame,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
    },
    {
        key: "averageProgress",
        title: "Progreso Promedio",
        icon: Target,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
        suffix: "%",
    },
];

export function StudentDashboardClient({ user, courses, stats }: Props) {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold">
                    Hola, <span className="gradient-text">{user.name.split(" ")[0]}</span>{" "}
                    👋
                </h1>
                <p className="text-muted mt-1">
                    Continúa aprendiendo donde lo dejaste
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className={`border-${stat.border} hover:glow transition-all duration-300`}>
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted font-medium uppercase tracking-wider">
                                            {stat.title}
                                        </p>
                                        <p className="text-3xl font-bold mt-1">
                                            {stats[stat.key as keyof DashboardStats]}
                                            {stat.suffix || ""}
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

            {/* Courses In Progress */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Continuar Aprendiendo</h2>
                    <Link href="/student/my-courses">
                        <Button variant="ghost" size="sm" className="gap-1">
                            Ver todos <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {courses.length === 0 ? (
                    <Card className="border-dashed border-border">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                <BookOpen className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                No tienes cursos aún
                            </h3>
                            <p className="text-sm text-muted mb-4">
                                Explora nuestro catálogo y empieza a aprender hoy
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses
                            .filter((c) => c.progress < 100)
                            .slice(0, 6)
                            .map((course, i) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    <Link href={`/student/my-courses`}>
                                        <Card className="card-hover group cursor-pointer h-full">
                                            <CardContent className="p-5">
                                                <div className="flex items-start gap-4">
                                                    <div className="h-12 w-12 rounded-xl gradient-primary-subtle flex items-center justify-center shrink-0">
                                                        <Play className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                                                            {course.title}
                                                        </h3>
                                                        <p className="text-xs text-muted mb-3">
                                                            {course.instructor.name}
                                                        </p>

                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between text-xs">
                                                                <span className="text-muted">
                                                                    {course.completedLessons}/{course.totalLessons}{" "}
                                                                    lecciones
                                                                </span>
                                                                <span className="font-medium text-primary">
                                                                    {course.progress}%
                                                                </span>
                                                            </div>
                                                            <Progress value={course.progress} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                    </div>
                )}
            </div>

            {/* Completed Courses */}
            {courses.filter((c) => c.progress === 100).length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-blue-400" />
                        Cursos Completados
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses
                            .filter((c) => c.progress === 100)
                            .map((course, i) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className="border-success/20 bg-success/5">
                                        <CardContent className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                                                    <Trophy className="h-5 w-5 text-success" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm truncate">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-xs text-success">
                                                        ✓ Completado · {course.totalLessons} lecciones
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
