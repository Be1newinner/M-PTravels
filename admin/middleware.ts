import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  console.log("HELLO ");
  const path = request.nextUrl.pathname

  const isPublicPath = path === "/login"

  const token = request.cookies.get("accessToken")?.value || ""

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}

