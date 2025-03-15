import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get cookies from the request
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Define protected routes
  const protectedRoutes = ["/chat"];

  // Define auth routes (login/signup pages)
  const authRoutes = ["/login", "/signup"];

  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Check if the requested path is an auth route
  const isAuthRoute = authRoutes.some(
    (route) => request.nextUrl.pathname === route
  );

  // If trying to access a protected route without being authenticated, redirect to the login page
  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If trying to access login/signup pages while already authenticated, redirect to chat
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run only for specific paths
export const config = {
  matcher: ["/chat/:path*", "/login", "/signup"],
};
