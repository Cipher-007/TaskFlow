export default function AuthRootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen p-6">
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
