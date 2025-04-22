import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import connectToDatabase from "@/library/database/db";
import User from "@/library/Modal/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isAnswersPresent = Boolean(
      existingUser.questions?.how_do_you_want_to_use_this_platform &&
        existingUser.questions?.what_best_describes_you &&
        existingUser.questions?.how_do_you_heard_about_us
    );
    const isProfilePictureUploaded = Boolean(existingUser.profilePicture);
    const isBioAdded = Boolean(existingUser.bio);

    const token = jwt.sign(
      {
        userId: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        username: existingUser.username,
        email: existingUser.email,
        isAnswersPresent,
        isProfilePictureUploaded,
        isBioAdded,
      },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      userId: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
