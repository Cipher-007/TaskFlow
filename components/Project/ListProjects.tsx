import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Link from "next/link";

const ProjectCard = dynamic(() => import("@/components/Project/ProjectCard"));
const NewProject = dynamic(() => import("@/components/Project/NewProject"));

async function getData() {
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: { ownerId: user?.id },
    include: { tasks: true },
  });

  return { projects };
}
export default async function ListProjects() {
  const { projects } = await getData();
  return (
    <div className="flex-2 -m-3 mt-3 flex grow flex-wrap items-center ">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="w-1/3 p-3">
            <Link href={`/project/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          </div>
        ))
      ) : (
        <div className="w-full text-center text-3xl font-medium">
          <p>No projects yet</p>
        </div>
      )}
      <div className="w-1/3 p-4">
        <NewProject />
      </div>
    </div>
  );
}
