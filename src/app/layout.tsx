import { ThemeProvider } from "@/components/theme-provider";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import "@/styles/globals.css";
import { Theme } from "@prisma/client";
import { cookies } from "next/headers";

export default async function DashboardRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie(cookies());

  let theme: Theme = "dark";

  if (user) {
    const data = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        theme: true,
      },
    });
    theme = data?.theme!;
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
