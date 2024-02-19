"use client";

import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "~/lib/utils";

export default function UserAvatar() {
  const { data, isSuccess } = api.user.getCurrentUserInfo.useQuery();

  if (isSuccess) {
    return (
      <Avatar>
        <AvatarImage src={data?.image ?? ""} />
        <AvatarFallback>{getInitials(data?.name ?? "")}</AvatarFallback>
      </Avatar>
    );
  }
}
