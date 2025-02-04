import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    await connectToDatabase();

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        savedEventAndHackathon: user.savedEventAndHackathon,
        appliedTeamUp: user.appliedTeamUp,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching user data",
      },
      { status: 500 }
    );
  }
}
