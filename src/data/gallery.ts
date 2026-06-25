// Galerie webu — zrcadlí entitu `MediaGalerie`.
export type GalerieKategorie = "Vizualizace" | "Interiér" | "Okolí";

export interface GalerieItem {
  src: string;
  alt: string;
  kategorie: GalerieKategorie;
  /** orientace pro masonry */
  sirsi?: boolean;
}

export const galerie: GalerieItem[] = [
  {
    src: "/foto/budova.jpg",
    alt: "Vizualizace bytového domu Zákoutí — bílá fasáda, dřevěné balkony, břidlicová střecha a krytá stání.",
    kategorie: "Vizualizace",
    sirsi: true,
  },
  {
    src: "/foto/objekt-portret.jpg",
    alt: "Bytový dům Zákoutí v krajině Orlických hor.",
    kategorie: "Vizualizace",
  },
  {
    src: "/foto/interiery/obyvaci-pokoj.webp",
    alt: "Obývací pokoj s jídelnou — rohová sedačka, kruhové LED svítidlo a výhled do hor.",
    kategorie: "Interiér",
    sirsi: true,
  },
  {
    src: "/foto/interiery/loznice.webp",
    alt: "Ložnice s čalouněnou postelí, zrcadlovou skříní a horským obrazem.",
    kategorie: "Interiér",
  },
  {
    src: "/foto/interiery/kuchyne-studio.webp",
    alt: "Kuchyňský kout — dubová linka, černé spotřebiče a jídelní kout.",
    kategorie: "Interiér",
  },
  {
    src: "/foto/okoli-01.jpg",
    alt: "Letecký pohled na údolí Deštného — louky, lesy, sjezdovka a vlek.",
    kategorie: "Okolí",
    sirsi: true,
  },
  {
    src: "/foto/okoli-07.jpg",
    alt: "Objekt Zákoutí a jeho okolí.",
    kategorie: "Okolí",
  },
  {
    src: "/foto/okoli-08.jpg",
    alt: "Letní pohled na objekt Zákoutí a okolní přírodu.",
    kategorie: "Okolí",
  },
  {
    src: "/foto/krajina-1.jpg",
    alt: "Krajina Orlických hor v okolí projektu Zákoutí.",
    kategorie: "Okolí",
    sirsi: true,
  },
  {
    src: "/foto/krajina-3.jpg",
    alt: "Lesy a hřebeny Orlických hor.",
    kategorie: "Okolí",
  },
  {
    src: "/foto/krajina-4.jpg",
    alt: "Příroda Orlických hor v okolí Deštného.",
    kategorie: "Okolí",
  },
];
