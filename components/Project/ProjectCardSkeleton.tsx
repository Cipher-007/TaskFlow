import clsx from "clsx";
import Card from "../Card";

export default function ProjectCardSkeleton() {
  return (
    <Card className="w-full !px-6 !py-8 transition-all duration-200 ease-in-out hover:scale-105">
      <div className="w-full animate-pulse">
        <div className="my-2 h-2 w-[60%] rounded bg-gray-300"></div>
        <div className="mb-6 mt-2 h-[36px] w-[55%] rounded bg-gray-300"></div>
        <div className="my-3 h-3 w-[55%] rounded bg-gray-300">
          <span className="text-gray-400"></span>
        </div>
        <div>
          <div className="mb-2 h-2 w-full rounded-full bg-gray-300">
            <div className={clsx("h-full rounded-full bg-gray-300")}></div>
          </div>
          <div className=" my-2 ml-auto mr-0 h-2 w-[5%] rounded-full bg-gray-300"></div>
        </div>
      </div>
    </Card>
  );
}
