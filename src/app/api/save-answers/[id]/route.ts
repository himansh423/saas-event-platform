import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const payload = await req.json();
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    user.questions = payload.questions;
    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAnswersPresent: true,
        isProfilePictureUploaded: false,
        isBioAdded: false,
      },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { success: true, message: "Answers Successfully saved in on database." },
      { status: 200 }
    );

    response.headers.append(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    response.headers.append(
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
    console.error("Error updating user answers:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
