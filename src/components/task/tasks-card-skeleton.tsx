import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import TaskSkeleton from "./task-skeleton";

const tasks = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function TasksCardSkeleton({ title }: { title?: string }) {
  return (
    <Card>
      {title && (
        <CardHeader className="items-center">
          <CardTitle className="h-8 w-40 animate-pulse rounded bg-gray-300"></CardTitle>
        </CardHeader>
      )}
      <CardContent className="h-[40rem]">
        <div>
          {tasks.map((task) => (
            <TaskSkeleton key={task.id} />
          ))}
        </div>
      </CardContent>
      {title && (
        <CardFooter className="flex-col">
          <div className="h-10 w-24 animate-pulse bg-gray-300"></div>
        </CardFooter>
      )}
    </Card>
  );
}
