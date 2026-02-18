"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "bg-primary/15 text-primary border-primary/20",
        secondary: "bg-secondary/15 text-secondary border-secondary/20",
        success: "bg-success/15 text-success border-success/20",
        warning: "bg-warning/15 text-warning border-warning/20",
        destructive: "bg-destructive/15 text-destructive border-destructive/20",
        outline: "border-border text-muted",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}

export { Badge };
