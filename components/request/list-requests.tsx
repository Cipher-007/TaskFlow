import { getUserFromCookie } from "@/lib/auth";
import type { RequestStatus, User } from "@prisma/client";
import { cookies } from "next/headers";
import RequestCard from "./RequestCard";

export default async function ListRequests({
  Requests,
}: {
  Requests: { id: string; status: RequestStatus; user: Partial<User> }[];
}) {
  const user = await getUserFromCookie(cookies());
  return (
    <div className="flex grow flex-wrap overflow-y-auto p-2">
      {Requests.filter((request) => request.user.id !== user?.id).map(
        (request) => (
          <div key={request.id} className="w-1/4 min-w-[20rem] pt-3">
            <RequestCard request={request} />
          </div>
        ),
      )}
    </div>
  );
}
