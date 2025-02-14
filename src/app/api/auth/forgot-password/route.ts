import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";
import { sendEmail } from "@/library/sendEmail";

export async function POST(req: Request) {
  await connectToDatabase();
  const {email} = await req.json();

  // Checking if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Generaing a secure reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(resetToken, 10);

  // Setting reset token and expiry in user model
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min expiry
  await user.save();

  // Sending email with reset link
  const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
  await sendEmail({
    to: user.email,
    subject: "Password Reset",
    text: `Click here to reset your password: ${resetLink}`,
    html: `<p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  });

  return NextResponse.json({ message: "Password reset email sent" });
}
