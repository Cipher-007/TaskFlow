import Card from "@/components/Card";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import TaksCardSkeleton from "@/components/TaksCardSkeleton";
import TaskCard from "@/components/TaskCard";

const projects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export default function HomePageLoader() {
  return (
    <div className="h-full w-full overflow-y-auto pl-4 pr-4">
      <div className=" h-full  min-h-[content] items-stretch justify-center">
        <div className="flex flex-1 grow pt-3">
          <GreetingsSkeleton />
        </div>
        <div className="flex-2 -m-3 mt-3 flex grow flex-wrap items-center ">
          {projects.map((project) => (
            <div key={project.id} className="w-1/3 p-3">
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
        <div className="flex-2 mt-6 flex w-full grow">
          <div className="w-full pb-4">
            <TaksCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
