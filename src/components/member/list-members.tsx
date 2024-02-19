import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import type { User } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import Member from "./member";
import NewMember from "./new-member";

export default async function ListMembers({
  members,
  show,
}: {
  members: User[];
  show: boolean;
}) {
  const user = await getUserFromCookie(cookies());

  const data = await db.organization.findUnique({
    where: {
      id: user?.organizationId!,
    },
    select: {
      employees: {
        orderBy: {
          lastName: "asc",
        },
        where: {
          Request: {
            some: {
              status: "APPROVED",
            },
          },
        },
      },
    },
  });

  const filteredMembers = members.filter(
    (member) => member.role !== "ORGANIZATION_ADMIN",
  );

  let content;

  if (filteredMembers.length === 0) {
    content = (
      <div className="w-full text-center text-3xl font-medium">
        <div className="text-2xl">No team members yet</div>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-grow items-center gap-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="w-1/4">
            <Link href={`/user/${member.id}`}>
              <Member member={member} />
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {content}
      <div>
        {show && user!.role === "ORGANIZATION_ADMIN" ? (
          <NewMember employees={data!.employees} />
        ) : null}
      </div>
    </>
  );
}
