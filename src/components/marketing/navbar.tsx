"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    Menu,
    X,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MarketingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "glass-strong shadow-lg shadow-black/20"
                    : "bg-transparent"
                }`}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-lg shadow-primary/30">
                                <GraduationCap className="h-5 w-5 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            <span className="gradient-text">Lumina</span>
                            <span className="text-foreground"> Academy</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/#features"
                            className="text-sm text-muted hover:text-foreground transition-colors"
                        >
                            Características
                        </Link>
                        <Link
                            href="/#courses"
                            className="text-sm text-muted hover:text-foreground transition-colors"
                        >
                            Cursos
                        </Link>
                        <Link
                            href="/#testimonials"
                            className="text-sm text-muted hover:text-foreground transition-colors"
                        >
                            Testimonios
                        </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Iniciar Sesión
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="gradient" size="sm" className="gap-1.5">
                                <Sparkles className="h-3.5 w-3.5" />
                                Comenzar Gratis
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden text-muted hover:text-foreground"
                    >
                        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 py-4 border-t border-border">
                                <Link
                                    href="/#features"
                                    className="text-sm text-muted hover:text-foreground transition-colors"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    Características
                                </Link>
                                <Link
                                    href="/#courses"
                                    className="text-sm text-muted hover:text-foreground transition-colors"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    Cursos
                                </Link>
                                <Link
                                    href="/#testimonials"
                                    className="text-sm text-muted hover:text-foreground transition-colors"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    Testimonios
                                </Link>
                                <div className="flex flex-col gap-2 pt-2">
                                    <Link href="/login">
                                        <Button variant="outline" className="w-full">
                                            Iniciar Sesión
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button variant="gradient" className="w-full gap-1.5">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            Comenzar Gratis
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
