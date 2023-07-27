import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import NewProject from "@/components/NewProject";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

async function getData() {
  await delay(2000);
  const user = await getUserFromCookie(cookies() as unknown as RequestCookies);

  const projects = await db.project.findMany({
    where: { ownerId: user?.id },
    include: { tasks: true },
  });

  return { projects };
}

export default async function Page() {
  const { projects } = await getData();
  return (
    <div className="h-full w-full overflow-y-auto pl-4 pr-4">
      <div className=" h-full  min-h-[content] items-stretch justify-center">
        <div className="flex flex-1 grow pt-3">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <div className="flex-2 -m-3 mt-3 flex grow flex-wrap items-center ">
          {projects.map((project) => (
            <div key={project.id} className="w-1/3 p-3">
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-4">
            <NewProject />
          </div>
        </div>
        <div className="flex-2 mt-6 flex w-full grow">
          <div className="w-full pb-4">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
