"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    LayoutDashboard,
    BookOpen,
    Library,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    PlusCircle,
    BarChart3,
    Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SafeUser } from "@/types";

interface DashboardSidebarProps {
    user: SafeUser;
}

const studentNavItems = [
    { title: "Dashboard", href: "/student", icon: LayoutDashboard },
    { title: "Explorar Cursos", href: "/student/courses", icon: BookOpen },
    { title: "Mis Cursos", href: "/student/my-courses", icon: Library },
    { title: "Configuración", href: "/student/settings", icon: Settings },
];

const instructorNavItems = [
    { title: "Dashboard", href: "/instructor", icon: LayoutDashboard },
    { title: "Mis Cursos", href: "/instructor/courses", icon: BookOpen },
    { title: "Crear Curso", href: "/instructor/courses/create", icon: PlusCircle },
    { title: "Analytics", href: "/instructor/analytics", icon: BarChart3 },
    { title: "Estudiantes", href: "/instructor/students", icon: Users },
    { title: "Configuración", href: "/instructor/settings", icon: Settings },
];

export function DashboardSidebar({ user }: DashboardSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { isCollapsed, isMobileOpen, toggle, setMobileOpen } = useSidebarStore();

    const navItems =
        user.role === "INSTRUCTOR" ? instructorNavItems : studentNavItems;

    const handleLogout = async () => {
        await fetch("/api/auth/me", { method: "DELETE" });
        router.push("/login");
        router.refresh();
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen flex flex-col transition-all duration-300 ease-in-out glass-strong
          ${isCollapsed ? "w-[68px]" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Header */}
                <div className="flex items-center h-16 px-4 border-b border-border/50">
                    <Link href="/" className="flex items-center gap-2 overflow-hidden">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
                            <GraduationCap className="h-4 w-4 text-white" />
                        </div>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-lg font-bold whitespace-nowrap"
                            >
                                <span className="gradient-text">Lumina</span>
                            </motion.span>
                        )}
                    </Link>

                    {/* Mobile Close */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden ml-auto text-muted hover:text-foreground"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/student" &&
                                item.href !== "/instructor" &&
                                pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                  ${isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted hover:text-foreground hover:bg-card"
                                    }
                  ${isCollapsed ? "justify-center" : ""}`}
                                title={isCollapsed ? item.title : undefined}
                            >
                                <item.icon
                                    className={`h-5 w-5 shrink-0 ${isActive ? "text-primary" : "text-muted group-hover:text-foreground"
                                        }`}
                                />
                                {!isCollapsed && <span>{item.title}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="border-t border-border/50 p-3 space-y-2">
                    {/* Collapse Button - Desktop only */}
                    <button
                        onClick={toggle}
                        className="hidden lg:flex items-center justify-center w-full py-2 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <div className="flex items-center gap-2 text-xs">
                                <ChevronLeft className="h-4 w-4" />
                                <span>Colapsar</span>
                            </div>
                        )}
                    </button>

                    {/* User Info */}
                    <div
                        className={`flex items-center gap-3 rounded-lg p-2 ${isCollapsed ? "justify-center" : ""
                            }`}
                    >
                        <Avatar name={user.name} src={user.avatar} size="sm" />
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-muted truncate">{user.email}</p>
                            </div>
                        )}
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-muted hover:text-destructive hover:bg-destructive/10 transition-all
              ${isCollapsed ? "justify-center" : ""}`}
                        title={isCollapsed ? "Cerrar sesión" : undefined}
                    >
                        <LogOut className="h-4 w-4 shrink-0" />
                        {!isCollapsed && <span>Cerrar sesión</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}

export function DashboardNavbar({ user }: { user: SafeUser }) {
    const { isCollapsed, setMobileOpen } = useSidebarStore();

    return (
        <header
            className={`sticky top-0 z-30 h-16 glass-strong border-b border-border/50 transition-all duration-300
        ${isCollapsed ? "lg:pl-[68px]" : "lg:pl-64"}`}
        >
            <div className="flex items-center justify-between h-full px-4 sm:px-6">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="lg:hidden text-muted hover:text-foreground"
                >
                    <Menu className="h-6 w-6" />
                </button>

                <div className="hidden lg:block" />

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted capitalize">
                            {user.role === "INSTRUCTOR" ? "Instructor" : "Estudiante"}
                        </p>
                    </div>
                    <Avatar name={user.name} src={user.avatar} size="md" />
                </div>
            </div>
        </header>
    );
}
