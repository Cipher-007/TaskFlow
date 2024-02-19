import ListTeam from "@/components/teams/list-team";
import NewTeam from "@/components/teams/new-team";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function TeamsPage() {
  const user = await getUserFromCookie(cookies());
  if (user?.role !== "ORGANIZATION_ADMIN") {
    redirect("/admin");
  }
  const teams = await db.team.findMany({
    where: {
      organizationId: user?.organizationId!,
    },
  });
  return (
    <div className="w-full">
      {teams.length > 0 ? (
        <div className="px-4 pb-2">
          <ListTeam teams={teams} />
        </div>
      ) : (
        <div className="w-full text-center text-3xl font-medium">
          <p>No teams yet</p>
        </div>
      )}
      <div className="flex justify-center">
        <NewTeam teams={teams} />
      </div>
    </div>
  );
}
