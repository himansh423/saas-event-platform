import connectToDatabase from "@/library/database/db";
import TeamUp from "@/library/Modal/teamUpSchema";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId  = (await params).id;
    await connectToDatabase();

    const user = await User.findById(userId).populate({
      path: "createdTeamUp",
      model: TeamUp,
      populate: {
        path: "appliedBy",
        model: User,
        select: "firstName lastName email ",
      },
      select:
        "hackName email dateStart dateEnd location mobileNumber appliedBy eventOrHackathonUrl description",
    });

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
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching my teamup data",
      },
      { status: 500 }
    );
  }
}
