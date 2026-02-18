"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
    src?: string | null;
    name: string;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
};

function Avatar({
    className,
    src,
    name,
    size = "md",
    ...props
}: AvatarProps) {
    return (
        <AvatarPrimitive.Root
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full",
                sizeClasses[size],
                className
            )}
            {...props}
        >
            <AvatarPrimitive.Image
                src={src || undefined}
                alt={name}
                className="aspect-square h-full w-full object-cover"
            />
            <AvatarPrimitive.Fallback
                className="flex h-full w-full items-center justify-center rounded-full gradient-primary font-semibold text-white"
            >
                {getInitials(name)}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
}

export { Avatar };
