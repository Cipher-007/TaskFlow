import { ThemeProvider } from "~/components/theme-provider";
import { auth } from "~/server/auth";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { api } from "~/trpc/server";

type Theme = "dark" | "light";

export default async function DashboardRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  let theme: Theme = "dark";

  if (session) {
    const user = await api.user.getCurrentUserInfo.query();
    theme = user?.theme ?? "dark";
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="h-full w-full bg-gradient-to-b from-black to-blue-900">
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          disableTransitionOnChange
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
