import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-next-pathname", req.nextUrl.pathname); // Set pathname in headers

  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: "/:path*", // Apply to all routes
};