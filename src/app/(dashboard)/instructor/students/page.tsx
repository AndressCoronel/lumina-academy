import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Calendar } from "lucide-react";

export default async function InstructorStudentsPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");
    if (user.role !== "INSTRUCTOR") redirect("/student");

    const purchases = await db.purchase.findMany({
        where: {
            course: { instructorId: user.id },
        },
        include: {
            user: {
                select: { id: true, name: true, email: true, avatar: true, createdAt: true },
            },
            course: {
                select: { title: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    // Group by student
    const studentMap = new Map<
        string,
        {
            student: { id: string; name: string; email: string; avatar: string | null; createdAt: Date };
            courses: string[];
            totalSpent: number;
        }
    >();

    purchases.forEach((p) => {
        const existing = studentMap.get(p.user.id);
        if (existing) {
            existing.courses.push(p.course.title);
            existing.totalSpent += p.price;
        } else {
            studentMap.set(p.user.id, {
                student: p.user,
                courses: [p.course.title],
                totalSpent: p.price,
            });
        }
    });

    const students = Array.from(studentMap.values());

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    <span className="gradient-text">Estudiantes</span>
                </h1>
                <p className="text-muted mt-1">
                    {students.length} estudiantes inscritos en tus cursos
                </p>
            </div>

            {students.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Users className="h-16 w-16 text-muted mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            Aún no tienes estudiantes
                        </h3>
                        <p className="text-sm text-muted">
                            Publica cursos para empezar a atraer estudiantes
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {students.map((s) => (
                        <Card key={s.student.id} className="card-hover">
                            <CardContent className="p-4 flex items-center gap-4">
                                <Avatar
                                    name={s.student.name}
                                    src={s.student.avatar}
                                    size="md"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-sm">{s.student.name}</h3>
                                    <p className="text-xs text-muted">{s.student.email}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {s.courses.map((courseTitle, i) => (
                                            <Badge key={i} variant="secondary" className="text-[10px]">
                                                <BookOpen className="h-2.5 w-2.5 mr-1" />
                                                {courseTitle.length > 30
                                                    ? courseTitle.substring(0, 30) + "..."
                                                    : courseTitle}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right shrink-0 hidden sm:block">
                                    <p className="text-sm font-medium">{s.courses.length} cursos</p>
                                    <p className="text-xs text-muted flex items-center gap-1 justify-end">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(s.student.createdAt).toLocaleDateString("es-ES", {
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
