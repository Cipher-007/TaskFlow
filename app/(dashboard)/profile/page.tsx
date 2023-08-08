import UserProfile from "@/components/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile",
};

export default function Profile() {
  return <UserProfile />;
}
