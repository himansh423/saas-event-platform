import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

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

    user.importantQuestions = payload.questions;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Answers saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user answers:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
