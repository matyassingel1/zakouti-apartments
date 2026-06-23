import type { Metadata } from "next";
import {
  Footprints,
  Bike,
  Mountain,
  UtensilsCrossed,
  Car,
  MapPin,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/WordReveal";
import { Photo } from "@/components/ui/Photo";
import { RouteRidge } from "@/components/ui/GoldRidge";
import { site } from "@/data/site";
import { fixWidows } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Lokalita — Deštné v Orlických horách",
  description:
    "Turistické trasy, gastronomie, sport a dostupnost lokality Zákoutí v Deštném v Orlických horách.",
};

const SEKCE = [
  {
    icon: Footprints,
    znacka: "0 m · základna",
    nadpis: "Turistické trasy a stezky",
    text: "V okolí Deštného přichází v úvahu desítky značených turistických tras, včetně naučných stezek a okruhů po hřebenech. Významnou roli hraje naučná stezka »Po stopách Bylo nás pět«, dlouhá cca 15 km, která vede přes CHKO Orlické hory, přírodní rezervaci Bukačka a podél hřebenu Orlických hor. Z Deštného vycházejí červené, zelené i modré značené trasy směrem k Šerlichu, Malé Deštné a Velké Deštné.",
  },
  {
    icon: Bike,
    znacka: "léto",
    nadpis: "Letní adrenalin i pohodové chvíle",
    text: "Když roztaje sníh, promění se Zákoutí v živé zázemí pro horskou cyklistiku, turistiku a outdoor zábavu. V krátké vzdálenosti najdete Bikepark Deštné s traily pro všechny úrovně. V okolí je lanový Adventure park (přibližně 15 minut chůze nebo 3 minuty autem), cyklostezky a sportovní plochy — ideální pro aktivní rodinu.",
    foto: { src: "/foto/okoli-08.jpg", alt: "Letní pohled na okolí Zákoutí." },
  },
  {
    icon: Mountain,
    znacka: "+320 m · hřeben",
    nadpis: "Přírodní krásy beroucí dech",
    text: "Zákoutí je klidná základna pro výlety na hřebeny Orlických hor — síť stezek vede k Velké Deštné, Masarykově chatě i Šerlichu. Výstupy na rozhledny, cesty lesem i okruhy nabízejí čistý vzduch, klid a výhledy, které tají dech.",
  },
  {
    icon: UtensilsCrossed,
    znacka: "gastronomie",
    nadpis: "Kde se dobře žije",
    text: "V Deštném Vás překvapí bohatá rodinná gastronomie. V blízkosti apartmánu najdete stylizované bistro, útulnou horskou hospodu i pizzerie. Doporučujeme: restauraci KOZÍ CHLÍVEK (centrum Deštného, cca 15 minut chůze), Srub KAROLINA (u skiareálu Šerlich, cca 20 minut chůze), Hospůdku NA STARÉ CESTĚ (cca 15 minut chůze).",
  },
  {
    icon: Car,
    znacka: "doprava",
    nadpis: "Dostupnost a doprava",
    text: "Deštné leží v krátké vzdálenosti od hlavních silnic I/11 a II/340 — snadno se dostanete do Rychnova nad Kněžnou, Hradce Králové i Prahy. V zimě je zimní údržba výborná, sjezdové trasy i přístupové cesty jsou systematicky udržovány.",
  },
];

export default function LokalitaPage() {
  return (
    <>
      <PageHero
        eyebrow="Lokalita · CHKO Orlické hory"
        title="Oblast plná tras a přírodních zážitků"
        emphasize={["zážitků"]}
        lead="Deštné v Orlických horách patří k nejpopulárnějším horským střediskům České republiky — čisté ovzduší, zážitková příroda a zázemí pro zimu i léto."
        photo={{
          src: "/foto/okoli-01.jpg",
          alt: "Letecký pohled na údolí Deštného — louky, lesy, sjezdovka a vlek.",
        }}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="relative grid grid-cols-12 gap-x-8">
            {/* Kontura / trasa */}
            <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-16 lg:block">
              <RouteRidge className="h-full w-full" />
            </div>

            <div className="col-span-12 space-y-20 lg:col-span-10 lg:col-start-2">
              {SEKCE.map((s, i) => (
                <Reveal key={s.nadpis} className="grid grid-cols-12 items-start gap-8">
                  <div className="col-span-12 lg:col-span-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300 bg-gold-100 text-gold-700">
                      <s.icon size={22} strokeWidth={1.5} />
                    </span>
                    <p className="mono mt-4 text-xs uppercase tracking-[0.14em] text-gold-900">
                      {s.znacka}
                    </p>
                    <h2 className="mt-2 text-h2 text-ink">{s.nadpis}</h2>
                  </div>
                  <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-2">
                    <p className="text-body-lg text-pretty text-stone">{fixWidows(s.text)}</p>
                    {s.foto && (
                      <Photo
                        src={s.foto.src}
                        alt={s.foto.alt}
                        className="mt-6 aspect-[16/10] w-full"
                      />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Mapa */}
      <section className="bg-ivory py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Mapa</Eyebrow>
            <h2 className="mt-4 text-h2 text-ink">Lokalita Zákoutí, č. p. 32</h2>
            <p className="mt-3 max-w-2xl text-body-lg text-stone">
              {site.adresaProjektu}
            </p>
          </Reveal>
          <Reveal className="mt-8 overflow-hidden border border-line">
            <iframe
              title="Mapa — Deštné v Orlických horách, lokalita Zákoutí"
              src={site.mapa.embed}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
          <Reveal className="mt-4">
            <a
              href={site.mapa.odkaz}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 text-sm text-gold-900"
            >
              <MapPin size={15} /> Otevřít v mapách
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
