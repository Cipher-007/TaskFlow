import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import ListRequests from "../_components/request/list-requests";

export const metadata = {
  title: "Requests",
  description: "Requests Page",
};

export default async function UsersPage() {
  const user = await api.user.getCurrentUserInfo.query();

  if (user && (user.globalRole == "ADMIN" || user.role === "TEAM_LEAD")) {
    return (
      <div className="w-full">
        <div className="px-4 pb-1">
          <ListRequests />
        </div>
      </div>
    );
  } else {
    redirect(`/m/${user?.organizationId}`);
  }
}
