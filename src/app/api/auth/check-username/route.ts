import connectToDatabase from "@/library/database/db";
import User from "@/library/Modal/User";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username is required" },
        { status: 400 }
      );
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return NextResponse.json(
        { success: true, message: "Username already taken" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Valid username" },
      { status: 200 }
    );
  } catch (error) {
    // Log the error to debug
    console.error("Error checking username:", error);
    return NextResponse.json(
      { message: "Server error", error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
