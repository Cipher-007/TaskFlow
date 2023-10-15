import AccessDeniedComponent from "@/components/access-denied-component";
import ListMembers from "@/components/member/list-members";
import { getUserFromCookie, isApproved } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export default async function AdminPage() {
  const user = await getUserFromCookie(cookies());

  const users = await db.user.findMany({
    where: {
      organizationId: user?.organizationId,
      Request: {
        some: {
          status: "APPROVED",
        },
      },
    },
  });

  const access = await isApproved(cookies());

  if (access) {
    return (
      <div className="w-full px-10">
        <ListMembers members={users} show={false} />
      </div>
    );
  }

  return <AccessDeniedComponent />;
}
