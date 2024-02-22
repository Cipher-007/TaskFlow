import Profile from "./profile";

export const metadata = {
  title: "Profile",
  description: "User Profile",
};

export default function ProfilePage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Profile />
    </div>
  );
}
