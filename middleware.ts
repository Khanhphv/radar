import { NextRequest, NextResponse } from "next/server";
import { ADMIN_ROUTES, ROUTES } from "./constant/routes";
import * as jose from "jose";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();

  // add the CORS headers to the response
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  const { url, cookies } = request;
  const { value: token } = cookies.get("Authorization") ?? { value: null };

  if (url.includes("/login")) {
    if (token) return NextResponse.redirect(new URL(ADMIN_ROUTES.keys, url));
    return res;
  }
  if (token) {
    return res;
  } else {
    return NextResponse.redirect(new URL(ROUTES.login, url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
