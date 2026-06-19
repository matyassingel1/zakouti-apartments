// Zrcadlí databázovou entitu `Apartman` (Base44 / budoucí CMS).
// Web čte výhradně odsud — žádná čísla natvrdo v komponentách.

export type Dispozice = "1+kk" | "1+1" | "2+kk";
export type Podlazi = "I. NP" | "II. NP";
export type Stav = "Volný" | "Rezervováno" | "Prodáno";

export interface ApartmanFoto {
  src: string;
  alt: string;
  popis: string;
}

export interface Apartman {
  slug: string;
  oznaceni: string;
  dispozice: Dispozice;
  podlazi: Podlazi;
  plocha_m2: number;
  balkon_terasa: string;
  vyhled: string;
  cena_kc: number;
  stav: Stav;
  popis: string;
  pudorys: string;
  fotky: ApartmanFoto[];
  parkovaci_stani: boolean;
  sklepni_koje: boolean;
  poradi: number;
}

const INT_KUCHYNE: ApartmanFoto = {
  src: "/foto/interiery/kuchyne-studio.webp",
  alt: "Vizualizace kuchyňského studia 1+kk — dubová linka, černé spotřebiče, jídelní kout a pohovka s výhledem do přírody.",
  popis: "Kuchyňské studio — ilustrativní vizualizace",
};
const INT_OBYVAK: ApartmanFoto = {
  src: "/foto/interiery/obyvaci-pokoj.webp",
  alt: "Vizualizace obývacího pokoje s jídelnou — rohová sedačka, kruhové LED svítidlo, kulatý stůl a výhled do hor.",
  popis: "Obývací pokoj s jídelnou — ilustrativní vizualizace",
};
const INT_LOZNICE: ApartmanFoto = {
  src: "/foto/interiery/loznice.webp",
  alt: "Vizualizace ložnice — čalouněná postel, zrcadlová šatní skříň, horský obraz a balkon.",
  popis: "Ložnice — ilustrativní vizualizace",
};
const EXTERIER: ApartmanFoto = {
  src: "/foto/budova.jpg",
  alt: "Vizualizace bytového domu Zákoutí — bílá fasáda, dřevěné balkony, břidlicová střecha a kamenná podnož.",
  popis: "Bytový dům Zákoutí — exteriér",
};

export const apartments: Apartman[] = [
  {
    slug: "1kk-33",
    oznaceni: "A1",
    dispozice: "1+kk",
    podlazi: "II. NP",
    plocha_m2: 33,
    balkon_terasa: "balkón 5 m²",
    vyhled: "vrcholky Orlického národního parku",
    cena_kc: 3490000,
    stav: "Volný",
    popis: `Exkluzivně Vám nabízíme atraktivní prosvětlený apartmán v II. NP. Dispozice jednotky je 1+kk, o celkové rozloze 33 m². Součástí apartmánu je slunný balkón o výměře 5 m², který nabízí příjemné venkovní posezení s výhledem přímo na vrcholky Orlického národního parku. Samozřejmostí je vlastní parkovací stání, sklepní kóje a podíl na společných prostorách nemovitosti.`,
    pudorys: "/foto/pudorysy/1kk-33m2.jpg",
    fotky: [INT_KUCHYNE, EXTERIER],
    parkovaci_stani: true,
    sklepni_koje: true,
    poradi: 1,
  },
  {
    slug: "1kk-35",
    oznaceni: "A2",
    dispozice: "1+kk",
    podlazi: "II. NP",
    plocha_m2: 35,
    balkon_terasa: "balkón 5 m²",
    vyhled: "vrcholky Orlických hor",
    cena_kc: 3490000,
    stav: "Volný",
    popis: `Exkluzivně Vám nabízíme atraktivní apartmán v II. NP rezidenčního projektu Zákoutí Apartments. Dispozice jednotky je 1+kk o celkové rozloze 35 m². Součástí apartmánu je slunný balkón o výměře 5 m², který nabízí příjemné venkovní posezení s výhledem na vrcholky Orlických hor. Samozřejmostí je vlastní parkovací stání, sklepní kóje a podíl na společných prostorách nemovitosti.`,
    pudorys: "/foto/pudorysy/1kk-35m2.jpg",
    fotky: [INT_KUCHYNE, EXTERIER],
    parkovaci_stani: true,
    sklepni_koje: true,
    poradi: 2,
  },
  {
    slug: "1kk-49",
    oznaceni: "A3",
    dispozice: "1+kk",
    podlazi: "II. NP",
    plocha_m2: 49,
    balkon_terasa: "balkón 5 m²",
    vyhled: "okolní příroda",
    cena_kc: 5290000,
    stav: "Volný",
    popis: `Exkluzivně Vám nabízíme atraktivní prosvětlený apartmán ve II. NP. Dispozice jednotky je 1+kk, o celkové rozloze 49 m². Součástí apartmánu je slunný balkón o výměře 5 m², který nabízí příjemné venkovní posezení s výhledem přímo do okolní přírody. Samozřejmostí je vlastní parkovací stání, sklepní kóje a podíl na společných prostorách nemovitosti.`,
    pudorys: "/foto/pudorysy/1kk-49m2.jpg",
    fotky: [INT_KUCHYNE, EXTERIER],
    parkovaci_stani: true,
    sklepni_koje: true,
    poradi: 3,
  },
  {
    slug: "1kk-48",
    oznaceni: "A4",
    dispozice: "1+kk",
    podlazi: "II. NP",
    plocha_m2: 48,
    balkon_terasa: "balkón 5 m²",
    vyhled: "sjezdovka Marta a vrcholky Orlického národního parku",
    cena_kc: 4990000,
    stav: "Volný",
    popis: `Nabízíme Vám atraktivní prosvětlený apartmán ve II. NP. Dispozice jednotky je 1+kk, o celkové rozloze 48 m². Součástí apartmánu je slunný balkón o výměře 5 m², který nabízí příjemné venkovní posezení s krásnými výhledy přímo na sjezdovku Marta a na vrcholky Orlického národního parku. Samozřejmostí je vlastní parkovací stání, sklepní kóje a podíl na společných prostorách nemovitosti.`,
    pudorys: "/foto/pudorysy/1kk-48m2.jpg",
    fotky: [INT_KUCHYNE, EXTERIER],
    parkovaci_stani: true,
    sklepni_koje: true,
    poradi: 4,
  },
  {
    slug: "1-1-57",
    oznaceni: "A5",
    dispozice: "1+1",
    podlazi: "I. NP",
    plocha_m2: 57,
    balkon_terasa: "balkón 3 m²",
    vyhled: "okolní krajina",
    cena_kc: 4990000,
    stav: "Volný",
    popis: `Nabízíme Vám atraktivní apartmán v I. NP. Dispozice jednotky je 1+1, o celkové rozloze 57 m². Součástí apartmánu je slunný balkón o výměře 3 m², který nabízí příjemné výhledy do okolní krajiny. Samozřejmostí je vlastní parkovací stání, sklepní kóje a podíl na společných prostorách nemovitosti.`,
    pudorys: "/foto/pudorysy/1plus1-57m2.jpg",
    fotky: [INT_OBYVAK, INT_LOZNICE, EXTERIER],
    parkovaci_stani: true,
    sklepni_koje: true,
    poradi: 5,
  },
  {
    slug: "2kk-84",
    oznaceni: "A6",
    dispozice: "2+kk",
    podlazi: "I. NP",
    plocha_m2: 84,
    balkon_terasa: "terasa 30 m²",
    vyhled: "vrcholky Orlického národního parku",
    cena_kc: 7490000,
    stav: "Volný",
    popis: `Hledáte apartmán s velkorysou terasou? Nabízíme Vám luxusní apartmán v I. NP, jehož součástí je terasa o výměře 30 m², která nabízí rozšíření obytného prostoru a příjemné venkovní posezení s výhledem přímo na vrcholky Orlického národního parku. Dispozice jednotky je 2+kk, o celkové rozloze 84 m². Samozřejmostí je vlastní parkovací stání, sklepní kóje a podíl na společných prostorách nemovitosti.`,
    pudorys: "/foto/pudorysy/2kk-84m2.jpg",
    fotky: [INT_OBYVAK, INT_LOZNICE, EXTERIER],
    parkovaci_stani: true,
    sklepni_koje: true,
    poradi: 6,
  },
];

export function getApartments(): Apartman[] {
  return [...apartments].sort((a, b) => a.poradi - b.poradi);
}

export function getApartment(slug: string): Apartman | undefined {
  return apartments.find((a) => a.slug === slug);
}
