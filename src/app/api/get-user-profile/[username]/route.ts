import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

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
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    connectToDatabase();

    const user = await User.findOne({ username })
      .populate({
        path: "savedEventAndHackathon",
        select:
          "name shortDescription dateStart dateEnd applicationCloseDate location modeOfEvent isOpen theme logo prize teamSize aboutDescriptions eventPoster instagramLink twitterLink eventOrHackathonUrl",
      })
      .populate({
        path: "createdTeamUp",
        select:
          "hackName email createdBy description dateStart dateEnd location mobileNumber appliedBy eventOrHackathonUrl",
        populate: {
          path: "appliedBy",
          select: "firstName lastName email profilePicture",
        },
      })
      .populate({
        path: "appliedTeamUp.teamUp",
        select:
          "hackName email createdBy description dateStart dateEnd location mobileNumber appliedBy eventOrHackathonUrl",
        populate: {
          path: "createdBy",
          select: "firstName lastName email profilePicture",
        },
      });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not Found",
      });
    }

    // Generate pre-signed URLs
    const profilePictureUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: user.profilePicture,
      }),
      { expiresIn: 3600 }
    );

    const response = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      profilePicture: profilePictureUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      savedEventAndHackathon: user.savedEventAndHackathon,
      createdTeamUp: user.createdTeamUp,
      appliedTeamUp: user.appliedTeamUp,
    };

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching user data",
      },
      { status: 500 }
    );
  }
}
