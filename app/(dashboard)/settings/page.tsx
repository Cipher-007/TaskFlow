import Profile from "@/components/Profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Edit Profile",
};

export default function Settings() {
  return <Profile />;
}
