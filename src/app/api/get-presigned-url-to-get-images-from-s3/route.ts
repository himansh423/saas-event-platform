import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import connectToDatabase from "@/library/db";

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

// MongoDB Schema and Model
const Schema = new mongoose.Schema({
  bannerKey: { type: String, required: true },
  logoKey: { type: String, required: true },
});

const FileKeysModel = mongoose.models.FileKeys || mongoose.model("FileKeys", Schema);

export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch all image keys from the database
    const records = await FileKeysModel.find();

    // Generate pre-signed URLs for each record
    const imagesWithUrls = await Promise.all(
      records.map(async (record) => {
        const bannerUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: record.bannerKey,
          }),
          { expiresIn: 3600 } // 1-hour expiration
        );

        const logoUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: record.logoKey,
          }),
          { expiresIn: 3600 }
        );

        return {
          bannerUrl,
          logoUrl,
        };
      })
    );

    // Return the data as JSON
    return NextResponse.json(imagesWithUrls);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images." },
      { status: 500 }
    );
  }
}
