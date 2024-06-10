import { api } from "~/trpc/server";
import AccessDeniedComponent from "../_components/access-denied-component";

export const metadata = {
  title: "Calendar",
  description: "Calendar Page",
};

export default async function CalendarPage() {
  const access = await api.user.isApproved();

  if (!access) {
    return <AccessDeniedComponent />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-3xl font-medium">
      <div>Coming soon...</div>
    </div>
  );
}
