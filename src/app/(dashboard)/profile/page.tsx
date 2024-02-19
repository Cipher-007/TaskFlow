import Profile from "@/components/profile/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile",
};

export default function ProfilePage() {
  return <Profile />;
}
