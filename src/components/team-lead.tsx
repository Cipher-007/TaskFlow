import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { Separator } from "./ui/separator";
import ListMembers from "./member/list-members";

export default async function TeamLead() {
  const user = await getUserFromCookie(cookies());

  const team = await db.team.findUnique({
    where: {
      id: user?.teamId!,
    },
    include: {
      members: true,
    },
  });

  const members = team?.members.filter((member) => member.id !== user?.id);
  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold">{team?.name}</h3>
      <Separator />
      <div className="py-4">
        <ListMembers members={team?.members!} show={true} />
      </div>
    </div>
  );
}
