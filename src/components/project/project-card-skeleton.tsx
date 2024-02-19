import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ProjectCardSkeleton() {
  return (
    <Card className="w-full transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader className="animate-pulse">
        <CardTitle className="h-6 w-36 rounded bg-gray-300"></CardTitle>
        <CardDescription className="h-5 w-48 rounded bg-gray-300"></CardDescription>
      </CardHeader>
      <CardContent className="animate-pulse pb-1">
        <div className="h-6 w-48 bg-gray-300" />
        <div className="my-2">
          <div className="mb-2 h-2 w-full rounded-full bg-gray-300">
            <div className="h-full rounded-full bg-gray-300"></div>
          </div>
          <CardFooter className="flex-row-reverse pr-0 pt-3">
            <div className=" my-2 ml-auto mr-0 h-2 w-[5%] rounded-full bg-gray-300"></div>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}
