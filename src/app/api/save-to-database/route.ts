import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import connectToDatabase from "@/library/db";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

const Schema = new mongoose.Schema({
  bannerKey: { type: String, required: true },
  logoKey: { type: String, required: true },
});

const FileKeysModel = mongoose.models.FileKeys || mongoose.model("FileKeys", Schema);

async function validateFileInS3(key: string): Promise<boolean> {
  try {
    const command = new HeadObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: key,
    });
    await s3Client.send(command); // Throws an error if the file does not exist
    return true;
  } catch (error) {
    console.error(`File validation failed for key: ${key}`, error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { bannerKey, logoKey } = await req.json();

    if (!bannerKey || !logoKey) {
      return NextResponse.json(
        { error: "Both bannerKey and logoKey are required." },
        { status: 400 }
      );
    }

    // Validate keys in S3
    const isBannerValid = await validateFileInS3(bannerKey);
    const isLogoValid = await validateFileInS3(logoKey);

    if (!isBannerValid || !isLogoValid) {
      return NextResponse.json(
        { error: "One or more files do not exist in S3." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    const newEntry = new FileKeysModel({ bannerKey, logoKey });
    await newEntry.save();

    return NextResponse.json({ message: "Keys saved successfully!" });
  } catch (error) {
    console.error("Error saving keys to database:", error);
    return NextResponse.json({ error: "Failed to save keys to database." }, { status: 500 });
  }
}
