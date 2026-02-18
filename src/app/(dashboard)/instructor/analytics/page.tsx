import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import {
    BarChart3,
    TrendingUp,
    DollarSign,
    Users,
    BookOpen,
} from "lucide-react";

export default async function InstructorAnalyticsPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");
    if (user.role !== "INSTRUCTOR") redirect("/student");

    const courses = await db.course.findMany({
        where: { instructorId: user.id },
        include: {
            _count: { select: { purchases: true } },
            purchases: {
                select: { price: true, createdAt: true },
            },
        },
    });

    const totalRevenue = courses.reduce(
        (acc, c) => acc + c.purchases.reduce((a, p) => a + p.price, 0),
        0
    );
    const totalStudents = courses.reduce(
        (acc, c) => acc + c._count.purchases,
        0
    );

    const courseStats = courses.map((c) => ({
        title: c.title,
        students: c._count.purchases,
        revenue: c.purchases.reduce((a, p) => a + p.price, 0),
        isPublished: c.isPublished,
    }));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    <span className="gradient-text">Analytics</span>
                </h1>
                <p className="text-muted mt-1">Métricas de rendimiento de tus cursos</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted uppercase tracking-wider">
                                    Ingresos Totales
                                </p>
                                <p className="text-3xl font-bold mt-1">
                                    {formatPrice(totalRevenue)}
                                </p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-sky-500/10 flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-sky-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted uppercase tracking-wider">
                                    Estudiantes Totales
                                </p>
                                <p className="text-3xl font-bold mt-1">{totalStudents}</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted uppercase tracking-wider">
                                    Cursos Publicados
                                </p>
                                <p className="text-3xl font-bold mt-1">
                                    {courses.filter((c) => c.isPublished).length}
                                </p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-indigo-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Course Breakdown */}
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Desglose por Curso
                </h2>
                <div className="space-y-3">
                    {courseStats.length === 0 ? (
                        <Card className="border-dashed">
                            <CardContent className="p-8 text-center">
                                <TrendingUp className="h-12 w-12 text-muted mx-auto mb-3" />
                                <p className="text-muted">
                                    Las métricas aparecerán cuando tengas cursos con estudiantes
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        courseStats.map((stat, i) => {
                            const maxStudents = Math.max(...courseStats.map((s) => s.students), 1);
                            const barWidth = (stat.students / maxStudents) * 100;
                            return (
                                <Card key={i}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-sm truncate">
                                                    {stat.title}
                                                </h3>
                                                <p className="text-xs text-muted">
                                                    {stat.students} estudiantes · {formatPrice(stat.revenue)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                                            <div
                                                className="h-full gradient-primary rounded-full transition-all duration-500"
                                                style={{ width: `${barWidth}%` }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
