import type { Metadata } from "next";
import { Download, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { standardy } from "@/data/standards";

export const metadata: Metadata = {
  title: "Standardy provedení",
  description:
    "Prémiové materiály a moderní technologie apartmánů Zákoutí — kompletní technické provedení.",
};

export default function StandardyPage() {
  return (
    <>
      <PageHero
        eyebrow="Standardy"
        title="Prémiové materiály a technologie"
        emphasize={["materiály"]}
        lead="Prémiové materiály a moderní technologie pro váš maximální komfort v srdci Orlických hor."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <span className="mono inline-flex items-center gap-2 border border-line bg-ivory px-4 py-2.5 text-xs text-stone">
              <Download size={15} className="text-gold-700" />
              Kompletní PDF „ZÁKOUTÍ Apartments – Standardy" Vám na vyžádání zašle makléřka.
            </span>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {standardy.map((kat, i) => (
              <Reveal
                key={kat.id}
                index={i % 2}
                className="border border-line bg-pure p-8 lg:p-9"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-gold-100 text-gold-700">
                    <kat.ikona size={22} strokeWidth={1.5} />
                  </span>
                  <h2 className="text-h3 text-ink">{kat.nazev}</h2>
                </div>
                <div className="hairline-gold my-6 opacity-60" />
                <ul className="space-y-3.5">
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
