import ListProjects from "@/components/project/list-projects";
import NewProject from "@/components/project/new-project";
import { Separator } from "@/components/ui/separator";
import { getUserFromCookie, isAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getData(teamId: string, userId: string) {
  const projects = await db.project.findMany({
    where: {
      teamId: teamId,
      permissions: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      tasks: {
        where: {
          permissions: {
            some: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return projects;
}

export default async function page() {
  const user = await getUserFromCookie(cookies());

  if (!user) {
    redirect("/signin");
  }

  const projects = await getData(user.teamId!, user.id);
  const admin = await isAdmin(cookies());

  return (
    <div className="ml-4 flex w-full flex-col items-center justify-between gap-4 rounded-md bg-white dark:bg-black">
      <div className="pt-4 text-3xl font-bold tracking-tight">Projects</div>
      <Separator />
      <div className="w-full px-10">
        <ListProjects projects={projects} />
      </div>
      <Separator />
      {admin && (
        <div className="flex justify-center">
          <NewProject />
        </div>
      )}
    </div>
  );
}
