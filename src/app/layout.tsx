import type { Metadata } from "next";
import { display, body, mono } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
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
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Přeskočit na obsah
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <ScrollProgress />
        <Header />
        <main id="obsah" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
