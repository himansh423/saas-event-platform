import { NextResponse } from "next/server";
import connectToDatabase from "@/library/db";
import EventAndHackathon from "@/library/Modal/EventsAndHackathonSchema";

export async function GET() {
  try {
    await connectToDatabase();

    const records = await EventAndHackathon.find({ typeOfEvent: "event" });

    const data = records.map((record) => ({
      _id: record._id,
      name: record.name,
      shortDescription: record.shortDescription,
      date: record.date,
      modeOfEvent: record.modeOfEvent,
      isOpen: record.isOpen,
      theme: record.theme,
      location: record.location,
      prize: record.prize, 
    }));


    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { error: "Failed to fetch records." },
      { status: 500 }
    );
  }
}
