import clsx from "clsx";

type Props = {
  className: string;
};

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className={clsx(
        "border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg",
        className,
      )}
      {...props}
    />
  );
}
