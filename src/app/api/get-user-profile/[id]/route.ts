import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    connectToDatabase();

    const user = await User.findById(userId)
      .populate({
        path: "savedEventAndHackathon",
        select:
          "name shortDescription dateStart dateEnd applicationCloseDate location modeOfEvent isOpen theme logo prize teamSize aboutDescriptions eventPoster instagramLink twitterLink eventOrHackathonUrl",
      })
      .populate({
        path: "createdTeamUp",
        select:
          "hackName email createdBy description dateStart dateEnd location mobileNumber appliedBy eventOrHackathonUrl",
        populate: {
          path: "appliedBy",
          select: "firstName lastName email profilePicture",
        },
      })
      .populate({
        path: "appliedTeamUp.teamUp",
        select:
          "hackName email createdBy description dateStart dateEnd location mobileNumber appliedBy eventOrHackathonUrl",
        populate: {
          path: "createdBy",
          select: "firstName lastName email profilePicture",
        },
      });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not Found",
      });
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
        message: "Error fetching user data",
      },
      { status: 500 }
    );
  }
}
