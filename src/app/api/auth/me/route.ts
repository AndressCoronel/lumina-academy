import { NextResponse } from "next/server";
import { getCurrentUser, clearSession } from "@/lib/auth";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ user: null }, { status: 401 });
        }
        return NextResponse.json({ user });
    } catch {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}

export async function DELETE() {
    try {
        await clearSession();
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Error al cerrar sesión" }, { status: 500 });
    }
}
