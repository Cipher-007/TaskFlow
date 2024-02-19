import AccessDeniedComponent from "@/components/access-denied-component";
import Greetings from "@/components/greetings";
import ListProjects from "@/components/project/list-projects";
import NewProject from "@/components/project/new-project";
import ListTasks from "@/components/task/list-tasks";
import { getUserFromCookie, isAdmin, isApproved } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home",
  description: "Home Page",
};

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
    take: 8,
  });

  return projects;
}

export default async function HomePage() {
  const user = await getUserFromCookie(cookies());

  if (!user) {
    redirect("/signin");
  }

  const access = await isApproved(cookies());

  if (access && user.teamId) {
    const admin = await isAdmin(cookies());
    const projects = await getData(user.teamId!, user.id);
    return (
      <div className="h-full w-full overflow-y-auto pl-4 pr-4">
        <div className=" h-full  min-h-[content] items-stretch justify-center">
          <div className="flex flex-1 grow pt-3">
            <Greetings />
          </div>
          <div className="my-3">
            <ListProjects projects={projects} />
          </div>
          {admin && (
            <div className="flex justify-center">
              <NewProject />
            </div>
          )}
          <div className="flex-2 flex w-full grow">
            <div className="w-full pb-4">
              <ListTasks />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AccessDeniedComponent />;
}
