import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function GET(req: Request) {
  try {
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const token = cookies.token;


    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET as string);


    return NextResponse.json({ user: decoded });
  } catch (error) {

    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
