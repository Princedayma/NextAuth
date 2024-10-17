// api route

import { connect } from "@/dbConfig/dbConfig";
//import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
  try {
    // Ensure connection is established
    await connect();

    // Parse request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log(savedUser);
   

    // send varification email

    // await sendEmail({
    //   email, emailType: "VERIFY",
    //   userId: savedUser._id
    // })


    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: error.message });
  }
}