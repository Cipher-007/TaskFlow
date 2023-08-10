import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload;
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  const jwt = req.cookies.get(process.env.COOKIE_NAME!);

  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: [
    "/calendar",
    "/profile",
    "/settings",
    "/home",
    "/project/:path*",
    "/api/:path*",
  ],
};
