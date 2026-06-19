// src/proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth();

  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
