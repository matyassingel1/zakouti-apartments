import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryView } from "@/components/gallery/GalleryView";
import { getGallery } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Vizualizace, interiéry a fotografie okolí projektu Zákoutí Apartments v Deštném v Orlických horách.",
};

export default async function GaleriePage() {
  const galerie = await getGallery();
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Vizualizace, interiéry a okolí"
        emphasize={["interiéry"]}
        lead="Investujte do apartmánu a relaxujte se svými blízkými každý víkend."
      />
      <section className="py-16 lg:py-24">
        <Container>
          <GalleryView galerie={galerie} />
        </Container>
      </section>
    </>
  );
}
