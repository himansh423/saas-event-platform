import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { logoFileName, logoFileType, bannerFileName, bannerFileType } = await req.json();

    if (!logoFileName || !logoFileType || !bannerFileName || !bannerFileType) {
      return NextResponse.json(
        { error: "All fields are required: logoFileName, logoFileType, bannerFileName, bannerFileType." },
        { status: 400 }
      );
    }

    const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;
    const logoKey = `uploads/logo-${nanoid()}-${logoFileName}`;
    const bannerKey = `uploads/banner-${nanoid()}-${bannerFileName}`;

    // Generate signed URLs
    const logoCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: logoKey,
      ContentType: logoFileType,
    });
    const bannerCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: bannerKey,
      ContentType: bannerFileType,
    });

    const logoUploadUrl = await getSignedUrl(s3Client, logoCommand, { expiresIn: 60 });
    const bannerUploadUrl = await getSignedUrl(s3Client, bannerCommand, { expiresIn: 60 });

    return NextResponse.json({ logoUploadUrl, bannerUploadUrl, logoKey, bannerKey });
  } catch (error) {
    console.error("Error generating pre-signed URLs:", error);
    return NextResponse.json({ error: "Failed to generate pre-signed URLs." }, { status: 500 });
  }
}
