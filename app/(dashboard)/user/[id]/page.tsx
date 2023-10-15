import { Separator } from "@/components/ui/separator";
import EditUser from "@/components/user/edit-user";
import { db } from "@/lib/db";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Organization: {
        select: {
          name: true,
        },
      },
      team: {
        select: {
          name: true,
        },
      },
    },
  });

  const teams = await db.team.findMany({
    where: {
      organizationId: user?.organizationId,
    },
  });

  if (!user) {
    return (
      <div className="mx-32 w-full text-center text-3xl font-medium">
        User not found
      </div>
    );
  }

  return (
    <div className="mx-auto w-1/2 gap-4 rounded-md bg-white dark:bg-black">
      <div className="flex w-full items-center justify-between">
        <h3 className="flex basis-[100%] justify-center py-4 pl-10 text-3xl font-medium">
          {`${user?.firstName} ${user?.lastName}`}
        </h3>
        <div className="p-4">
          <EditUser teams={teams!} user={user} />
        </div>
      </div>
      <Separator />
      <div className="w-full px-8 pb-6 pt-3 text-2xl">
        <div>Email: {user.email}</div>
        <div>Contact No: {user.contact}</div>
        <div>Organization: {user.Organization.name}</div>
        {user.team && <div>Team: {user.team?.name}</div>}
      </div>
    </div>
  );
}
