import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login";

  const token = request.cookies.get("refreshToken")?.value || "";
  console.log({ token });
  console.log(!isPublicPath && !token);

  if (isPublicPath) {
    if (token) return NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
};
