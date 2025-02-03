import connectToDatabase from "@/library/db";
import TeamUp from "@/library/Modal/teamUpSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    console.log("Database connected successfully");

    const teamup = await TeamUp.find().populate(
      "createdBy",
      "firstName lastName"
    );

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
