import connectToDatabase from "@/library/db";
import EventAndHackathon from "@/library/Modal/EventsAndHackathonSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const eventAndHackathonData = await req.json();
  try {
    await connectToDatabase();
    const eventOrHackathonToAdd = await new EventAndHackathon(
      eventAndHackathonData
    );
    await eventOrHackathonToAdd.save();
    return NextResponse.json(
      { success: true, message: "Event or Hackathon added Successfully" },
      { status: 201 }
    );
  } catch (error:unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }
}
