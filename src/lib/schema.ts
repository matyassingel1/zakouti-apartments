import { getDb } from "./db";
import { apartments as seedApartments } from "@/data/apartments";
import { galerie as seedGalerie } from "@/data/gallery";
import { site } from "@/data/site";

let ready: Promise<void> | null = null;

/** Vytvoří tabulky (pokud chybí) a naplní je seed daty (pokud jsou prázdné). Idempotentní. */
export function ensureReady(): Promise<void> {
  // Při selhání NEcachovat zamítnutou promisu — jinak by „otrávila" celou instanci.
  if (!ready) ready = init().catch((e) => { ready = null; throw e; });
  return ready;
}

async function init(): Promise<void> {
  const sql = getDb();

  // Neon HTTP driver spouští jeden příkaz na volání — DDL po jednom.
  await sql`CREATE TABLE IF NOT EXISTS apartman (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    oznaceni TEXT NOT NULL,
    dispozice TEXT NOT NULL,
    podlazi TEXT NOT NULL,
    uzitna_m2 INTEGER NOT NULL,
    celkova_m2 INTEGER NOT NULL,
    venkovni_m2 INTEGER NOT NULL DEFAULT 0,
    sklep_m2 INTEGER NOT NULL DEFAULT 0,
    cena_kc INTEGER NOT NULL,
    stav TEXT NOT NULL DEFAULT 'Volný',
    popis TEXT NOT NULL,
    pudorysy TEXT NOT NULL DEFAULT '[]',
    fotky TEXT NOT NULL DEFAULT '[]',
    parkovaci_stani BOOLEAN NOT NULL DEFAULT TRUE,
    poradi INTEGER NOT NULL DEFAULT 0
  )`;

  await sql`CREATE TABLE IF NOT EXISTS poptavka (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    jmeno TEXT NOT NULL,
    email TEXT NOT NULL,
    telefon TEXT NOT NULL,
    zprava TEXT,
    apartman_slug TEXT,
    apartman_label TEXT,
    gdpr BOOLEAN NOT NULL DEFAULT TRUE,
    datum TEXT NOT NULL,
    stav TEXT NOT NULL DEFAULT 'Nová'
  )`;

  await sql`CREATE TABLE IF NOT EXISTS media (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    src TEXT NOT NULL,
    alt TEXT NOT NULL DEFAULT '',
    kategorie TEXT NOT NULL,
    sirsi BOOLEAN NOT NULL DEFAULT FALSE,
    poradi INTEGER NOT NULL DEFAULT 0
  )`;
  // Unikátní src kvůli idempotentnímu seedu (a aby nešlo přidat tutéž fotku 2×).
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS media_src_uniq ON media (src)`;

  await sql`CREATE TABLE IF NOT EXISTS nastaveni (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    telefon TEXT,
    email TEXT,
    email_druhy TEXT,
    standardy_pdf TEXT
  )`;

  const aptCount = await sql`SELECT COUNT(*)::int AS n FROM apartman`;
  if (Number(aptCount[0].n) === 0) {
    for (const a of seedApartments) {
      await sql`INSERT INTO apartman
        (slug, oznaceni, dispozice, podlazi, uzitna_m2, celkova_m2, venkovni_m2, sklep_m2, cena_kc, stav, popis, pudorysy, fotky, parkovaci_stani, poradi)
        VALUES (${a.slug}, ${a.oznaceni}, ${a.dispozice}, ${a.podlazi}, ${a.uzitna_m2}, ${a.celkova_m2},
          ${a.venkovni_m2}, ${a.sklep_m2}, ${a.cena_kc}, ${a.stav}, ${a.popis},
          ${JSON.stringify(a.pudorysy)}, ${JSON.stringify(a.fotky)}, ${a.parkovaci_stani}, ${a.poradi})
        ON CONFLICT (slug) DO NOTHING`;
    }
  }

  const mediaCount = await sql`SELECT COUNT(*)::int AS n FROM media`;
  if (Number(mediaCount[0].n) === 0) {
    let i = 0;
    for (const g of seedGalerie) {
      await sql`INSERT INTO media (src, alt, kategorie, sirsi, poradi)
        VALUES (${g.src}, ${g.alt}, ${g.kategorie}, ${g.sirsi ?? false}, ${i++})
        ON CONFLICT (src) DO NOTHING`;
    }
  }

  const nast = await sql`SELECT COUNT(*)::int AS n FROM nastaveni WHERE id = 1`;
  if (Number(nast[0].n) === 0) {
    await sql`INSERT INTO nastaveni (id, telefon, email, email_druhy, standardy_pdf)
      VALUES (1, ${site.makler.telefon}, ${site.makler.email}, ${site.makler.emailDruhy}, ${null})
      ON CONFLICT (id) DO NOTHING`;
  }
}
