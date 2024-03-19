import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";
import ListMembers from "../../_components/member/list-members";
import EditTeam from "../_components/edit-team";

export default async function TeamPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const team = await api.team.getById({
    id: params.id,
  });

  if (team) {
    return (
      <div className="flex h-full w-full flex-col rounded-md bg-white dark:bg-black">
        <div className="flex w-full items-center justify-between">
          <h3 className="flex basis-[100%] justify-center pl-10 pt-4 text-3xl font-medium">
            {team.name}
          </h3>
          <div className="p-4">
            <EditTeam team={team} />
          </div>
        </div>
        <Separator />
        <ListMembers show={true} />
      </div>
    );
  }

  return (
    <div className="mx-32 w-full text-center text-3xl font-medium">
      Team not found
    </div>
  );
}
