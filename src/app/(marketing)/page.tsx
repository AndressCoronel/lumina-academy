"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
    Sparkles,
    Play,
    BookOpen,
    Users,
    Award,
    Brain,
    Code2,
    Palette,
    Shield,
    Cloud,
    BarChart3,
    CheckCircle2,
    ArrowRight,
    Star,
    Zap,
    Globe,
    Monitor,
} from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const featuredCourses = [
    {
        title: "Desarrollo Web Full-Stack con React & Node.js",
        instructor: "María González",
        image: "🚀",
        category: "Desarrollo Web",
        price: 49.99,
        rating: 4.9,
        students: 2847,
        lessons: 20,
        color: "from-blue-500/20 to-indigo-500/20",
        border: "border-blue-500/20",
    },
    {
        title: "Python para Data Science",
        instructor: "Carlos Méndez",
        image: "📊",
        category: "Data Science",
        price: 39.99,
        rating: 4.8,
        students: 1923,
        lessons: 16,
        color: "from-emerald-500/20 to-teal-500/20",
        border: "border-emerald-500/20",
    },
    {
        title: "Diseño UX/UI Profesional",
        instructor: "María González",
        image: "🎨",
        category: "Diseño",
        price: 44.99,
        rating: 4.9,
        students: 1556,
        lessons: 14,
        color: "from-pink-500/20 to-rose-500/20",
        border: "border-pink-500/20",
    },
    {
        title: "Machine Learning desde Cero",
        instructor: "Carlos Méndez",
        image: "🤖",
        category: "IA & ML",
        price: 59.99,
        rating: 4.7,
        students: 1234,
        lessons: 18,
        color: "from-violet-500/20 to-purple-500/20",
        border: "border-violet-500/20",
    },
];

const features = [
    {
        icon: Play,
        title: "Video Player Pro",
        description:
            "Reproductor que guarda tu progreso exacto y marca lecciones como completadas automáticamente.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
    },
    {
        icon: Brain,
        title: "AI Study Buddy",
        description:
            "Un asistente IA que responde tus dudas en tiempo real basándose en el contexto de la lección.",
        color: "text-violet-400",
        bg: "bg-violet-500/10",
    },
    {
        icon: Award,
        title: "Quizzes Interactivos",
        description:
            "Valida tu conocimiento con cuestionarios al final de cada capítulo con múltiples tipos de preguntas.",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
    },
    {
        icon: BarChart3,
        title: "Dashboard de Progreso",
        description:
            "Visualiza tu avance con barras de progreso en tiempo real y estadísticas detalladas.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
    },
    {
        icon: Monitor,
        title: "Panel de Instructor",
        description:
            "Herramientas completas para crear, gestionar y analizar cursos con métricas en tiempo real.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
    },
    {
        icon: Zap,
        title: "Experiencia Premium",
        description:
            "Interfaz moderna con animaciones suaves, modo oscuro y diseño glassmorphism de última generación.",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
    },
];

const stats = [
    { value: "10K+", label: "Estudiantes Activos", icon: Users },
    { value: "200+", label: "Cursos Disponibles", icon: BookOpen },
    { value: "50+", label: "Instructores Expertos", icon: Award },
    { value: "95%", label: "Tasa de Satisfacción", icon: Star },
];

const testimonials = [
    {
        name: "Laura Martínez",
        role: "Full-Stack Developer @ Google",
        content:
            "Lumina Academy transformó mi carrera. Los cursos son de calidad excepcional y el AI Study Buddy es increíble para resolver dudas al instante.",
        avatar: "LM",
        rating: 5,
    },
    {
        name: "Diego Fernández",
        role: "Data Scientist @ Microsoft",
        content:
            "El sistema de seguimiento de progreso me mantuvo motivado. Completé el curso de ML en 3 semanas y conseguí mi trabajo soñado.",
        avatar: "DF",
        rating: 5,
    },
    {
        name: "Sofía Rodríguez",
        role: "UX Designer @ Spotify",
        content:
            "Los quizzes interactivos y las lecciones prácticas hacen que aprender sea una experiencia realmente inmersiva. 100% recomendado.",
        avatar: "SR",
        rating: 5,
    },
];

const categoryIcons: Record<string, React.ElementType> = {
    "Desarrollo Web": Code2,
    "Data Science": BarChart3,
    "Diseño": Palette,
    "IA & ML": Brain,
    "DevOps": Cloud,
    "Ciberseguridad": Shield,
};

export default function HomePage() {
    return (
        <div className="relative overflow-hidden">
            {/* === HERO SECTION === */}
            <section className="relative min-h-screen flex items-center justify-center pt-16">
                {/* BG Effects */}
                <div className="absolute inset-0 dot-pattern opacity-30" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge className="mb-6 px-4 py-1.5 text-sm">
                                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                                Plataforma de Aprendizaje #1 en Tecnología
                            </Badge>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
                        >
                            Domina las{" "}
                            <span className="gradient-text">habilidades del futuro</span>{" "}
                            con expertos de la industria
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            Cursos interactivos con video, quizzes, seguimiento de progreso
                            y un asistente IA para resolver tus dudas en tiempo real.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link href="/register">
                                <Button variant="gradient" size="xl" className="gap-2 group">
                                    <Sparkles className="h-5 w-5" />
                                    Comenzar Gratis
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/#courses">
                                <Button variant="outline" size="xl" className="gap-2">
                                    <Play className="h-5 w-5" />
                                    Explorar Cursos
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            variants={fadeInUp}
                            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto"
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <stat.icon className="h-5 w-5 text-primary mr-1.5" />
                                        <span className="text-2xl sm:text-3xl font-bold gradient-text">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* === FEATURES SECTION === */}
            <section id="features" className="relative py-24">
                <div className="absolute inset-0 gradient-primary-subtle" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge variant="secondary" className="mb-4">
                            <Globe className="h-3.5 w-3.5 mr-1.5" />
                            Funcionalidades
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Todo lo que necesitas para{" "}
                            <span className="gradient-text">aprender mejor</span>
                        </h2>
                        <p className="text-muted max-w-2xl mx-auto">
                            Herramientas diseñadas para maximizar tu experiencia de aprendizaje
                            y ayudarte a alcanzar tus objetivos profesionales.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="card-hover h-full bg-card/50 hover:bg-card border-border/50 hover:border-primary/20">
                                    <CardContent className="p-6">
                                        <div
                                            className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${feature.bg} mb-4`}
                                        >
                                            <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === COURSES SECTION === */}
            <section id="courses" className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge variant="success" className="mb-4">
                            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                            Catálogo
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Cursos <span className="gradient-text">destacados</span>
                        </h2>
                        <p className="text-muted max-w-2xl mx-auto">
                            Aprende de los mejores instructores con contenido actualizado y
                            proyectos prácticos del mundo real.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCourses.map((course, i) => {
                            const CategoryIcon =
                                categoryIcons[course.category] || BookOpen;
                            return (
                                <motion.div
                                    key={course.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href="/login">
                                        <Card
                                            className={`card-hover h-full bg-card/50 border-border/50 hover:${course.border} overflow-hidden group cursor-pointer`}
                                        >
                                            {/* Course Image */}
                                            <div
                                                className={`relative h-40 bg-gradient-to-br ${course.color} flex items-center justify-center`}
                                            >
                                                <span className="text-5xl">{course.image}</span>
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                                                        <Play className="h-5 w-5 text-white ml-0.5" />
                                                    </div>
                                                </div>
                                            </div>

                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CategoryIcon className="h-3.5 w-3.5 text-primary" />
                                                    <span className="text-xs text-primary font-medium">
                                                        {course.category}
                                                    </span>
                                                </div>

                                                <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-snug">
                                                    {course.title}
                                                </h3>

                                                <p className="text-xs text-muted mb-3">
                                                    {course.instructor}
                                                </p>

                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                                        <span className="text-xs font-medium">
                                                            {course.rating}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-xs text-muted">
                                                        {course.students.toLocaleString()} estudiantes
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t border-border">
                                                    <span className="text-lg font-bold gradient-text">
                                                        ${course.price}
                                                    </span>
                                                    <span className="text-xs text-muted">
                                                        {course.lessons} lecciones
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/login">
                            <Button variant="outline" size="lg" className="gap-2">
                                Ver todos los cursos
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* === TESTIMONIALS SECTION === */}
            <section id="testimonials" className="py-24 relative">
                <div className="absolute inset-0 gradient-primary-subtle" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge variant="warning" className="mb-4">
                            <Star className="h-3.5 w-3.5 mr-1.5" />
                            Testimonios
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Lo que dicen{" "}
                            <span className="gradient-text">nuestros estudiantes</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <Card className="h-full bg-card/50 border-border/50">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-1 mb-4">
                                            {Array.from({ length: testimonial.rating }).map(
                                                (_, j) => (
                                                    <Star
                                                        key={j}
                                                        className="h-4 w-4 fill-amber-400 text-amber-400"
                                                    />
                                                )
                                            )}
                                        </div>
                                        <p className="text-sm text-muted leading-relaxed mb-6">
                                            &ldquo;{testimonial.content}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold text-white">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {testimonial.name}
                                                </p>
                                                <p className="text-xs text-muted">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="relative overflow-hidden border-primary/20">
                            <div className="absolute inset-0 gradient-primary opacity-10" />
                            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <CardContent className="relative p-8 sm:p-12 text-center">
                                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                    ¿Listo para{" "}
                                    <span className="gradient-text">transformar tu carrera</span>?
                                </h2>
                                <p className="text-muted max-w-xl mx-auto mb-8">
                                    Únete a miles de profesionales que ya están aprendiendo con
                                    Lumina Academy. Tu primer curso te espera.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/register">
                                        <Button variant="gradient" size="xl" className="gap-2">
                                            <Sparkles className="h-5 w-5" />
                                            Crear Cuenta Gratuita
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center gap-6 mt-8">
                                    {[
                                        "Sin tarjeta de crédito",
                                        "Acceso inmediato",
                                        "Cancela cuando quieras",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-1.5 text-sm text-muted"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-success" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
