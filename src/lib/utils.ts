import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name: string) {
  const words = name.split(" ");
  let initials = "";
  for (const word of words) {
    if (word.length > 0) {
      initials += word[0]!.toUpperCase();
    }
  }
  return initials;
}
