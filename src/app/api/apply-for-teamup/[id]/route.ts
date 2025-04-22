import TeamUp from "@/library/Modal/teamUpSchema";
import User from "@/library/Modal/User";
import { NextResponse, NextRequest } from "next/server";
import mongoose, { Types } from "mongoose";
import connectToDatabase from "@/library/database/db";

interface UserType {
  _id: Types.ObjectId;
  appliedTeamUp: Array<{ _id: Types.ObjectId; isApproved: boolean }>;
}

interface TeamUpType {
  _id: Types.ObjectId;
  appliedBy: Array<Types.ObjectId>;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await params).id;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Extract `teamUpId` from the request body
    const { id: teamUpId } = await req.json();

    await connectToDatabase();

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const teamUpObjectId = new mongoose.Types.ObjectId(teamUpId);

    const user: UserType | null = await User.findById(userObjectId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const teamUp: TeamUpType | null = await TeamUp.findById(teamUpObjectId);
    if (!teamUp) {
      return NextResponse.json(
        { success: false, message: "Teamup not found" },
        { status: 404 }
      );
    }

    const isApplied =
      user.appliedTeamUp.some(
        (item: { _id: Types.ObjectId }) =>
          item._id.toString() === teamUpObjectId.toString()
      ) &&
      teamUp.appliedBy.some(
        (id: Types.ObjectId) => id.toString() === userObjectId.toString()
      );

    if (isApplied) {
      await User.updateOne(
        { _id: userObjectId },
        { $pull: { appliedTeamUp: { _id: teamUpObjectId } } }
      );

      await TeamUp.updateOne(
        { _id: teamUpObjectId },
        { $pull: { appliedBy: userObjectId } }
      );

      return NextResponse.json({
        successWithdraw: true,
        message: "Withdrawn successfully",
      });
    } else {
      console.log("User has not applied yet. Adding application...");

      await User.updateOne(
        { _id: userObjectId },
        { $push: { appliedTeamUp: { _id: teamUpObjectId, isApproved: false } } }
      );

      await TeamUp.updateOne(
        { _id: teamUpObjectId },
        { $push: { appliedBy: userObjectId } }
      );

      return NextResponse.json({
        successApply: true,
        message: "Applied successfully",
      });
    }
  } catch (error) {
    console.error("Error toggling Apply", error);
    return NextResponse.json(
      { success: false, message: "Error toggling Apply" },
      { status: 500 }
    );
  }
}
