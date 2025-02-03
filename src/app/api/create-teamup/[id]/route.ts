import connectToDatabase from "@/library/db";
import TeamUp from "@/library/Modal/teamUpSchema";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const teamUpData = await req.json();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    const newTeamUp = new TeamUp({
      hackName: teamUpData.hackName,
      email: teamUpData.email,
      createdBy: id,
      description: teamUpData.description,
      dateStart: teamUpData.dateStart,
      dateEnd: teamUpData.dateEnd,
      location: teamUpData.location,
      mobileNumber: teamUpData.mobileNumber,
      appliedBy: teamUpData.appliedBy,
      eventOrHackathonUrl: teamUpData.eventOrHackathonUrl,
    });

    const savedTeamUp = await newTeamUp.save();

    user.createdTeamUp.push(savedTeamUp._id);
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "TeamUp created successfully",
        teamUp: savedTeamUp,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating TeamUp:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
