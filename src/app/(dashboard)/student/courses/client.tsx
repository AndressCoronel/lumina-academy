"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
    Search,
    BookOpen,
    Clock,
    Users,
    Star,
    Play,
    CheckCircle2,
    Filter,
} from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";

interface CourseData {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    category: { id: string; name: string; icon: string | null } | null;
    instructor: { id: string; name: string; avatar: string | null };
    totalLessons: number;
    totalDuration: number;
    chaptersCount: number;
    studentsCount: number;
    isPurchased: boolean;
}

interface CategoryData {
    id: string;
    name: string;
    icon: string | null;
}

interface Props {
    courses: CourseData[];
    categories: CategoryData[];
}

const courseEmojis: Record<string, string> = {
    "Desarrollo Web": "🚀",
    "Data Science": "📊",
    "Diseño": "🎨",
    "IA & ML": "🤖",
    "DevOps": "☁️",
    "Ciberseguridad": "🔒",
};

export function ExploreCoursesClient({ courses, categories }: Props) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filtered = courses.filter((c) => {
        const matchesSearch =
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = !selectedCategory || c.category?.id === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Explorar <span className="gradient-text">Cursos</span>
                </h1>
                <p className="text-muted mt-1">
                    Descubre cursos de alta calidad para impulsar tu carrera
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Input
                        placeholder="Buscar cursos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        icon={<Search className="h-4 w-4" />}
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                    >
                        Todos
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={selectedCategory === cat.id ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                                setSelectedCategory(
                                    selectedCategory === cat.id ? null : cat.id
                                )
                            }
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            {filtered.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Filter className="h-12 w-12 text-muted mb-4" />
                        <h3 className="text-lg font-semibold mb-1">
                            No se encontraron cursos
                        </h3>
                        <p className="text-sm text-muted">
                            Intenta ajustar tus filtros de búsqueda
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link href={`/courses/${course.id}`}>
                                <Card className="card-hover h-full overflow-hidden group cursor-pointer">
                                    {/* Image */}
                                    <div className="relative h-44 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
                                        <span className="text-6xl">
                                            {courseEmojis[course.category?.name || ""] || "📚"}
                                        </span>
                                        {course.isPurchased && (
                                            <div className="absolute top-3 right-3">
                                                <Badge variant="success" className="gap-1">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Inscrito
                                                </Badge>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center shadow-xl">
                                                <Play className="h-6 w-6 text-white ml-0.5" />
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-5">
                                        {course.category && (
                                            <Badge variant="secondary" className="mb-2 text-xs">
                                                {course.category.name}
                                            </Badge>
                                        )}

                                        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                            {course.title}
                                        </h3>

                                        <p className="text-xs text-muted mb-3">
                                            {course.instructor.name}
                                        </p>

                                        {course.description && (
                                            <p className="text-sm text-muted line-clamp-2 mb-4">
                                                {course.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-3 text-xs text-muted mb-4">
                                            <span className="flex items-center gap-1">
                                                <BookOpen className="h-3.5 w-3.5" />
                                                {course.totalLessons} lecciones
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                {formatDuration(course.totalDuration)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3.5 w-3.5" />
                                                {course.studentsCount}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-border">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                <span className="text-sm font-medium">4.8</span>
                                            </div>
                                            {course.isPurchased ? (
                                                <Badge variant="success">Inscrito</Badge>
                                            ) : (
                                                <span className="text-lg font-bold gradient-text">
                                                    {course.price
                                                        ? formatPrice(course.price)
                                                        : "Gratis"}
                                                </span>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
