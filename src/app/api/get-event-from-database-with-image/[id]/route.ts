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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Connect to MongoDB
    await connectToDatabase();

    // Fetch the record from the database
    const record = await EventAndHackathon.findById(id);

    if (!record) {
      return NextResponse.json(
        { error: "Event or Hackathon not found." },
        { status: 404 }
      );
    }

    // Generate pre-signed URLs
    const eventPosterUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: record.eventPoster,
      }),
      { expiresIn: 3600 }
    );

    const logoUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: record.logo,
      }),
      { expiresIn: 3600 }
    );

    const data = {
      name: record.name,
      shortDescription: record.shortDescription,
      dateStart: record.dateStart,
      dateEnd: record.dateEnd,
      applicationCloseDate:record.applicationCloseDate,
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

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching event details:", error);
    return NextResponse.json(
      { error: "Failed to fetch event details." },
      { status: 500 }
    );
  }
}
