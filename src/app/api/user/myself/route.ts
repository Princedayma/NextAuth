import { getDataFromToken } from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        // Extract the Authorization header from the request
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({ error: "Authorization header must be provided" }), { status: 400 });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: "JWT must be provided" }, { status: 400 });
        }

        // Get user ID from the token
        const userId = getDataFromToken(request);

        // Find the user by ID and exclude the password field
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User Found",
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
