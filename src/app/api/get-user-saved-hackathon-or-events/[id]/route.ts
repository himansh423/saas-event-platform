import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId  = (await params).id;

    await connectToDatabase();

    const user = await User.findById(userId).populate(
      "savedEventAndHackathon",
      "name shortDescription dateStart dateEnd location modeOfEvent isOpen theme"
    );

    if (!user) {
      return NextResponse.json({ result: false, message: "No user found." });
    }

    return NextResponse.json({
      success: true,
      savedEventAndHackathon: user.savedEventAndHackathon,
    });
  } catch (error) {
    console.error("Failed to fetch user", error);
    return NextResponse.json({
      result: false,
      message: "Error fetching user saved.",
    });
  }
}
