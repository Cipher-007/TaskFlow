import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { IndividualRegistrationFormValue } from "@/lib/zod";
import type { Organization, User } from "@prisma/client";
import { serialize } from "cookie";

type Body = {
  User: { data: IndividualRegistrationFormValue };
  Organization: Organization;
  mode: "organization" | "individual";
};

export async function POST(request: Request) {
  const { User, Organization, mode }: Body = await request.json();
  const { data } = User;

  if (mode === "individual") {
    console.log(hashPassword);
    const user = await db.user.create({
      data: {
        email: data.email,
        password: await hashPassword(data.password),
        firstName: data.firstName,
        lastName: data.lastName,
        contact: data.contact,
        organizationId: data.organizationId,
        role: data.role,
        Request: {
          create: {
            organizationId: data.organizationId,
            status: "PENDING",
          },
        },
      },
    });

    const jwt = await createJWT(user);
    return new Response(null, {
      status: 201,
      headers: {
        "Set-Cookie": serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        }),
      },
    });
  } else if (mode === "organization") {
    const organization = await db.organization.create({
      data: {
        contact: Organization.contact,
        email: Organization.email,
        name: Organization.name,
      },
    });

    const team = await db.team.create({
      data: {
        name: `Team ${Organization.name}`,
        description: `Team ${Organization.name}`,
        organizationId: organization.id,
      },
    });

    const user = await db.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        contact: data.contact,
        password: await hashPassword(data.password),
        organizationId: organization.id,
        role: "ORGANIZATION_ADMIN",
        teamId: team.id,
        Request: {
          create: {
            organizationId: organization.id,
            status: "APPROVED",
          },
        },
      },
    });

    const jwt = await createJWT(user);
    return new Response(null, {
      status: 201,
      headers: {
        "Set-Cookie": serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        }),
      },
    });
  } else {
    return new Response("Invalid mode", {
      status: 400,
    });
  }
}
