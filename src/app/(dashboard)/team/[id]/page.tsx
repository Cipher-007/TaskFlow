import ListMembers from "@/components/member/list-members";
import EditTeam from "@/components/teams/edit-team";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

export default async function TeamPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const team = await db.team.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      members: true,
    },
  });

  if (team) {
    return (
      <div className="ml-4 flex w-full flex-col items-center justify-between gap-4 rounded-md bg-white dark:bg-black">
        <div className="flex w-full items-center justify-between">
          <h3 className="flex basis-[100%] justify-center pl-10  pt-4 text-3xl font-medium">
            {team.name}
          </h3>
          <div className="p-4">
            <EditTeam team={team} />
          </div>
        </div>
        <Separator />
        <div className="w-full px-8 pb-3">
          <ListMembers members={team?.members!} show={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-32 w-full text-center text-3xl font-medium">
      Team not found
    </div>
  );
}
