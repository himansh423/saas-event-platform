import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { fetchUserData } from "./redux/fetchUserData";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  if (
    token &&
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/register"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Specify the paths you want to protect
export const config = {
  matcher: [
    "/",
    "/admin",
    "/auth/:path*",
    "/blog",
    "/events",
    "/hackathons",
    "/important-questions",
    "/my-events-and-hackathons",
    "/overview",
  ],
};
