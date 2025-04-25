import connectToDatabase from "@/library/database/db";
import TeamUp from "@/library/Modal/teamUpSchema";
import User from "@/library/Modal/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { username, decision } = await req.json();
    const teamUpId = (await params).id;
    if (decision !== "approve" && decision !== "reject") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid decision",
        },
        { status: 400 }
      );
    }

    if (decision === "reject") {
      const updatedUser = await User.findOneAndUpdate(
        {
          username,
          "appliedTeamUp._id": teamUpId,
        },
        {
          $set: { "appliedTeamUp.$.isApproved": false },
        },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json(
          {
            success: false,
            message: "Application not found or already rejected",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Application rejected successfully",
        updatedUser,
      });
    } else if (decision === "approve") {
      const updatedUser = await User.findOneAndUpdate(
        {
          username,
          "appliedTeamUp._id": teamUpId,
        },
        {
          $set: { "appliedTeamUp.$.isApproved": true },
        },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json(
          {
            success: false,
            message: "Application not found or already approved",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Application approved successfully",
        updatedUser,
      });
    }
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
