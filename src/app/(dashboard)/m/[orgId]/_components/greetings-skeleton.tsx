import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function GreetingsSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="animate-pulse">
        <CardTitle className="h-6 w-40 rounded bg-gray-300"></CardTitle>
      </CardHeader>
      <CardContent className="animate-pulse">
        <div className="h-7 w-80 rounded bg-gray-300" />
      </CardContent>
      <CardFooter className="animate-pulse">
        <div className="h-11 w-64 rounded-3xl bg-gray-300" />
      </CardFooter>
    </Card>
  );
}
