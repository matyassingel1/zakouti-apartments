import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NNBSP = " "; // narrow no-break space — thousands separator
const NBSP = " "; // no-break space — before units

/** 3490000 -> "3 490 000 Kč" with narrow NBSP groups and NBSP before Kč. */
export function formatCzk(value: number): string {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP);
  return `${grouped}${NBSP}Kč`;
}

/** 84 -> "84 m²" (NBSP before unit). */
export function formatArea(value: number): string {
  return `${value}${NBSP}m²`;
}

/** Keep one-letter Czech prepositions/conjunctions glued to the next word. */
export function fixWidows(text: string): string {
  return text.replace(/(\s|^)([ksvzouaiKSVZOUAI])\s/g, `$1$2${NBSP}`);
}
