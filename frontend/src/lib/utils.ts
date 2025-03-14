import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertNameToAbbreviation(name: string) {
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[names.length - 1];
  return names.length > 1
    ? firstName[0].toUpperCase() + lastName[0].toUpperCase()
    : firstName[0].toUpperCase();
}
