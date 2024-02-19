import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { signIn } from "~/server/auth";

export default function Layout() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/m" });
      }}
    >
      <Button className="flex gap-x-3">
        <GitHubLogoIcon height={30} width={30} />
        <div className="text-lg">Sign in with GitHub</div>
      </Button>
    </form>
  );
}
