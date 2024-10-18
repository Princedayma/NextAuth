import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // If someone tries to access "/", redirect them to "/SignUp"
  if (path === '/') {
    return NextResponse.redirect(new URL('/SignUp', request.nextUrl));
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',  // This will match the root path
  ],
};
