// app/api/user/verifyemail/route.ts

import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

// Named export for POST method
export async function POST(request: NextRequest) {
    try {
        // Establish database connection
        await connect();

        // Parse the request body
        const { token } = await request.json();
        console.log("Verification token received:", token);

        if (!token) {
            return NextResponse.json(
                { error: "Token must be provided" },
                { status: 400 }
            );
        }

        // Find the user by verifyToken and check expiry
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
        }

        // Update the user's verification status
        user.isVerified = true;
        user.verifyToken = undefined;  // Clear the token
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error verifying email:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
