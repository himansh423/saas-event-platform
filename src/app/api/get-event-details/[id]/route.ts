import connectToDatabase from "@/library/db";
import EventAndHackathon from "@/library/Modal/EventsAndHackathonSchema";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await connectToDatabase();
    const eventOrHackathon = await EventAndHackathon.findById(id);

    if (!eventOrHackathon) {
      return NextResponse.json(
        {
          success: false,
          message: "event or hackathon not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success:true,
      data:eventOrHackathon,
    }, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching event or hackathon data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching event or hackathon data",
      },
      { status: 500 }
    );
  }
}
