import ProfileForm from "@/components/ProfileForm";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Settings",
  description: "Edit Profile",
};

async function getData() {
  const user = await getUserFromCookie(cookies() as unknown as RequestCookies);
  return await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });
}

export default async function Settings() {
  const user = await getData();
  return <ProfileForm data={user!} />;
}