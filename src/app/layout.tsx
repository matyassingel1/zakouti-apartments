import type { Metadata } from "next";
import { display, body, mono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zákoutí Apartments — moderní bydlení v srdci Orlických hor",
    template: "%s — Zákoutí Apartments",
  },
  description:
    "Nové moderní apartmány v Deštném v Orlických horách, lokalita Zákoutí. Devatenáct exkluzivních jednotek s dokončením v roce 2027 — ideální pro zimu, léto i investici.",
  keywords: [
    "apartmány Deštné v Orlických horách",
    "Zákoutí Apartments",
    "horské apartmány na prodej",
    "investiční nemovitost Orlické hory",
  ],
  openGraph: {
    title: "Zákoutí Apartments — moderní bydlení v srdci Orlických hor",
    description:
      "Devatenáct exkluzivních horských apartmánů v Deštném v Orlických horách. Dokončení 2027.",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="cs"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
