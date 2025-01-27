import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const { id: eventOrHackathonId } = await req.json();

   

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

    
    const isSaved = user.savedEventAndHackathon.includes(eventOrHackathonId);

    if (isSaved) {
      
      await User.updateOne(
        { _id: userId },
        { $pull: { savedEventAndHackathon: eventOrHackathonId } }
      );
    } else {
     
      await User.updateOne(
        { _id: userId },
        { $push: { savedEventAndHackathon: eventOrHackathonId } }
      );
    }


    return NextResponse.json({
      success: true,
      message: isSaved
        ? "Event or Hackathon unsaved successfully"
        : "Event or Hackathon saved successfully",
    });
  } catch (error) {
    console.error("Error toggling Event or Hackathon", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error toggling Event or Hackathon",
      },
      { status: 500 }
    );
  }
}