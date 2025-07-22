import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const protectedRoutes = [
    "/",
    "/analytics",
    "/analytics/pooling-station-status",
    "/polling-data",
    "/polling-data/details-page/:path*",
    "/vote-information",
    "/nominated-team",
    "/election-area",
    "/about-us",
    "/privacy-policy",
    "/terms-conditions",
    "/faq",
    "/notification-box",
    "/notifications",
  ];
  const notProtectedRoutes = ["/auth/login"];
  const additionalConditions = [
    request.nextUrl.pathname.startsWith("/polling-data"),
    request.nextUrl.pathname.startsWith("/agents-list"),
    request.nextUrl.pathname.startsWith("/manage-admin"),
  ];
  const pathname = request.nextUrl.pathname;
  const token = (await cookies()).get("accessToken")?.value;

  if (
    (!token && protectedRoutes.includes(pathname)) ||
    (additionalConditions.includes(true) && !token)
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/:path*"],
};
