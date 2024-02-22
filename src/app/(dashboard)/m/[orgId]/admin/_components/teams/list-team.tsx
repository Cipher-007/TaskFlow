import Link from "next/link";
import { type Team } from "~/server/db/schema";
import TeamCard from "./team-card";

export default function ListTeam({
  teams,
  orgId,
}: {
  teams: Team[];
  orgId: string;
}) {
  let content;

  if (teams.length === 0) {
    content = (
      <div className="w-full text-center text-3xl font-medium">
        <div className="text-2xl">No team members yet</div>
      </div>
    );
  } else {
    content = (
      <div className="flex grow flex-wrap">
        {teams?.map((team) => (
          <div key={team.id} className="w-full p-3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
            <Link href={`/m/${orgId}/team/${team.id}`}>
              <TeamCard team={team} />
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return <>{content}</>;
}
