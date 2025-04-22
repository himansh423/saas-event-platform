import { NextResponse } from "next/server";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import jwt from "jsonwebtoken";
import cookie from "cookie";
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await params).id;
    const profilePictureData = await req.json();

    if (!profilePictureData.profilePictureKey) {
      return NextResponse.json(
        { error: "profilePictureData is required." },
        { status: 400 }
      );
    }

    const isProfilePictureValid = await validateFileInS3(
      profilePictureData.profilePictureKey
    );

    if (!isProfilePictureValid) {
      return NextResponse.json(
        { error: "One or more files do not exist in S3." },
        { status: 400 }
      );
    }

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
    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        isAnswersPresent: true,
        isProfilePictureUploaded: true,
        isBioAdded: false,
      },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Profile picture successfully saved on database",
      },
      { status: 200 }
    );

    response.headers.append(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    response.headers.append(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error("Error saving keys to database:", error);
    return NextResponse.json(
      { error: "Failed to save keys to database." },
      { status: 500 }
    );
  }
}
