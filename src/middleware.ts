import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload as {
    payload: {
      id: string;
      email: string;
      organizationId: string;
      teamId: string;
      firstName: string;
      lastName: string;
      role: string;
    };
    exp: number;
    iat: number;
    nbf: number;
  };
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  const jwt = req.cookies.get(process.env.COOKIE_NAME!);

  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    const user = await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: [
    "/admin",
    "/calendar",
    "/profile",
    "/settings",
    "/home",
    "/project/:path*",
    "/api/profile",
    "/api/projects",
    "/api/tasks",
  ],
};
