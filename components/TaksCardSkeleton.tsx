import Card from "./Card";

const tasks = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export default function TaksCardSkeleton() {
  return (
    <Card className="w-full">
      <div className="my-4 flex w-full animate-pulse items-center justify-center">
        <div className="text-3xl text-gray-600"></div>
      </div>
      <div className="animate-pulse">
        <div>
          {tasks.map((task) => (
            <div className="my-4 rounded-full bg-gray-300 py-2" key={task.id}>
              <div></div>
            </div>
          ))}
          <div className="w-1/1 mx-auto flex h-9 w-[12%] items-center rounded bg-gray-300"></div>
        </div>
      </div>
    </Card>
  );
}
