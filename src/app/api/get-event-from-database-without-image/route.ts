import { NextResponse } from "next/server";
import connectToDatabase from "@/library/db";
import EventAndHackathon from "@/library/Modal/EventsAndHackathonSchema";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    const records = await EventAndHackathon.find();

    const data = records.map((record) => ({
      name: record.name,
      shortDescription: record.shortDescription,
      date: record.date,
      modeOfEvent: record.modeOfEvent,
      isOpen: record.isOpen,
      theme: record.theme,
      location: record.location,
      prize: record.prize,
    }));

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { error: "Failed to fetch records." },
      { status: 500 }
    );
  }
}
