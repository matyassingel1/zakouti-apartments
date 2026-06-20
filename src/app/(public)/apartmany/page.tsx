import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ApartmentsBrowser } from "@/components/apartments/ApartmentsBrowser";
import { getApartments } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apartmány — nabídka a dostupnost",
  description:
    "Šest exkluzivních horských apartmánů 1+kk až 2+kk v projektu Zákoutí Apartments. Tabulka dostupnosti, ceny a parametry.",
};

export default async function ApartmanyPage() {
  const apartmany = await getApartments();
  return (
    <>
      <PageHero
        eyebrow="Nabídka · 6 apartmánů"
        title="Apartmány — váš nový domov"
        emphasize={["domov"]}
        lead="Velkou předností je propojení investiční příležitosti s možností vlastního využití pro rodinnou rekreaci. Apartmány budou zkolaudovány jako bytové jednotky, což umožňuje bezproblémové financování prostřednictvím hypotečního úvěru."
      />
      <section className="py-16 lg:py-24">
        <Container>
          <ApartmentsBrowser apartments={apartmany} />
        </Container>
      </section>
    </>
  );
}
