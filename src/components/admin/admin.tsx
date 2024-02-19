import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import ListRequests from "../request/list-requests";

export default async function Admin() {
  const user = await getUserFromCookie(cookies());
  const data = await db.team.findUnique({
    where: {
      id: user?.teamId!,
    },
    select: {
      organization: {
        select: {
          Request: {
            where: {
              status: "PENDING",
            },
            select: {
              id: true,
              status: true,
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  role: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const teams = await db.team.findMany({
    where: {
      organizationId: user?.organizationId!,
    },
  });

  const Requests = data?.organization.Request;

  return (
    <div className="w-full">
      {Requests && Requests.length > 0 ? (
        <div className="px-4 pb-1">
          <ListRequests Requests={Requests} />
        </div>
      ) : (
        <div className="w-full text-center text-3xl font-medium">
          <p>No membership requests yet</p>
        </div>
      )}
    </div>
  );
}
