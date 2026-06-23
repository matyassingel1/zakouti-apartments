// Oficiální nabídka apartmánů — zdroj: „WEBOVINY – přehled apartmánů" (23. 6. 2026).
// Web čte výhradně odsud. Žádná čísla ani tvrzení natvrdo v komponentách.
// Popisy jsou generované striktně z oficiálních dat (žádné smyšlené výhledy ani lokality).

export type Dispozice = "Garsoniéra" | "1+1" | "2+kk" | "2+1" | "Mezonet";
export type Podlazi = "I. PP" | "I. NP" | "II. NP" | "III. NP";
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
  /** Užitná plocha (m²). */
  uzitna_m2: number;
  /** Celková plocha vč. sklepa a venkovních ploch (m²). */
  celkova_m2: number;
  /** Balkon / terasa / předzahrádka (m²); 0 = bez venkovní plochy. */
  venkovni_m2: number;
  /** Zděný sklep (m²). */
  sklep_m2: number;
  cena_kc: number;
  stav: Stav;
  popis: string;
  /** 3D půdorysy jednotky (2 pohledy); prázdné = připravujeme. */
  pudorysy: string[];
  /** Ilustrativní vizualizace — společné pro všechny jednotky. */
  fotky: ApartmanFoto[];
  parkovaci_stani: boolean;
  poradi: number;
}

// Společné ilustrativní vizualizace (dle zadání makléřky jsou pro všechny apartmány stejné).
const INT_OBYVAK: ApartmanFoto = {
  src: "/foto/interiery/obyvaci-pokoj.webp",
  alt: "Ilustrativní vizualizace obývacího pokoje s jídelnou — rohová sedačka, kulatý stůl a výhled do přírody.",
  popis: "Obývací pokoj s jídelnou — ilustrativní vizualizace",
};
const INT_KUCHYNE: ApartmanFoto = {
  src: "/foto/interiery/kuchyne-studio.webp",
  alt: "Ilustrativní vizualizace kuchyňského koutu — dubová linka, jídelní kout a posezení.",
  popis: "Kuchyňský kout — ilustrativní vizualizace",
};
const INT_LOZNICE: ApartmanFoto = {
  src: "/foto/interiery/loznice.webp",
  alt: "Ilustrativní vizualizace ložnice — čalouněná postel, šatní skříň a horský motiv.",
  popis: "Ložnice — ilustrativní vizualizace",
};
const VIZUALIZACE = [INT_OBYVAK, INT_KUCHYNE, INT_LOZNICE];

// Půdorysy dodané makléřkou (přes úschovnu) — k dispozici jen pro I. NP a II. NP.
const SE_PUDORYSEM = new Set([
  "a11", "b12", "c13", "d14",
  "a21", "b22", "c23", "d24", "e25", "f26",
]);

const PODLAZI_FRAZE: Record<Podlazi, string> = {
  "I. PP": "v prvním podzemním podlaží (suterénu)",
  "I. NP": "v prvním nadzemním podlaží",
  "II. NP": "ve druhém nadzemním podlaží",
  "III. NP": "ve třetím nadzemním podlaží",
};

function dispFraze(d: Dispozice): string {
  if (d === "Garsoniéra") return "garsoniéra";
  if (d === "Mezonet") return "mezonet (dvoupodlažní uspořádání)";
  return d;
}

interface Spec {
  o: string; // označení
  d: Dispozice;
  p: Podlazi;
  ven: number; // venkovní plocha m²
  uzit: number; // užitná m²
  celk: number; // celková m²
  cena: number;
}

// Pořadí dle oficiálního přehledu (I. PP → I. NP → II. NP → III. NP).
const SPECS: Spec[] = [
  { o: "A01", d: "2+1", p: "I. PP", ven: 50, uzit: 74, celk: 129, cena: 6990000 },
  { o: "B02", d: "1+1", p: "I. PP", ven: 40, uzit: 46, celk: 91, cena: 4990000 },
  { o: "C03", d: "2+1", p: "I. PP", ven: 50, uzit: 64, celk: 119, cena: 5990000 },
  { o: "A11", d: "2+kk", p: "I. NP", ven: 25, uzit: 67, celk: 97, cena: 7990000 },
  { o: "B12", d: "2+kk", p: "I. NP", ven: 25, uzit: 42, celk: 72, cena: 6990000 },
  { o: "C13", d: "2+kk", p: "I. NP", ven: 25, uzit: 51, celk: 81, cena: 7490000 },
  { o: "D14", d: "2+kk", p: "I. NP", ven: 5, uzit: 51, celk: 61, cena: 4990000 },
  { o: "A21", d: "2+kk", p: "II. NP", ven: 5, uzit: 48, celk: 58, cena: 5250000 },
  { o: "B22", d: "Garsoniéra", p: "II. NP", ven: 5, uzit: 40, celk: 50, cena: 4990000 },
  { o: "C23", d: "Garsoniéra", p: "II. NP", ven: 5, uzit: 25, celk: 35, cena: 3490000 },
  { o: "D24", d: "Garsoniéra", p: "II. NP", ven: 5, uzit: 27, celk: 37, cena: 3990000 },
  { o: "E25", d: "Garsoniéra", p: "II. NP", ven: 5, uzit: 41, celk: 51, cena: 5250000 },
  { o: "F26", d: "2+kk", p: "II. NP", ven: 5, uzit: 51, celk: 61, cena: 4990000 },
  { o: "A31", d: "Mezonet", p: "III. NP", ven: 0, uzit: 87, celk: 92, cena: 8990000 },
  { o: "B32", d: "Mezonet", p: "III. NP", ven: 0, uzit: 51, celk: 56, cena: 5990000 },
  { o: "C33", d: "Mezonet", p: "III. NP", ven: 0, uzit: 47, celk: 52, cena: 5290000 },
  { o: "D34", d: "Mezonet", p: "III. NP", ven: 0, uzit: 48, celk: 53, cena: 5790000 },
  { o: "E35", d: "Mezonet", p: "III. NP", ven: 0, uzit: 50, celk: 55, cena: 5990000 },
  { o: "F36", d: "Mezonet", p: "III. NP", ven: 0, uzit: 90, celk: 95, cena: 8990000 },
];

function buildPopis(s: Spec): string {
  const venVeta =
    s.ven > 0 ? ` K bytu náleží venkovní plocha (balkon / terasa / předzahrádka) o výměře ${s.ven} m².` : "";
  return (
    `Apartmán ${s.o} se nachází ${PODLAZI_FRAZE[s.p]} bytového domu Zákoutí ` +
    `v Deštném v Orlických horách. Dispozice jednotky je ${dispFraze(s.d)}, ` +
    `užitná plocha ${s.uzit} m², celková plocha včetně sklepa a venkovních ploch ${s.celk} m².` +
    venVeta +
    ` Ke každé jednotce náleží zděný sklep o výměře 5 m², vlastní parkovací stání ` +
    `a podíl na společných prostorách nemovitosti. Uvedená cena je konečná a bez DPH.`
  );
}

function buildApartman(s: Spec, i: number): Apartman {
  const slug = s.o.toLowerCase();
  const pudorysy = SE_PUDORYSEM.has(slug)
    ? [`/foto/pudorysy/${slug}-1.jpg`, `/foto/pudorysy/${slug}-2.jpg`]
    : [];
  return {
    slug,
    oznaceni: s.o,
    dispozice: s.d,
    podlazi: s.p,
    uzitna_m2: s.uzit,
    celkova_m2: s.celk,
    venkovni_m2: s.ven,
    sklep_m2: 5,
    cena_kc: s.cena,
    stav: "Volný",
    popis: buildPopis(s),
    pudorysy,
    fotky: VIZUALIZACE,
    parkovaci_stani: true,
    poradi: i + 1,
  };
}

export const apartments: Apartman[] = SPECS.map(buildApartman);

export function getApartments(): Apartman[] {
  return [...apartments].sort((a, b) => a.poradi - b.poradi);
}

export function getApartment(slug: string): Apartman | undefined {
  return apartments.find((a) => a.slug === slug);
}
