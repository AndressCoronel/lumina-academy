"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"STUDENT" | "INSTRUCTOR">("STUDENT");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Error al registrarse");
                return;
            }

            if (data.user.role === "INSTRUCTOR") {
                router.push("/instructor");
            } else {
                router.push("/student");
            }
            router.refresh();
        } catch {
            setError("Error de conexión");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-primary/30">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">
                        <span className="gradient-text">Lumina</span> Academy
                    </span>
                </Link>

                <Card glass className="border-border/50">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Crea tu cuenta</CardTitle>
                        <CardDescription>
                            Únete a miles de estudiantes en Lumina Academy
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Role Selector */}
                            <div className="grid grid-cols-2 gap-2 p-1 bg-surface rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setRole("STUDENT")}
                                    className={`py-2.5 px-4 rounded-md text-sm font-medium transition-all ${role === "STUDENT"
                                            ? "bg-primary text-white shadow-md"
                                            : "text-muted hover:text-foreground"
                                        }`}
                                >
                                    👨‍🎓 Estudiante
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("INSTRUCTOR")}
                                    className={`py-2.5 px-4 rounded-md text-sm font-medium transition-all ${role === "INSTRUCTOR"
                                            ? "bg-primary text-white shadow-md"
                                            : "text-muted hover:text-foreground"
                                        }`}
                                >
                                    👩‍🏫 Instructor
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Nombre</label>
                                <Input
                                    type="text"
                                    placeholder="Tu nombre completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    icon={<User className="h-4 w-4" />}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email</label>
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    icon={<Mail className="h-4 w-4" />}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Contraseña</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mínimo 6 caracteres"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        icon={<Lock className="h-4 w-4" />}
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="gradient"
                                className="w-full gap-2"
                                size="lg"
                                isLoading={isLoading}
                            >
                                Crear Cuenta
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>

                        <p className="text-center text-sm text-muted mt-6">
                            ¿Ya tienes cuenta?{" "}
                            <Link
                                href="/login"
                                className="text-primary hover:text-primary-hover font-medium transition-colors"
                            >
                                Inicia sesión
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
