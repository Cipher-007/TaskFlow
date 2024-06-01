import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";
import ListProjects from "../_components/project/list-projects";
import NewProject from "../_components/project/new-project";

export const metadata = {
  title: "Projects",
  description: "Projects Page",
};

export default async function page() {
  const projects = await api.project.getAll();
  const admin = await api.user.isAdmin();

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-md bg-white dark:bg-black">
      <div className="flex w-full flex-col">
        <div className="mx-auto py-4 text-3xl font-bold tracking-tight">
          Projects
        </div>
        <Separator />
        <div className="px-3 pt-1">
          <ListProjects projects={projects} />
        </div>
      </div>
      {admin && (
        <div className="flex justify-center">
          <NewProject />
        </div>
      )}
    </div>
  );
}
