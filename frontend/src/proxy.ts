import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const isLoginPage = req.nextUrl.pathname === "/";
  const isProtectedRoute = [
    "/dashboard",
    "/home",
    "/produto",
    "/teste",
  ].includes(req.nextUrl.pathname);

  if (isLoginPage) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/home", "/produto", "/teste"],
};
