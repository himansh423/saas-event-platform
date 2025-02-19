import jwt from "jsonwebtoken";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";
import cookie from "cookie";
import connectToDatabase from "@/library/db";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Database connection failed:", err);
    return NextResponse.json(
      { success: false, message: "Database connection failed" },
      { status: 500 }
    );
  }

  try {
    const { email, otp } = await req.json();

    // Find the user with the matching email and OTP
    const user = await User.findOne({ email, otp });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP or Email" },
        { status: 400 }
      );
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined; // Clear OTP after successful verification
    await user.save();

    // Generate JWT token with essential information
    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        isAnswersPresent: false,
        isProfilePictureUploaded: false,
        isBioAdded: false,
      },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { success: true, message: "OTP verified, Registration successful" },
      { status: 200 }
    );

    // Set token in the response cookie
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error("Server Error:", error);
    if (error instanceof Error)
      return NextResponse.json(
        { success: false, message: "Server error", error: error.message },
        { status: 500 }
      );
  }
}
