"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <div className="relative min-h-screen flex items-center justify-center px-4 bg-[#000000] text-slate-200 selection:bg-purple-500/30 font-sans selection:text-purple-200 overflow-hidden py-12">
            {/* Background Minimalista */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 left-1/4 w-[30%] h-[50%] bg-fuchsia-600/10 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[420px]"
            >
                {/* Logo Header */}
                <Link href="/" className="flex flex-col items-center justify-center gap-4 mb-8 group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:scale-105 group-hover:bg-white/10 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                        Lumina <span className="text-slate-500 font-light">Academy</span>
                    </span>
                </Link>

                <div className="rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-2xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Crea tu cuenta</h1>
                        <p className="text-slate-400 text-sm font-light">
                            Únete ahora y domina las habilidades del futuro.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Selector de Rol Moderno */}
                        <div className="p-1.5 bg-[#111] rounded-[1rem] flex gap-1 border border-white/5 relative z-10">
                            <button
                                type="button"
                                onClick={() => setRole("STUDENT")}
                                className={`flex-1 flex justify-center py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all ${role === "STUDENT"
                                    ? "bg-white/10 text-white shadow-md border border-white/10"
                                    : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                Estudiante
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("INSTRUCTOR")}
                                className={`flex-1 flex justify-center py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all ${role === "INSTRUCTOR"
                                    ? "bg-white/10 text-white shadow-md border border-white/10"
                                    : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                Instructor
                            </button>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                                Nombre
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    type="text"
                                    placeholder="Ada Lovelace"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 rounded-xl transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    type="email"
                                    placeholder="ada@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 rounded-xl transition-all"
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
                                    placeholder="Mínimo 6 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 rounded-xl transition-all"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                            className="w-full h-12 gap-2 bg-white text-black hover:bg-slate-200 rounded-xl font-bold text-[15px] transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creando perfil..." : "Forjar carrera hoy"}
                            {!isLoading && <ArrowRight className="h-4 w-4" />}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500 mt-8 font-light">
                    ¿Ya tienes una cuenta premium?{" "}
                    <Link
                        href="/login"
                        className="text-white hover:text-purple-400 font-medium transition-colors border-b border-transparent hover:border-purple-400 pb-0.5"
                    >
                        Inicia sesión aquí
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
