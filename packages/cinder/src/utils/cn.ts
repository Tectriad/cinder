import { clsx, type ClassValue } from "clsx";

/**
 * Utility to merge CSS class names safely.
 * Can be augmented with tailwind-merge when styling pipeline is configured.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
