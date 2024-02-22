import Link from "next/link";
import { type Project } from "~/server/db/schema";
import SingleProject from "./single-project";

export default function ListProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="flex w-full grow flex-wrap py-1">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div
            key={project.id}
            className="h-fit px-3 py-2 md:w-[45%] lg:w-1/2 xl:w-1/3 2xl:w-1/4"
          >
            <Link
              href={`/m/${project.organizationId}/${project.teamId}/project/${project.id}`}
            >
              <SingleProject project={project} />
            </Link>
          </div>
        ))
      ) : (
        <div className="flex h-[15rem] w-full items-center justify-center p-4 text-3xl font-medium">
          No projects yet
        </div>
      )}
    </div>
  );
}
