import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { profilePictureFileName, profilePictureFileType } = await req.json();

    if (!profilePictureFileName || !profilePictureFileType) {
      return NextResponse.json(
        {
          error:
            "All fields are required: profilePictureFileName, profilePictureFileType.",
        },
        { status: 400 }
      );
    }

    const bucketName = process.env.S3_BUCKET_NAME!;
    const profilePictureKey = `uploads/profile-Picture-${nanoid()}-${profilePictureFileName}`;

    // Generate signed URLs
    const profilePictureCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: profilePictureKey,
      ContentType: profilePictureFileType,
    });

    const profilePictureUploadUrl = await getSignedUrl(
      s3Client,
      profilePictureCommand,
      {
        expiresIn: 60,
      }
    );

    return NextResponse.json({
      profilePictureUploadUrl,
      profilePictureKey,
    });
  } catch (error) {
    console.error("Error generating pre-signed URLs:", error);
    return NextResponse.json(
      { error: "Failed to generate pre-signed URLs." },
      { status: 500 }
    );
  }
}
