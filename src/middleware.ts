import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const fetchUserDataFromCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/decode-token",
        {
          headers: { Cookie: `token=${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      return data?.user || null;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  return null;
};

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

  const loggedInUser = await fetchUserDataFromCookie();

  if (loggedInUser) {
    const { isAnswersPresent, isProfilePictureUploaded, isBioAdded } =
      loggedInUser;

    if (!isAnswersPresent && pathname !== "/important-questions") {
      return NextResponse.redirect(new URL("/important-questions", req.url));
    }
    if (
      isAnswersPresent &&
      !isProfilePictureUploaded &&
      pathname !== "/upload-profile-picture"
    ) {
      return NextResponse.redirect(new URL("/upload-profile-picture", req.url));
    }
    if (
      isProfilePictureUploaded &&
      !isBioAdded &&
      pathname !== "/write-about-yourself"
    ) {
      return NextResponse.redirect(new URL("/write-about-yourself", req.url));
    }

    if (isAnswersPresent && pathname === "/important-questions") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (isProfilePictureUploaded && pathname === "/upload-profile-picture") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (isBioAdded && pathname === "/write-about-yourself") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin",
    "/auth/:path*",
    "/blog",
    "/events",
    "/hackathons",
    "/my-events-and-hackathons",
    "/overview",
    "/important-questions",
    "/upload-profile-picture",
    "/write-about-yourself",
  ],
};
