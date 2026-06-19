import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";

// Display serif — high-contrast luxury (Sotheby's / Vogue vibe). latin-ext = Czech diakritika.
export const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--ff-display",
  display: "swap",
});

// Body — clean geometric sans.
export const body = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--ff-body",
  display: "swap",
});

// Mono — eyebrows, technical labels, prices in table.
export const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});
