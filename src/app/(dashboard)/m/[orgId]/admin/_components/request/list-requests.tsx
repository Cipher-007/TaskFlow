import { api } from "~/trpc/server";
import RequestCard from "./RequestCard";

export default async function ListRequests() {
  const user = await api.user.getCurrentUserInfo.query();

  if (user?.organizationId) {
    const requests = await api.requests.getAllRequests.query({
      organizationId: user.organizationId,
    });
    return (
      <div className="flex grow flex-wrap overflow-y-auto p-2">
        {requests
          .filter((request) => request.userId !== user?.id)
          .map((request) => (
            <div key={request.id} className="w-1/4 min-w-[20rem] pt-3">
              <RequestCard request={request} />
            </div>
          ))}
        <div className="w-full text-center text-3xl font-medium">
          <p>No membership requests yet</p>
        </div>
      </div>
    );
  }
}
