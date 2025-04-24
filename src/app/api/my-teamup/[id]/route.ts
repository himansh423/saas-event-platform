import connectToDatabase from "@/library/database/db";
import TeamUp from "@/library/Modal/teamUpSchema";
import User from "@/library/Modal/User";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await params).id;
    await connectToDatabase();

    const user = await User.findById(userId).populate({
      path: "createdTeamUp",
      model: TeamUp,
      populate: {
        path: "appliedBy",
        model: User,
        select: "firstName lastName username profilePicture",
      },
      select:
        "hackName email dateStart dateEnd location mobileNumber appliedBy eventOrHackathonUrl description",
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const formattedTeamUp = await Promise.all(
      user.createdTeamUp.map(async (team: any) => {
        const appliedUsers = await Promise.all(
          team.appliedBy.map(async (applicant: any) => {
            let profilePictureUrl = "";
            if (applicant.profilePicture) {
              profilePictureUrl = await getSignedUrl(
                s3Client,
                new GetObjectCommand({
                  Bucket: process.env.S3_BUCKET_NAME!,
                  Key: applicant.profilePicture,
                }),
                { expiresIn: 3600 }
              );
            }

            return {
              firstName: applicant.firstName,
              lastName: applicant.lastName,
              username: applicant.username,
              profilePicture: profilePictureUrl,
            };
          })
        );

        return {
          hackName: team.hackName,
          description: team.description,
          dateStart: team.dateStart,
          dateEnd: team.dateEnd,
          location: team.location,
          email: team.email,
          mobileNumber: team.mobileNumber,
          eventOrHackathonUrl: team.eventOrHackathonUrl,
          appliedBy: appliedUsers,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: formattedTeamUp,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching my teamup data" },
      { status: 500 }
    );
  }
}
