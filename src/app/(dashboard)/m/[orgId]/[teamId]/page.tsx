import ListTasks from "~/components/task/list-tasks";
import { api } from "~/trpc/server";
import ListProjects from "../_components/project/list-projects";
import NewProject from "../_components/project/new-project";
import TeamSwitcher from "./_components/team-switcher";

export default async function page({
  params,
}: {
  params: { orgId: string; teamId: string };
}) {
  const projects = await api.project.getAllByTeam({
    teamId: params.teamId,
  });

  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <TeamSwitcher />
      </div>
      <ListProjects projects={projects} />
      <NewProject />
      <ListTasks teamId={params.teamId} />
    </div>
  );
}
