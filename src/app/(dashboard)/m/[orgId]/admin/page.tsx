import { api } from "~/trpc/server";
import AccessDeniedComponent from "../_components/access-denied-component";
import ListMembers from "../_components/member/list-members";

export const metadata = {
  title: "Admin",
  description: "Admin Page",
};

export default async function AdminPage() {
  const access = await api.user.isApproved.query();

  if (access) {
    return <ListMembers show={false} />;
  }

  return <AccessDeniedComponent />;
}
