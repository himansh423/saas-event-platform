import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const { pathname } = req.nextUrl;

  // If token is present and user tries to access /auth/login or /auth/register, redirect to home
  if (token && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If token is not present and user tries to access protected routes, redirect to login
  if (!token && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Allow access to the requested route if no conditions are met
  return NextResponse.next();
}

// Specify the paths you want to protect
export const config = {
  matcher: [
    '/',
    '/admin',
    '/auth/:path*',
    '/blog',
    '/events',
    '/hackathons',
    '/important-questions',
    '/my-events-and-hackathons',
    '/overview',
  ],
};