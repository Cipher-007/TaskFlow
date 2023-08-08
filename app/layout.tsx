import "@/styles/globals.css";

export default function DashboardRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}
      </body>
    </html>
  );
}
