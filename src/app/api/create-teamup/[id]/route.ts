import TeamUp from "@/library/Modal/teamUpSchemaCardSchema";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Get userId from params
    const teamUpData = await req.json();

    // Check if user exists
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

    // Create a new TeamUp entry with userId in createdBy
    const newTeamUp = new TeamUp({
      hackName: teamUpData.name,
      createdBy: id, // Assign the userId
      description: teamUpData.description,
      dateStart: teamUpData.dateStart,
      dateEnd: teamUpData.dateEnd,
      location: teamUpData.location,
      mobileNumber: teamUpData.mobileNumber,
      appliedBy: teamUpData.appliedBy,
      eventOrHackathonUrl: teamUpData.eventOrHackathonUrl,
    });

    // Save the new TeamUp document
    const savedTeamUp = await newTeamUp.save();

    // Add the new TeamUp ID to the user's createdTeamUp array
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
