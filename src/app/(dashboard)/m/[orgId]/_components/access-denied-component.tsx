export default function AccessDeniedComponent() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-3xl text-white">
        Your onboarding is still pending. Please wait for the admin to approve
        your request.
      </h1>
    </div>
  );
}
