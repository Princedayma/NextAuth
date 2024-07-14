// pages/api/user/login.js
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    // Ensure connection is established
    await connect();

    // Parse request body
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Ensure TOKEN_SECRET is defined
    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET environment variable is not defined");
    }

    // Generate token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1h" });

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token,
    });

    // Set token in cookies
    response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

    return response;
  } catch (error) {
    console.error("Error during login:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
