import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log(`[Middleware] Processing request: ${pathname}`);

  const token = request.cookies.get("token")?.value
  const refreshToken = request.cookies.get("refreshToken")?.value

  console.log(`[Middleware] Cookies found:
    Token: ${token ? 'Present' : 'Missing'}
    RefreshToken: ${refreshToken ? 'Present' : 'Missing'}
  `);

  const isAuthenticated = Boolean(token || refreshToken)
  console.log(`[Middleware] Is Authenticated: ${isAuthenticated}`);

  const isAuthPage =
    pathname === "/login" || pathname === "/register"

  const isPublicPage = pathname === "/"

  const isDashboard = pathname.startsWith("/dashboard")

  if (isAuthenticated) {
    if (isAuthPage || isPublicPage) {
      console.log(`[Middleware] Authenticated user on public/auth page. Redirecting to /dashboard`);
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      )
    }
    console.log(`[Middleware] Authenticated user on allowed page. Proceeding.`);
    return NextResponse.next()
  }

  if (!isAuthenticated && isDashboard) {
    console.log(`[Middleware] Unauthenticated user on protected page. Redirecting to /login`);
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  console.log(`[Middleware] Public access allowed.`);
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
}
