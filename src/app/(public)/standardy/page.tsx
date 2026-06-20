import type { Metadata } from "next";
import { Download, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContourField } from "@/components/ui/Decor";
import { MonogramZ } from "@/components/ui/GoldRidge";
import { standardy } from "@/data/standards";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Standardy provedení",
  description:
    "Prémiové materiály a moderní technologie apartmánů Zákoutí — kompletní technické provedení.",
};

export default async function StandardyPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Standardy"
        title="Prémiové materiály a technologie"
        emphasize={["materiály"]}
        lead="Prémiové materiály a moderní technologie pro váš maximální komfort v srdci Orlických hor."
      />

      <section className="relative overflow-hidden py-16 lg:py-24">
        <ContourField className="opacity-100" opacity={0.14} drift={10} />
        <MonogramZ className="pointer-events-none absolute -left-16 top-1/3 text-[24rem] leading-none" />
        <Container className="relative">
          <Reveal>
            {settings.standardy_pdf ? (
              <a
                href={settings.standardy_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <Download size={16} /> Stáhnout standardy (PDF)
              </a>
            ) : (
              <span className="mono inline-flex items-center gap-2 border border-line bg-ivory px-4 py-2.5 text-xs text-stone">
                <Download size={15} className="text-gold-700" />
                Kompletní PDF „ZÁKOUTÍ Apartments – Standardy" Vám na vyžádání zašle makléřka.
              </span>
            )}
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {standardy.map((kat, i) => (
              <Reveal
                key={kat.id}
                index={i % 2}
                className="group relative overflow-hidden border border-line bg-pure/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold-300 hover:shadow-[0_24px_60px_-32px_rgba(124,98,40,0.4)] lg:p-9"
              >
                <span className="pointer-events-none absolute right-0 top-0 font-display text-[7rem] leading-none text-gold-500/[0.05] transition-colors duration-500 group-hover:text-gold-500/[0.1]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-gold-100 text-gold-700 transition-transform duration-500 group-hover:scale-110">
                    <kat.ikona size={22} strokeWidth={1.5} />
                  </span>
                  <h2 className="text-h3 text-ink">{kat.nazev}</h2>
                </div>
                <div className="hairline-gold my-6 opacity-60" />
                <ul className="relative space-y-3.5">
                  {kat.polozky.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-body-lg text-pretty text-stone">
                      <Check size={17} className="mt-1 shrink-0 text-gold-700" strokeWidth={2} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 border-l-2 border-gold-500 bg-ivory p-6 lg:p-8">
            <p className="text-body-lg text-stone">
              <span className="font-medium text-ink">Poznámka:</span> Změny vyhrazeny. Budoucí
              kupující má právo zvolit si jiné než standardní vybavení apartmánu (po dohodě a za
              stanovených podmínek).
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
