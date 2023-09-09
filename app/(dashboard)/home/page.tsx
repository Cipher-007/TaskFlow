import Greetings from "@/components/Greetings";
import ListProjects from "@/components/Project/ListProjects";
import ListTasks from "@/components/Task/ListTasks";

export const metadata = {
  title: "Home",
  description: "Home Page",
};

export default function Page() {
  return (
    <div className="h-full w-full overflow-y-auto pl-4 pr-4">
      <div className=" h-full  min-h-[content] items-stretch justify-center">
        <div className="flex flex-1 grow pt-3">
          <Greetings />
        </div>
        <ListProjects />
        <div className="flex-2 mt-6 flex w-full grow">
          <div className="w-full pb-4">
            <ListTasks />
          </div>
        </div>
      </div>
    </div>
  );
}
