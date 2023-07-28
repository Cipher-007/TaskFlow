import Card from "./Card";

export default function GreetingsSkeleton() {
  return (
    <Card className="w-full py-14">
      <div className="animate-pulse">
        <div className="mb-4">
          <div className="mb-4 h-9 w-[15%] rounded bg-gray-300"></div>
          <div className="h-6 w-[25%] bg-gray-300"></div>
        </div>
        <div className="mb-4">
          <div className="h-14 w-[15%] rounded-3xl bg-gray-300"></div>
        </div>
      </div>
    </Card>
  );
}
