import ProfileForm from "@/components/profile/profile-form";
import { Separator } from "@/components/ui/separator";
import { getUserFromCookie } from "@/lib/auth";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Settings",
  description: "App settings",
};

export default async function SettingsProfilePage() {
  const user = await getUserFromCookie(cookies());
  return (
    <div className="mx-auto w-[80%] space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user!} />
    </div>
  );
}
