import "server-only";
import type { Row } from "@libsql/client";
import { db } from "./db";
import { ensureReady } from "./schema";
import type { Apartman, ApartmanFoto, Stav } from "@/data/apartments";
import type { GalerieItem, GalerieKategorie } from "@/data/gallery";
import { site } from "@/data/site";

function mapApartman(r: Row): Apartman {
  let fotky: ApartmanFoto[] = [];
  try {
    fotky = JSON.parse(String(r.fotky ?? "[]"));
  } catch {
    fotky = [];
  }
  return {
    slug: String(r.slug),
    oznaceni: String(r.oznaceni),
    dispozice: r.dispozice as Apartman["dispozice"],
    podlazi: r.podlazi as Apartman["podlazi"],
    plocha_m2: Number(r.plocha_m2),
    balkon_terasa: String(r.balkon_terasa),
    vyhled: String(r.vyhled),
    cena_kc: Number(r.cena_kc),
    stav: r.stav as Stav,
    popis: String(r.popis),
    pudorys: String(r.pudorys),
    fotky,
    parkovaci_stani: Number(r.parkovaci_stani) === 1,
    sklepni_koje: Number(r.sklepni_koje) === 1,
    poradi: Number(r.poradi),
  };
}

/* ---------------- Veřejné ---------------- */

export async function getApartments(): Promise<Apartman[]> {
  await ensureReady();
  const res = await db().execute("SELECT * FROM apartman ORDER BY poradi ASC");
  return res.rows.map(mapApartman);
}

export async function getApartment(slug: string): Promise<Apartman | null> {
  await ensureReady();
  const res = await db().execute({
    sql: "SELECT * FROM apartman WHERE slug = ? LIMIT 1",
    args: [slug],
  });
  return res.rows[0] ? mapApartman(res.rows[0]) : null;
}

export interface Settings {
  telefon: string;
  email: string;
  email_druhy: string;
  standardy_pdf: string | null;
}

export async function getSettings(): Promise<Settings> {
  await ensureReady();
  const res = await db().execute("SELECT * FROM nastaveni WHERE id = 1");
  const r = res.rows[0];
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
  const res = await db().execute("SELECT * FROM media ORDER BY poradi ASC, id ASC");
  return res.rows.map((r) => ({
    src: String(r.src),
    alt: String(r.alt),
    kategorie: r.kategorie as GalerieKategorie,
    sirsi: Number(r.sirsi) === 1,
  }));
}

/* ---------------- Admin: apartmány ---------------- */

export interface ApartmanRecord extends Apartman {
  id: number;
}

export async function listApartments(): Promise<ApartmanRecord[]> {
  await ensureReady();
  const res = await db().execute("SELECT * FROM apartman ORDER BY poradi ASC");
  return res.rows.map((r) => ({ id: Number(r.id), ...mapApartman(r) }));
}

export async function getApartmentById(id: number): Promise<ApartmanRecord | null> {
  await ensureReady();
  const res = await db().execute({ sql: "SELECT * FROM apartman WHERE id = ?", args: [id] });
  return res.rows[0] ? { id: Number(res.rows[0].id), ...mapApartman(res.rows[0]) } : null;
}

export interface ApartmanInput extends Omit<Apartman, "fotky"> {
  fotky: ApartmanFoto[];
}

export async function createApartman(a: ApartmanInput): Promise<void> {
  await ensureReady();
  await db().execute({
    sql: `INSERT INTO apartman
      (slug, oznaceni, dispozice, podlazi, plocha_m2, balkon_terasa, vyhled, cena_kc, stav, popis, pudorys, fotky, parkovaci_stani, sklepni_koje, poradi)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      a.slug, a.oznaceni, a.dispozice, a.podlazi, a.plocha_m2, a.balkon_terasa, a.vyhled,
      a.cena_kc, a.stav, a.popis, a.pudorys, JSON.stringify(a.fotky),
      a.parkovaci_stani ? 1 : 0, a.sklepni_koje ? 1 : 0, a.poradi,
    ],
  });
}

export async function updateApartman(id: number, a: ApartmanInput): Promise<void> {
  await ensureReady();
  await db().execute({
    sql: `UPDATE apartman SET
      slug=?, oznaceni=?, dispozice=?, podlazi=?, plocha_m2=?, balkon_terasa=?, vyhled=?,
      cena_kc=?, stav=?, popis=?, pudorys=?, fotky=?, parkovaci_stani=?, sklepni_koje=?, poradi=?
      WHERE id=?`,
    args: [
      a.slug, a.oznaceni, a.dispozice, a.podlazi, a.plocha_m2, a.balkon_terasa, a.vyhled,
      a.cena_kc, a.stav, a.popis, a.pudorys, JSON.stringify(a.fotky),
      a.parkovaci_stani ? 1 : 0, a.sklepni_koje ? 1 : 0, a.poradi, id,
    ],
  });
}

export async function deleteApartman(id: number): Promise<void> {
  await ensureReady();
  await db().execute({ sql: "DELETE FROM apartman WHERE id = ?", args: [id] });
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
  await db().execute({
    sql: `INSERT INTO poptavka (jmeno, email, telefon, zprava, apartman_slug, apartman_label, gdpr, datum, stav)
          VALUES (?,?,?,?,?,?,1,?, 'Nová')`,
    args: [
      d.jmeno, d.email, d.telefon, d.zprava ?? null,
      d.apartman_slug ?? null, d.apartman_label ?? null, new Date().toISOString(),
    ],
  });
}

export async function listInquiries(): Promise<PoptavkaRecord[]> {
  await ensureReady();
  const res = await db().execute("SELECT * FROM poptavka ORDER BY datum DESC");
  return res.rows.map((r) => ({
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
  await db().execute({ sql: "UPDATE poptavka SET stav = ? WHERE id = ?", args: [stav, id] });
}

export async function deleteInquiry(id: number): Promise<void> {
  await ensureReady();
  await db().execute({ sql: "DELETE FROM poptavka WHERE id = ?", args: [id] });
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
  const res = await db().execute("SELECT * FROM media ORDER BY poradi ASC, id ASC");
  return res.rows.map((r) => ({
    id: Number(r.id),
    src: String(r.src),
    alt: String(r.alt),
    kategorie: r.kategorie as GalerieKategorie,
    sirsi: Number(r.sirsi) === 1,
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
  await db().execute({
    sql: "INSERT INTO media (src, alt, kategorie, sirsi, poradi) VALUES (?,?,?,?,?)",
    args: [d.src, d.alt, d.kategorie, d.sirsi ? 1 : 0, d.poradi],
  });
}

export async function deleteMedia(id: number): Promise<void> {
  await ensureReady();
  await db().execute({ sql: "DELETE FROM media WHERE id = ?", args: [id] });
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
    await db().execute({
      sql: "UPDATE nastaveni SET telefon=?, email=?, email_druhy=? WHERE id=1",
      args: [d.telefon, d.email, d.email_druhy],
    });
  } else {
    await db().execute({
      sql: "UPDATE nastaveni SET telefon=?, email=?, email_druhy=?, standardy_pdf=? WHERE id=1",
      args: [d.telefon, d.email, d.email_druhy, d.standardy_pdf],
    });
  }
}

/* ---------------- Dashboard ---------------- */

export async function dashboardStats() {
  await ensureReady();
  const c = db();
  const [apt, volne, nove] = await Promise.all([
    c.execute("SELECT COUNT(*) AS n FROM apartman"),
    c.execute("SELECT COUNT(*) AS n FROM apartman WHERE stav = 'Volný'"),
    c.execute("SELECT COUNT(*) AS n FROM poptavka WHERE stav = 'Nová'"),
  ]);
  return {
    apartmany: Number(apt.rows[0].n),
    volne: Number(volne.rows[0].n),
    novePoptavky: Number(nove.rows[0].n),
  };
}
