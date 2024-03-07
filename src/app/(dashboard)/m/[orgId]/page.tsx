import Link from "next/link";
import { api } from "~/trpc/server";
import Greetings from "./_components/greetings";
import TeamCard from "./admin/_components/teams/team-card";

export default async function page({ params }: { params: { orgId: string } }) {
  const teams = await api.user.getAllTeams.query();

  return (
    <div className="w-full">
      <Greetings orgId={params.orgId} />
      <div className="flex grow flex-wrap">
        {teams?.map((team) => (
          <div
            key={team.id}
            className="w-full px-2 pt-4 lg:w-1/2 xl:w-1/3 2xl:w-1/4"
          >
            <Link href={`/m/${params.orgId}/${team.id}`}>
              <TeamCard team={team} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
