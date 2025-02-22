import { NextResponse } from "next/server";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import connectToDatabase from "@/library/db";
import EventAndHackathon from "@/library/Modal/EventsAndHackathonSchema";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

async function validateFileInS3(key: string): Promise<boolean> {
  try {
    const command = new HeadObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: key,
    });
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error(`File validation failed for key: ${key}`, error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const eventData = await req.json();

    if (!eventData.bannerKey || !eventData.logoKey) {
      return NextResponse.json(
        { error: "Both bannerKey and logoKey are required." },
        { status: 400 }
      );
    }

    // Validate keys in S3
    const isBannerValid = await validateFileInS3(eventData.bannerKey);
    const isLogoValid = await validateFileInS3(eventData.logoKey);

    if (!isBannerValid || !isLogoValid) {
      return NextResponse.json(
        { error: "One or more files do not exist in S3." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    const newEntry = new EventAndHackathon({
      name: eventData.name,
      shortDescription: eventData.shortDescription,
      dateStart: eventData.dateStart,
      dateEnd: eventData.dateEnd,
      applicationCloseDate: eventData.applicationCloseDate,
      modeOfEvent: eventData.modeOfEvent,
      typeOfEvent: eventData.typeOfEvent,
      isOpen: eventData.isOpen,
      theme: eventData.theme,
      logo: eventData.logoKey,
      eventPoster: eventData.bannerKey,
      location: eventData.location,
      prize: eventData.prize,
      teamSize: eventData.teamSize,
      aboutDescriptions: eventData.aboutDescriptions,
      instagramLink: eventData.instagramLink,
      twitterLink: eventData.twitterLink,
      eventOrHackathonUrl: eventData.eventOrHackathonUrl,
    });
    await newEntry.save();

    return NextResponse.json({ message: "Data and Keys saved successfully!" });
  } catch (error) {
    console.error("Error saving keys to database:", error);
    return NextResponse.json(
      { error: "Failed to save keys to database." },
      { status: 500 }
    );
  }
}
