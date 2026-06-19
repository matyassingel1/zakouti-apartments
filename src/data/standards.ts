// Standardy provedení — sekce 10 zadání.
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  PaintRoller,
  DoorOpen,
  Bath,
  Flame,
  Trees,
} from "lucide-react";

export interface StandardKategorie {
  id: string;
  nazev: string;
  ikona: LucideIcon;
  polozky: string[];
}

export const standardy: StandardKategorie[] = [
  {
    id: "konstrukce",
    nazev: "Konstrukce budovy",
    ikona: Building2,
    polozky: [
      "Obvodové zdivo: pálené cihly, zateplení pěnovým polystyrenem EPS 70 F.",
      "Vnitřní nosné a mezibytové zdivo: cihla Porotherm, Heluz nebo Ytong / původní betonový skelet.",
      "Vodorovné konstrukce: železobetonové / keramické stropy min. 220 mm, světlá výška min. cca 250 cm.",
      "Střecha: nová prvotřídní ocelová střecha značky Ruukki v barvě antracitu, nové krovy.",
      "Vnější omítka: světlý přírodní odstín charakteristický pro lokalitu.",
    ],
  },
  {
    id: "povrchy",
    nazev: "Povrchová úprava bytů",
    ikona: PaintRoller,
    polozky: [
      "Stěny: štuková malba bílá, keramické obklady koupelen do výšky 2,0 m (Rako / Jika), WC do 1,5 m (Geberit).",
      "Stropy: štuková malba bílá.",
      "Podlahy: plovoucí podlaha (vinylové šablony) s důrazem na útlum kročejového hluku; keramická dlažba v zádveří, koupelně a na WC (vyšší standard Rako / Siko / Jika).",
    ],
  },
  {
    id: "vyplne",
    nazev: "Výplně otvorů",
    ikona: DoorOpen,
    polozky: [
      "Okna a balkonové dveře: bílá plastová okna s vnitřní stranou v dekoru dřeva, izolační trojskla.",
      "Vstupní dveře do bytu: bezpečnostní protipožární dveře, šířka min. 800 mm, vložkový zámek.",
      "Interiérové dveře: hladké, plné nebo prosklené dle požadavku kupujícího, obložková zárubeň.",
    ],
  },
  {
    id: "vybaveni",
    nazev: "Vnitřní vybavení",
    ikona: Bath,
    polozky: [
      "Koupelna: sprchová vanička, rohový sprchový kout, keramické umyvadlo, příprava pro pračku, žebříkové topné těleso na ručníky, závěsné WC (Geberit).",
      "Kuchyňská linka: do délky max. 4 m, příprava pro spotřebiče (digestoř, varná deska, dřez), obklad za linkou.",
      "Vodoměry s přípravou pro dálkový odečet.",
    ],
  },
  {
    id: "vytapeni",
    nazev: "Vytápění a instalace",
    ikona: Flame,
    polozky: [
      "Individuální elektrické topení a ohřev teplé vody vlastním elektrickým kotlem pro každou jednotku.",
      "Stěnové radiátory v místnostech, topný žebřík v každé koupelně.",
      "Slaboproud: společná TV anténa, zvonek, domovní telefon, přípojka internetu do každého bytu, příprava pro zabezpečení.",
    ],
  },
  {
    id: "spolecne",
    nazev: "Příslušenství a společné prostory",
    ikona: Trees,
    polozky: [
      "Balkóny: monolitické izolované balkóny s kovovým zábradlím a dřevěným madlem.",
      "Předzahrádky u přízemních bytů (živý zelený plot).",
      "Parkovací stání: 1 stání na pozemku (prorůstající zámková dlažba).",
      "Sklepní kóje pro každý byt.",
      "Společné chodby: poštovní schránky, kombinace koberce a dlažby.",
    ],
  },
];

// Shrnutí pro detail apartmánu (5 bodů, sekce 7.5).
export const standardyShrnuti = [
  "Elektrické topení a ohřev vody vlastním kotlem pro každou jednotku",
  "Bezpečnostní protipožární vstupní dveře",
  "Izolační trojskla v oknech i balkonových dveřích",
  "Vinylové podlahy s útlumem hluku + keramická dlažba",
  "Žebříkový topný radiátor v koupelně",
];
