import { NextResponse } from "next/server";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";

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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const profilePictureData = await req.json();

    if (!profilePictureData.profilePictureKey) {
      return NextResponse.json(
        { error: "profilePictureData is required." },
        { status: 400 }
      );
    }

    // Validate keys in S3
    const isProfilePictureValid = await validateFileInS3(
      profilePictureData.profilePictureKey
    );

    if (!isProfilePictureValid) {
      return NextResponse.json(
        { error: "One or more files do not exist in S3." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    user.profilePicture = profilePictureData.profilePictureKey;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Data and Keys saved successfully!",
    });
  } catch (error) {
    console.error("Error saving keys to database:", error);
    return NextResponse.json(
      { error: "Failed to save keys to database." },
      { status: 500 }
    );
  }
}
