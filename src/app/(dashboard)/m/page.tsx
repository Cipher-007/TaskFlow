import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page() {
  const session = await auth();

  if (session) {
    const onBoarded = await api.user.isOnboarded();
    if (!onBoarded) {
      redirect("/onboarding");
    } else {
      const org = await api.user.getUserOrganization();
      if (org?.organizationId === null) {
        redirect(`/onboarding/organization`);
      }
      redirect(`/m/${org?.organizationId}`);
    }
  }
}
