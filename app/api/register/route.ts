import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();
        console.log("Data diterima:", { name, email });

        const user = await db.user.create({
            data: { name, email }
        });

        console.log("User berhasil dibuat:", user);
        return NextResponse.json({ success: true, user });
    } catch (error) {
        // ✅ Casting error ke tipe 'Error'
        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        console.error("Error saat membuat user:", errorMessage);
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}

