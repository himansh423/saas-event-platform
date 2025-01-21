import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import connectToDatabase from "@/library/db";
import EventAndHackathon from "@/library/Modal/EventsAndHackathonSchema";

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch all records from the database
    const records = await EventAndHackathon.find();

    // Generate pre-signed URLs and prepare the data
    const data = await Promise.all(
      records.map(async (record) => {
        const eventPosterUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: record.eventPoster,
          }),
          { expiresIn: 3600 } // 1-hour expiration
        );

        const logoUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: record.logo,
          }),
          { expiresIn: 3600 }
        );

        return {
          name: record.name,
          shortDescription: record.shortDescription,
          date: record.date,
          modeOfEvent: record.modeOfEvent,
          typeOfEvent: record.typeOfEvent,
          isOpen: record.isOpen,
          theme: record.theme,
          logo: logoUrl,
          eventPoster: eventPosterUrl,
          location: record.location,
          prize: record.prize,
          teamSize: record.teamSize,
          aboutDescriptions: record.aboutDescriptions,
          instagramLink: record.instagramLink,
          twitterLink: record.twitterLink,
          eventOrHackathonUrl: record.eventOrHackathonUrl,
        };
      })
    );

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images." },
      { status: 500 }
    );
  }
}
