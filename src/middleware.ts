import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes (including auth)
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Apply i18n middleware
  const response = intlMiddleware(request);

  // For now, let all routes through (auth protection can be added later)
  // The actual auth check will be done in layouts/pages using auth()

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
