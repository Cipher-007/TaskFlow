import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function TaskSkeleton() {
  return (
    <Card className="m-5 py-2">
      <CardHeader>
        <CardTitle className="h-8 w-40 animate-pulse rounded bg-gray-300"></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-4 w-1/4 animate-pulse rounded bg-gray-300"></div>
      </CardContent>
    </Card>
  );
}
