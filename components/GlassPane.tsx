import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
};

export default function GlassPane({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-2 border-solid border-gray-200",
        className,
      )}
    >
      {children}
    </div>
  );
}
