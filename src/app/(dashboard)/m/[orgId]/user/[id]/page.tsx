import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";
import EditUser from "../_components/edit-user";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await api.user.getUserInfo(params.id);

  if (!user) {
    return (
      <div className="mx-32 w-full text-center text-3xl font-medium">
        User not found
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto w-1/2 gap-4 rounded-md bg-white dark:bg-black">
        <div className="flex w-full items-center justify-evenly">
          <Avatar className="ml-2">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{user.name[0]!.toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3 className="flex basis-[100%] justify-center py-4 pl-10 text-3xl font-medium">
            {user.name}
          </h3>
          <div className="p-4">
            <EditUser user={user} />
          </div>
        </div>
        <Separator />
        <div className="w-full px-8 pb-6 pt-3 text-2xl">
          <div>Email: {user.email}</div>
          <div>Role: {user.role}</div>
        </div>
      </div>
    </div>
  );
}
