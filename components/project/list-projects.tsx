import { getUserFromCookie } from "@/lib/auth";
import type { Project, Task } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";
import SingleProject from "./single-project";

type Props = {
  projects: (Project & { tasks: Task[] })[];
};

export default async function ListProjects({ projects }: Props) {
  const user = await getUserFromCookie(cookies());

  if (!user?.teamId) {
    return (
      <div className="flex h-[40rem] w-full items-center justify-center text-3xl font-medium">
        <p>No team assigned</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex-2 -m-3 flex grow flex-wrap items-center">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="w-1/4 p-3">
              <Link href={`/project/${project.id}`}>
                <SingleProject project={project} />
              </Link>
            </div>
          ))
        ) : (
          <div className="flex h-[10rem] w-full items-center justify-center p-4 text-3xl font-medium">
            <p>No projects yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
