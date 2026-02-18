"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
    Play,
    BookOpen,
    Clock,
    Users,
    Star,
    Lock,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Award,
    Globe,
    Sparkles,
} from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";

interface ChapterData {
    id: string;
    title: string;
    position: number;
    lessons: LessonData[];
}

interface LessonData {
    id: string;
    title: string;
    duration: number | null;
    isFree: boolean;
    position: number;
}

interface Props {
    course: {
        id: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        category: { name: string } | null;
        instructor: { id: string; name: string; avatar: string | null; bio: string | null };
        chapters: ChapterData[];
    };
    isPurchased: boolean;
    totalLessons: number;
    totalDuration: number;
    studentsCount: number;
}

const courseEmojis: Record<string, string> = {
    "Desarrollo Web": "🚀",
    "Data Science": "📊",
    "Diseño": "🎨",
    "IA & ML": "🤖",
    "DevOps": "☁️",
    "Ciberseguridad": "🔒",
};

export function CourseDetailClient({
    course,
    isPurchased,
    totalLessons,
    totalDuration,
    studentsCount,
}: Props) {
    const router = useRouter();
    const [expandedChapters, setExpandedChapters] = useState<string[]>(
        course.chapters.length > 0 ? [course.chapters[0].id] : []
    );
    const [isEnrolling, setIsEnrolling] = useState(false);

    const toggleChapter = (id: string) => {
        setExpandedChapters((prev) =>
            prev.includes(id)
                ? prev.filter((c) => c !== id)
                : [...prev, id]
        );
    };

    const handleEnroll = async () => {
        setIsEnrolling(true);
        try {
            const res = await fetch(`/api/courses/${course.id}/purchase`, {
                method: "POST",
            });
            if (res.ok) {
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsEnrolling(false);
        }
    };

    const firstLessonId = course.chapters[0]?.lessons[0]?.id;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="overflow-hidden">
                    <div className="relative h-48 sm:h-64 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
                        <span className="text-8xl">
                            {courseEmojis[course.category?.name || ""] || "📚"}
                        </span>
                    </div>
                    <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1">
                                {course.category && (
                                    <Badge variant="secondary" className="mb-3">
                                        {course.category.name}
                                    </Badge>
                                )}
                                <h1 className="text-2xl sm:text-3xl font-bold mb-3">
                                    {course.title}
                                </h1>
                                {course.description && (
                                    <p className="text-muted leading-relaxed mb-4">
                                        {course.description}
                                    </p>
                                )}

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        4.8
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {studentsCount} estudiantes
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" />
                                        {totalLessons} lecciones
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {formatDuration(totalDuration)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Globe className="h-4 w-4" />
                                        Español
                                    </span>
                                </div>

                                {/* Instructor */}
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-surface">
                                    <Avatar
                                        name={course.instructor.name}
                                        src={course.instructor.avatar}
                                        size="lg"
                                    />
                                    <div>
                                        <p className="font-semibold">{course.instructor.name}</p>
                                        <p className="text-sm text-muted">Instructor</p>
                                    </div>
                                </div>
                            </div>

                            {/* Price Card */}
                            <div className="lg:w-72 shrink-0">
                                <Card className="border-primary/20 sticky top-24">
                                    <CardContent className="p-6 space-y-4">
                                        {!isPurchased && (
                                            <div className="text-center">
                                                <p className="text-3xl font-bold gradient-text">
                                                    {course.price
                                                        ? formatPrice(course.price)
                                                        : "Gratis"}
                                                </p>
                                            </div>
                                        )}

                                        {isPurchased ? (
                                            <Link
                                                href={`/courses/${course.id}/learn/${firstLessonId}`}
                                            >
                                                <Button
                                                    variant="gradient"
                                                    size="lg"
                                                    className="w-full gap-2"
                                                >
                                                    <Play className="h-5 w-5" />
                                                    Continuar Aprendiendo
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button
                                                variant="gradient"
                                                size="lg"
                                                className="w-full gap-2"
                                                onClick={handleEnroll}
                                                isLoading={isEnrolling}
                                            >
                                                <Sparkles className="h-5 w-5" />
                                                {course.price ? "Inscribirme Ahora" : "Inscribirme Gratis"}
                                            </Button>
                                        )}

                                        <div className="space-y-3 pt-4 border-t border-border">
                                            {[
                                                "Acceso de por vida",
                                                "Certificado de finalización",
                                                "Quizzes interactivos",
                                                "AI Study Buddy",
                                                "Soporte de la comunidad",
                                            ].map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-2 text-sm text-muted"
                                                >
                                                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Curriculum */}
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Contenido del Curso
                </h2>
                <p className="text-sm text-muted mb-6">
                    {course.chapters.length} capítulos · {totalLessons} lecciones ·{" "}
                    {formatDuration(totalDuration)} de contenido
                </p>

                <div className="space-y-3">
                    {course.chapters.map((chapter, i) => (
                        <motion.div
                            key={chapter.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Card>
                                <button
                                    onClick={() => toggleChapter(chapter.id)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-card-hover transition-colors rounded-t-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                                            {i + 1}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-medium text-sm">{chapter.title}</h3>
                                            <p className="text-xs text-muted">
                                                {chapter.lessons.length} lecciones
                                            </p>
                                        </div>
                                    </div>
                                    {expandedChapters.includes(chapter.id) ? (
                                        <ChevronDown className="h-4 w-4 text-muted" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-muted" />
                                    )}
                                </button>

                                {expandedChapters.includes(chapter.id) && (
                                    <div className="border-t border-border">
                                        {chapter.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className="flex items-center justify-between px-4 py-3 hover:bg-surface/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {isPurchased || lesson.isFree ? (
                                                        <Play className="h-4 w-4 text-primary" />
                                                    ) : (
                                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <span className="text-sm">{lesson.title}</span>
                                                    {lesson.isFree && !isPurchased && (
                                                        <Badge variant="success" className="text-[10px] py-0">
                                                            Gratis
                                                        </Badge>
                                                    )}
                                                </div>
                                                {lesson.duration && (
                                                    <span className="text-xs text-muted">
                                                        {formatDuration(lesson.duration)}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
