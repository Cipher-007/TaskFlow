import OrganizationRegistrationForm from "../_components/organization-registration-form";

export default function OrganizationPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <div className="text-3xl font-semibold tracking-tight">
        Create your organization
      </div>
      <div className="w-[27rem] flex-col rounded-lg bg-white p-10 dark:bg-black">
        <OrganizationRegistrationForm />
      </div>
    </div>
  );
}
