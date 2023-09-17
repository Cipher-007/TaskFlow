import "@/styles/globals.css";

export default function DashboardRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className="bg-gradient-to-b from-black to-blue-900">
        {children}
      </body>
    </html>
  );
}
