import Link from "next/link";
import { api } from "~/trpc/server";
import Member from "./member";
import NewMember from "./new-member";

export default async function ListMembers({ show = false }: { show: boolean }) {
  const user = await api.user.getCurrentUserInfo.query();
  if (user?.organizationId) {
    const members = await api.user.getApprovedEmployees.query({
      organizationId: user.organizationId,
    });

    // const filteredMembers = members.filter(
    //   (member) => member.globalRole !== "ADMIN",
    // );

    return (
      <div className="flex h-full flex-col justify-between p-4">
        {members.length > 0 ? (
          <div className="flex flex-grow gap-4">
            {members.map((member) => (
              <div key={member.id} className="w-[47%] xl:w-[35%] 2xl:w-[27%]">
                <Link href={`/m/${user.organizationId}/user/${member.id}`}>
                  <Member member={member} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-3xl font-medium">
            <div className="text-2xl">No team members yet</div>
          </div>
        )}
        <div>{show && user?.globalRole === "ADMIN" ? <NewMember /> : null}</div>
      </div>
    );
  }
}
