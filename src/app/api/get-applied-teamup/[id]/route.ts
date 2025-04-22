import { NextResponse } from "next/server";
import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await params).id;
    await connectToDatabase();

    const user = await User.findById(userId)
      .populate({
        path: "appliedTeamUp.teamUp",
        model: "TeamUp",
        populate: [
          { path: "createdBy", model: "User", select: "-password -otp" },
          { path: "appliedBy", model: "User", select: "-password -otp" },
        ],
      })
      .lean();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
