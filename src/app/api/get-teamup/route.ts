import connectToDatabase from "@/library/database/db";
import TeamUp from "@/library/Modal/teamUpSchema";
import User from "@/library/Modal/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    

    const teamup = await TeamUp.find().populate({
      path: "createdBy",
      model: User,
      select: "firstName lastName",
    })

    if (!teamup || teamup.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Teamup not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: teamup,
    });
  } catch (error) {
    console.error("Error fetching teamup data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching Team up data",
      },
      { status: 500 }
    );
  }
}
