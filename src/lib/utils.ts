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

/** 25 -> "25 m²", 0 -> "—". */
export function formatAreaOrDash(value: number): string {
  return value > 0 ? formatArea(value) : "—";
}

/**
 * České sirotky/vdovy: jednohláskové předložky a spojky (k s v z o u a i) ani
 * spaced pomlčky nemají zůstat na konci řádku — řeší se nezalomitelnou mezerou.
 * Lookbehind opraví i dvě předložky za sebou (např. „a v lese").
 */
export function fixWidows(text: string): string {
  return text
    .replace(/(?<=^|[\s(„"–—/])([KkSsVvZzOoUuAaIi])[ \t]+/g, `$1${NBSP}`)
    .replace(/ ([–—]) /g, `${NBSP}$1 `);
}
