import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import formidable from "formidable";
import { promises as fs } from "fs";
import { IncomingMessage } from "http";

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export async function POST(req: Request) {
  try {
    // Parse the multipart/form-data request
    const form = formidable({ multiples: true });
    const [fields, files] = await new Promise<any>((resolve, reject) => {
      form.parse(req:IncomingMessage, (err:any, fields:any, files:any) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Extract files from the parsed request
    const logoFile = files.logo?.filepath;
    const bannerFile = files.banner?.filepath;

    if (!logoFile || !bannerFile) {
      return NextResponse.json(
        { success: false, message: "Logo and banner files are required." },
        { status: 400 }
      );
    }

    // Helper function to upload a file to S3
    const uploadToS3 = async (filePath: string, fileName: string) => {
      const fileContent = await fs.readFile(filePath);

      const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: `user-uploads/${fileName}`,
        Body: fileContent,
        ACL: "private",
        ContentType: "image/jpeg", // Adjust if needed
      };

      const { Location } = await s3.upload(params).promise();
      return Location;
    };

    // Upload files to S3
    const logoUrl = await uploadToS3(logoFile, `logo-${Date.now()}.jpg`);
    const bannerUrl = await uploadToS3(bannerFile, `banner-${Date.now()}.jpg`);

    // Return URLs to the client
    return NextResponse.json(
      {
        success: true,
        message: "Files uploaded successfully.",
        data: { logoUrl, bannerUrl },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading files to S3:", error);
    return NextResponse.json(
      { success: false, message: "File upload failed." },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Required for formidable to handle the form-data
  },
};
