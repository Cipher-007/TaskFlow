import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";
import { auth } from "~/server/auth";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { api } from "~/trpc/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Projectverse",
  description: "One app to replace them all.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Theme = "dark" | "light";

export default async function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  let theme: Theme = "dark";

  if (session) {
    const user = await api.user.getUserTheme();
    theme = user?.theme ?? "dark";
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`h-full w-full bg-gradient-to-b from-black to-blue-900 font-sans ${inter.variable}`}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme={theme}
            disableTransitionOnChange
          >
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
