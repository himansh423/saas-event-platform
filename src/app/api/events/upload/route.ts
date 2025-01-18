import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

export async function POST(req: Request) {
  try {
    const { fileType } = await req.json();

    if (!fileType) {
      return NextResponse.json(
        { success: false, message: "File type is required" },
        { status: 400 }
      );
    }

    const fileName = `image-${Date.now()}.jpeg`;
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      ContentType: "image/jpeg",
    };

    const presignedUrl = await getSignedUrl(
      s3,
      new PutObjectCommand(params),
      { expiresIn: 3600 } // URL valid for 1 hour
    );

    return NextResponse.json(
      { success: true, presignedUrl, fileName },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error generating presigned URL:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }
}
