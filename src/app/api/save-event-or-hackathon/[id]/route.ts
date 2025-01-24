import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const { id: eventOrHackathonId } = await req.json();
    await connectToDatabase();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID required",
        },
        { status: 400 }
      );
    }

    await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { savedEventAndHackathon: eventOrHackathonId } },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      message: `Successfuly saved`,
    });
  } catch (error) {
    console.error("Error saving Event or Hackathon", error);
    return NextResponse.json({
      success: false,
      message: "Error saving Event or Hackathon",
    });
  }
}
