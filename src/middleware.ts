import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;

  // const isPublic = path === '/login' || path === '/signup';
  // const token = request.cookies.get('token')?.value || '';

  // Allow access to the public pages
  // if (isPublic) {
  //   // If user is trying to access signup or login and already has a token, redirect them to the home page
  //   if (token && path !== '/') {
  //     return NextResponse.redirect(new URL('/', request.nextUrl));
  //   }
  //   // Allow normal access to public pages
  //   return NextResponse.next();
  // }

  // For non-public pages, if token is not present, redirect to signup
  // if (!token) {
  //   return NextResponse.redirect(new URL('/SignUp', request.nextUrl));
  // }

  // // Otherwise, allow access to protected routes
  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/SignUp',
  ],
};
