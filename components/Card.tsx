import clsx from "clsx";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ className, children }: Props) {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white px-10 py-4 drop-shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
