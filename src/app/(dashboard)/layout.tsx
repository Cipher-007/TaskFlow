import { Toaster } from "~/components/ui/toaster";

export default async function DashboardRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
      {children}
      <Toaster />
    </main>
  );
}
