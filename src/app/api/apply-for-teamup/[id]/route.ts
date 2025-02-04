import connectToDatabase from "@/library/db";
import TeamUp from "@/library/Modal/teamUpSchema";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const { id: teamUpId } = await req.json();
    await connectToDatabase();

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const teamUpObjectId = new mongoose.Types.ObjectId(teamUpId);

    const user = await User.findById(userObjectId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const teamUp = await TeamUp.findById(teamUpObjectId);
    if (!teamUp) {
      return NextResponse.json(
        { success: false, message: "Teamup not found" },
        { status: 404 }
      );
    }

    const isApplied =
      user.appliedTeamUp.some(
        (item: any) => item._id.toString() === teamUpObjectId.toString()
      ) &&
      teamUp.appliedBy.some(
        (id: any) => id.toString() === userObjectId.toString()
      );

    if (isApplied) {
      const userUpdate = await User.updateOne(
        { _id: userObjectId },
        { $pull: { appliedTeamUp: { _id: teamUpObjectId } } }
      );

      const teamUpUpdate = await TeamUp.updateOne(
        { _id: teamUpObjectId },
        { $pull: { appliedBy: userObjectId } }
      );

      return NextResponse.json({
        success: true,
        message: "Withdrawn successfully",
      });
    } else {
      console.log("User has not applied yet. Adding application...");

      const userUpdate = await User.updateOne(
        { _id: userObjectId },
        { $push: { appliedTeamUp: { _id: teamUpObjectId, isApproved: false } } }
      );

      const teamUpUpdate = await TeamUp.updateOne(
        { _id: teamUpObjectId },
        { $push: { appliedBy: userObjectId } }
      );

      console.log("User update result:", userUpdate);
      console.log("TeamUp update result:", teamUpUpdate);

      return NextResponse.json({
        success: true,
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
