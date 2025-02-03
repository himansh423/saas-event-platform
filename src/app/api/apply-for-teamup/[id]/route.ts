import connectToDatabase from "@/library/db";
import TeamUp from "@/library/Modal/teamUpSchema";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const { id: teamUpId } = await req.json();
    await connectToDatabase();

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

    const teamUp = await TeamUp.findById(teamUpId);

    if (!teamUp) {
      return NextResponse.json(
        {
          success: false,
          message: "Teamup not found",
        },
        { status: 404 }
      );
    }

    const isApplied =
      user.appliedTeamUp.includes(teamUpId) &&
      teamUp.appliedBy.includes(userId);

    if (isApplied) {
      await User.updateOne(
        { _id: userId },
        { $pull: { appliedTeamUp: teamUpId } }
      );
      await TeamUp.updateOne(
        { _id: teamUpId },
        { $pull: { appliedBy: userId } }
      );
    } else {
      await User.updateOne(
        { _id: userId },
        { $push: { appliedTeamUp: teamUpId } }
      );
      await TeamUp.updateOne(
        { _id: teamUpId },
        { $push: { appliedBy: userId } }
      );
    }

    return NextResponse.json({
      success: true,
      message: isApplied ? "Applied successfully" : "Withdrawn successfully",
    });
  } catch (error) {
    console.error("Error toggling Apply", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error toggling Apply",
      },
      { status: 500 }
    );
  }
}
