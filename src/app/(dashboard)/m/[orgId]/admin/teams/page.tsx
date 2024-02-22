import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import ListTeam from "../_components/teams/list-team";
import NewTeam from "../_components/teams/new-team";

export const metadata = {
  title: "Teams",
  description: "Teams Page",
};

export default async function TeamsPage() {
  const user = await api.user.getCurrentUserInfo.query();

  if (
    user &&
    (user.globalRole == "ADMIN" || user.role === "TEAM_LEAD") &&
    user.organizationId
  ) {
    const teams = await api.team.getAll.query(user.organizationId);
    return (
      <div className="w-full">
        {teams.length > 0 ? (
          <div className="px-4 pb-2">
            <ListTeam teams={teams} orgId={user.organizationId} />
          </div>
        ) : (
          <div className="w-full text-center text-3xl font-medium">
            <p>No teams yet</p>
          </div>
        )}
        <div className="flex justify-center">
          <NewTeam />
        </div>
      </div>
    );
  } else {
    redirect(`/m/${user?.organizationId}`);
  }
}
