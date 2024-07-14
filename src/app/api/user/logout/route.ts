import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        });

        response.cookies.delete('token');
        return response; // Ensure the response is returned properly
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
