import AccessDeniedComponent from "@/components/access-denied-component";
import { isApproved } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function CalendarPage() {
  const access = await isApproved(cookies());
  return (
    <div className="mx-32 w-full text-center text-3xl font-medium">
      {access ? <div>Cooming soon...</div> : <AccessDeniedComponent />}
    </div>
  );
}
