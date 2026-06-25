import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ApartmentsBrowser } from "@/components/apartments/ApartmentsBrowser";
import { getApartments } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apartmány — nabídka a dostupnost",
  description:
    "Devatenáct horských apartmánů (garsoniéry, 2+kk, 2+1 i mezonety) v projektu Zákoutí Apartments. Tabulka dostupnosti, ceny bez DPH a parametry.",
};

const CENA_BODY = [
  "Ceny jsou konečné a uvedené bez DPH",
  "V ceně každého bytu parkovací stání (1×)",
  "V ceně zděný sklep (5 m²)",
];

export default async function ApartmanyPage() {
  const apartmany = await getApartments();
  return (
    <>
      <PageHero
        eyebrow={`Nabídka · ${apartmany.length} apartmánů`}
        title="Apartmány — váš nový domov"
        emphasize={["domov"]}
        lead="Velkou předností je propojení investiční příležitosti s možností vlastního využití pro rodinnou rekreaci. Apartmány budou zkolaudovány jako bytové jednotky, což umožňuje bezproblémové financování prostřednictvím hypotečního úvěru."
      />
      <section className="py-16 lg:py-24">
        <Container>
          {/* Cenová doložka — co je v ceně */}
          <div className="mb-10 grid gap-3 border border-gold-300 bg-gold-100/50 p-6 sm:grid-cols-3 sm:gap-6 lg:p-8">
            {CENA_BODY.map((b) => (
              <p key={b} className="flex items-start gap-3 text-sm text-ink">
                <Check size={18} className="mt-0.5 shrink-0 text-gold-700" strokeWidth={2.2} />
                <span>{b}</span>
              </p>
            ))}
          </div>

          <ApartmentsBrowser apartments={apartmany} />
        </Container>
      </section>
    </>
  );
}
