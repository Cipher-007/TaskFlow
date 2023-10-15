import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function TaskSkeleton() {
  return (
    <Card className="m-5 flex flex-row py-2">
      <CardHeader className="basis-1/3">
        <CardTitle className="h-6 w-28 animate-pulse rounded bg-gray-300"></CardTitle>
        <CardDescription className="h-5 w-52 animate-pulse rounded bg-gray-300"></CardDescription>
      </CardHeader>
      <CardContent className="flex basis-1/3 animate-pulse flex-col items-center px-1 py-6">
        <div className="mb-2 h-5 w-36 bg-gray-300" />
        <div className="h-6 w-32 rounded-lg bg-gray-300" />
      </CardContent>
      <CardFooter className="flex basis-1/3 animate-pulse justify-end gap-4 py-6 pr-14">
        <div className="h-10 w-[90px] rounded-md bg-gray-300" />
        <div className="h-10 w-[90px] rounded-md bg-gray-300" />
      </CardFooter>
    </Card>
  );
}
