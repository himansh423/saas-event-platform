import connectToDatabase from "@/library/db";
import EventAndHackathon from "@/library/Modal/EventsAndHackathonSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const eventAndHackathonData = await req.json();

    await connectToDatabase();
    const newEventOrHackathon = new EventAndHackathon(eventAndHackathonData);

    await newEventOrHackathon.save();

    return NextResponse.json(
      { success: true, message: "Event or Hackathon added successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error saving event details:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }
}
