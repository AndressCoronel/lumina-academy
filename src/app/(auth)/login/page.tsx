"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <div className="relative min-h-screen flex items-center justify-center px-4 bg-[#000000] text-slate-200 selection:bg-blue-500/30 font-sans selection:text-blue-200 overflow-hidden">
            {/* Fondo Dinámico Minimalista */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[420px]"
            >
                {/* Logo Header */}
                <Link href="/" className="flex flex-col items-center justify-center gap-4 mb-10 group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:scale-105 group-hover:bg-white/10 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                        Lumina <span className="text-slate-500 font-light">Academy</span>
                    </span>
                </Link>

                <div className="rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-2xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Iniciar Sesión</h1>
                        <p className="text-slate-400 text-sm font-light">
                            Bienvenido de vuelta, ingresa para continuar.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    type="email"
                                    placeholder="elon@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center font-medium">
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 gap-2 bg-white text-black hover:bg-slate-200 rounded-xl font-bold text-[15px] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verificando..." : "Ingresar a Lumina"}
                            {!isLoading && <ArrowRight className="h-4 w-4" />}
                        </Button>
                    </form>

                    {/* Cuentas Demo - Diseño Discreto */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <p className="text-[11px] uppercase tracking-wider text-center text-slate-500 font-semibold mb-4">
                            Acceso Rápido Demo
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => fillDemo("student")}
                                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-300 transition-colors"
                            >
                                <span className="text-blue-400">●</span> Estudiante
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemo("instructor")}
                                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-300 transition-colors"
                            >
                                <span className="text-indigo-400">●</span> Instructora
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-slate-500 mt-8 font-light">
                    ¿Aún no tienes cuenta?{" "}
                    <Link
                        href="/register"
                        className="text-white hover:text-blue-400 font-medium transition-colors border-b border-transparent hover:border-blue-400 pb-0.5"
                    >
                        Hazte premium
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
