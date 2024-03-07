import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import IndividualRegistrationForm from "./_components/individual-registration-form";

export const metadata = {
  title: "Onboarding",
  description: "Onboarding Page",
};

export const dynamic = "force-dynamic";

export default async function OnBoardingPage() {
  const onBoarded = await api.user.isOnboarded.query();

  if (onBoarded) {
    redirect("/m");
  }

  const orgs = await api.organization.getAll.query();

  if (orgs.length === 0) {
    redirect("/onboarding/organization");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <div className="text-3xl font-semibold tracking-tight">
        Select your organization and role
      </div>
      <div className="w-[25rem] flex-col rounded-lg bg-white p-10 dark:bg-black">
        <IndividualRegistrationForm />
        <div className="relative my-6">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-black px-6 text-white">Or</span>
          </div>
        </div>
        <div className="flex w-full justify-center text-blue-600 hover:text-blue-500">
          <Link href="/signin" className="font-bold">
            Create a new organization
          </Link>
        </div>
      </div>
    </div>
  );
}
