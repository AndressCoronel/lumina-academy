"use client";

import { useSidebarStore } from "@/store/use-sidebar-store";

export function DashboardContent({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebarStore();

    return (
        <main
            className={`transition-all duration-300 pt-0 ${isCollapsed ? "lg:pl-[68px]" : "lg:pl-64"
                }`}
        >
            <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
    );
}
