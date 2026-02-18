"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { PlusCircle, BookOpen, ArrowRight } from "lucide-react";

export default function CreateCoursePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        setIsLoading(true);

        try {
            const res = await fetch("/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/instructor/courses/${data.course.id}`);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold mb-2">
                    Crear <span className="gradient-text">Nuevo Curso</span>
                </h1>
                <p className="text-muted mb-8">
                    Dale un nombre a tu curso. Podrás editarlo más tarde.
                </p>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Nombre del Curso
                        </CardTitle>
                        <CardDescription>
                            ¿Cómo se va a llamar tu curso? No te preocupes, puedes cambiarlo después.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                placeholder="Ej: Desarrollo Web Full-Stack con React"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-base"
                                required
                            />
                            <div className="flex items-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="gradient"
                                    className="gap-2"
                                    isLoading={isLoading}
                                    disabled={!title.trim()}
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    Crear Curso
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
