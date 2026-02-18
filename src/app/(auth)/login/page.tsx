"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Error al iniciar sesión");
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

    const fillDemo = (type: "student" | "instructor") => {
        if (type === "student") {
            setEmail("demo@lumina.com");
            setPassword("demo1234");
        } else {
            setEmail("maria@lumina.com");
            setPassword("instructor1234");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4">
            {/* BG */}
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                {/* Logo */}
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
                        <CardTitle className="text-2xl">Bienvenido de vuelta</CardTitle>
                        <CardDescription>
                            Ingresa tus credenciales para continuar aprendiendo
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">
                                    Email
                                </label>
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
                                <label className="text-sm font-medium text-foreground">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        icon={<Lock className="h-4 w-4" />}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
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
                                Iniciar Sesión
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </form>

                        {/* Demo Accounts */}
                        <div className="mt-6 pt-6 border-t border-border">
                            <p className="text-xs text-center text-muted mb-3">
                                Cuentas demo para explorar:
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fillDemo("student")}
                                    className="text-xs"
                                >
                                    👨‍🎓 Estudiante
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fillDemo("instructor")}
                                    className="text-xs"
                                >
                                    👩‍🏫 Instructora
                                </Button>
                            </div>
                        </div>

                        <p className="text-center text-sm text-muted mt-6">
                            ¿No tienes cuenta?{" "}
                            <Link
                                href="/register"
                                className="text-primary hover:text-primary-hover font-medium transition-colors"
                            >
                                Regístrate gratis
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
