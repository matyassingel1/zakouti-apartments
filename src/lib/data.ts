import "server-only";
import { getDb } from "./db";
import { ensureReady } from "./schema";
import type { Apartman, ApartmanFoto, Stav } from "@/data/apartments";
import type { GalerieItem, GalerieKategorie } from "@/data/gallery";
import { site } from "@/data/site";

type Row = Record<string, unknown>;

function parseJson<T>(v: unknown, fallback: T): T {
  try {
    return JSON.parse(String(v ?? "")) as T;
  } catch {
    return fallback;
  }
}

function mapApartman(r: Row): Apartman {
  return {
    slug: String(r.slug),
    oznaceni: String(r.oznaceni),
    dispozice: r.dispozice as Apartman["dispozice"],
    podlazi: r.podlazi as Apartman["podlazi"],
    uzitna_m2: Number(r.uzitna_m2),
    celkova_m2: Number(r.celkova_m2),
    venkovni_m2: Number(r.venkovni_m2),
    sklep_m2: Number(r.sklep_m2),
    cena_kc: Number(r.cena_kc),
    stav: r.stav as Stav,
    popis: String(r.popis),
    pudorysy: parseJson<string[]>(r.pudorysy, []),
    fotky: parseJson<ApartmanFoto[]>(r.fotky, []),
    parkovaci_stani: Boolean(r.parkovaci_stani),
    poradi: Number(r.poradi),
  };
}

/* ---------------- Veřejné ---------------- */

export async function getApartments(): Promise<Apartman[]> {
  await ensureReady();
  const rows = await getDb()`SELECT * FROM apartman ORDER BY poradi ASC`;
  return rows.map(mapApartman);
}

export async function getApartment(slug: string): Promise<Apartman | null> {
  await ensureReady();
  const rows = await getDb()`SELECT * FROM apartman WHERE slug = ${slug} LIMIT 1`;
  return rows[0] ? mapApartman(rows[0]) : null;
}

export interface Settings {
  telefon: string;
  email: string;
  email_druhy: string;
  standardy_pdf: string | null;
}

export async function getSettings(): Promise<Settings> {
  await ensureReady();
  const rows = await getDb()`SELECT * FROM nastaveni WHERE id = 1`;
  const r = rows[0];
  if (!r) {
    return {
      telefon: site.makler.telefon,
      email: site.makler.email,
      email_druhy: site.makler.emailDruhy,
      standardy_pdf: null,
    };
  }
  return {
    telefon: String(r.telefon ?? site.makler.telefon),
    email: String(r.email ?? site.makler.email),
    email_druhy: String(r.email_druhy ?? site.makler.emailDruhy),
    standardy_pdf: r.standardy_pdf ? String(r.standardy_pdf) : null,
  };
}

export async function getGallery(): Promise<GalerieItem[]> {
  await ensureReady();
  const rows = await getDb()`SELECT * FROM media ORDER BY poradi ASC, id ASC`;
  return rows.map((r) => ({
    src: String(r.src),
    alt: String(r.alt),
    kategorie: r.kategorie as GalerieKategorie,
    sirsi: Boolean(r.sirsi),
  }));
}

/* ---------------- Admin: apartmány ---------------- */

export interface ApartmanRecord extends Apartman {
  id: number;
}

export type ApartmanInput = Apartman;

export async function listApartments(): Promise<ApartmanRecord[]> {
  await ensureReady();
  const rows = await getDb()`SELECT * FROM apartman ORDER BY poradi ASC`;
  return rows.map((r) => ({ id: Number(r.id), ...mapApartman(r) }));
}

export async function getApartmentById(id: number): Promise<ApartmanRecord | null> {
  await ensureReady();
  const rows = await getDb()`SELECT * FROM apartman WHERE id = ${id}`;
  return rows[0] ? { id: Number(rows[0].id), ...mapApartman(rows[0]) } : null;
}

export async function createApartman(a: ApartmanInput): Promise<void> {
  await ensureReady();
  await getDb()`INSERT INTO apartman
    (slug, oznaceni, dispozice, podlazi, uzitna_m2, celkova_m2, venkovni_m2, sklep_m2, cena_kc, stav, popis, pudorysy, fotky, parkovaci_stani, poradi)
    VALUES (${a.slug}, ${a.oznaceni}, ${a.dispozice}, ${a.podlazi}, ${a.uzitna_m2}, ${a.celkova_m2},
      ${a.venkovni_m2}, ${a.sklep_m2}, ${a.cena_kc}, ${a.stav}, ${a.popis},
      ${JSON.stringify(a.pudorysy)}, ${JSON.stringify(a.fotky)}, ${a.parkovaci_stani}, ${a.poradi})`;
}

export async function updateApartman(id: number, a: ApartmanInput): Promise<void> {
  await ensureReady();
  await getDb()`UPDATE apartman SET
    slug=${a.slug}, oznaceni=${a.oznaceni}, dispozice=${a.dispozice}, podlazi=${a.podlazi},
    uzitna_m2=${a.uzitna_m2}, celkova_m2=${a.celkova_m2}, venkovni_m2=${a.venkovni_m2}, sklep_m2=${a.sklep_m2},
    cena_kc=${a.cena_kc}, stav=${a.stav}, popis=${a.popis},
    pudorysy=${JSON.stringify(a.pudorysy)}, fotky=${JSON.stringify(a.fotky)},
    parkovaci_stani=${a.parkovaci_stani}, poradi=${a.poradi}
    WHERE id=${id}`;
}

export async function deleteApartman(id: number): Promise<void> {
  await ensureReady();
  await getDb()`DELETE FROM apartman WHERE id = ${id}`;
}

/* ---------------- Admin: poptávky ---------------- */

export interface PoptavkaRecord {
  id: number;
  jmeno: string;
  email: string;
  telefon: string;
  zprava: string | null;
  apartman_slug: string | null;
  apartman_label: string | null;
  datum: string;
  stav: "Nová" | "Vyřízená";
}

export async function createInquiry(d: {
  jmeno: string;
  email: string;
  telefon: string;
  zprava?: string;
  apartman_slug?: string;
  apartman_label?: string;
}): Promise<void> {
  await ensureReady();
  await getDb()`INSERT INTO poptavka (jmeno, email, telefon, zprava, apartman_slug, apartman_label, gdpr, datum, stav)
    VALUES (${d.jmeno}, ${d.email}, ${d.telefon}, ${d.zprava ?? null},
      ${d.apartman_slug ?? null}, ${d.apartman_label ?? null}, TRUE, ${new Date().toISOString()}, 'Nová')`;
}

export async function listInquiries(): Promise<PoptavkaRecord[]> {
  await ensureReady();
  const rows = await getDb()`SELECT * FROM poptavka ORDER BY datum DESC`;
  return rows.map((r) => ({
    id: Number(r.id),
    jmeno: String(r.jmeno),
    email: String(r.email),
    telefon: String(r.telefon),
    zprava: r.zprava ? String(r.zprava) : null,
    apartman_slug: r.apartman_slug ? String(r.apartman_slug) : null,
    apartman_label: r.apartman_label ? String(r.apartman_label) : null,
    datum: String(r.datum),
    stav: r.stav as "Nová" | "Vyřízená",
  }));
}

export async function setInquiryStav(id: number, stav: "Nová" | "Vyřízená"): Promise<void> {
  await ensureReady();
  await getDb()`UPDATE poptavka SET stav = ${stav} WHERE id = ${id}`;
}

export async function deleteInquiry(id: number): Promise<void> {
  await ensureReady();
  await getDb()`DELETE FROM poptavka WHERE id = ${id}`;
}

/* ---------------- Admin: galerie ---------------- */

export interface MediaRecord {
  id: number;
  src: string;
  alt: string;
  kategorie: GalerieKategorie;
  sirsi: boolean;
  poradi: number;
}

export async function listMedia(): Promise<MediaRecord[]> {
  await ensureReady();
  const rows = await getDb()`SELECT * FROM media ORDER BY poradi ASC, id ASC`;
  return rows.map((r) => ({
    id: Number(r.id),
    src: String(r.src),
    alt: String(r.alt),
    kategorie: r.kategorie as GalerieKategorie,
    sirsi: Boolean(r.sirsi),
    poradi: Number(r.poradi),
  }));
}

export async function createMedia(d: {
  src: string;
  alt: string;
  kategorie: GalerieKategorie;
  sirsi: boolean;
  poradi: number;
}): Promise<void> {
  await ensureReady();
  await getDb()`INSERT INTO media (src, alt, kategorie, sirsi, poradi)
    VALUES (${d.src}, ${d.alt}, ${d.kategorie}, ${d.sirsi}, ${d.poradi})`;
}

export async function deleteMedia(id: number): Promise<void> {
  await ensureReady();
  await getDb()`DELETE FROM media WHERE id = ${id}`;
}

/* ---------------- Admin: nastavení ---------------- */

export async function updateSettings(d: {
  telefon: string;
  email: string;
  email_druhy: string;
  standardy_pdf?: string | null;
}): Promise<void> {
  await ensureReady();
  if (d.standardy_pdf === undefined) {
    await getDb()`UPDATE nastaveni SET telefon=${d.telefon}, email=${d.email}, email_druhy=${d.email_druhy} WHERE id=1`;
  } else {
    await getDb()`UPDATE nastaveni SET telefon=${d.telefon}, email=${d.email}, email_druhy=${d.email_druhy}, standardy_pdf=${d.standardy_pdf} WHERE id=1`;
  }
}

/* ---------------- Dashboard ---------------- */

export async function dashboardStats() {
  await ensureReady();
  const sql = getDb();
  const [apt, volne, nove] = await Promise.all([
    sql`SELECT COUNT(*)::int AS n FROM apartman`,
    sql`SELECT COUNT(*)::int AS n FROM apartman WHERE stav = 'Volný'`,
    sql`SELECT COUNT(*)::int AS n FROM poptavka WHERE stav = 'Nová'`,
  ]);
  return {
    apartmany: Number(apt[0].n),
    volne: Number(volne[0].n),
    novePoptavky: Number(nove[0].n),
  };
}
