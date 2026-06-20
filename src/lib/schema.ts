import { db } from "./db";
import { apartments as seedApartments } from "@/data/apartments";
import { galerie as seedGalerie } from "@/data/gallery";
import { site } from "@/data/site";

let ready: Promise<void> | null = null;

/** Vytvoří tabulky (pokud chybí) a naplní je seed daty (pokud jsou prázdné). Idempotentní. */
export function ensureReady(): Promise<void> {
  if (!ready) ready = init();
  return ready;
}

async function init(): Promise<void> {
  const c = db();

  await c.batch(
    [
      `CREATE TABLE IF NOT EXISTS apartman (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        oznaceni TEXT NOT NULL,
        dispozice TEXT NOT NULL,
        podlazi TEXT NOT NULL,
        plocha_m2 INTEGER NOT NULL,
        balkon_terasa TEXT NOT NULL,
        vyhled TEXT NOT NULL,
        cena_kc INTEGER NOT NULL,
        stav TEXT NOT NULL DEFAULT 'Volný',
        popis TEXT NOT NULL,
        pudorys TEXT NOT NULL,
        fotky TEXT NOT NULL DEFAULT '[]',
        parkovaci_stani INTEGER NOT NULL DEFAULT 1,
        sklepni_koje INTEGER NOT NULL DEFAULT 1,
        poradi INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS poptavka (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        jmeno TEXT NOT NULL,
        email TEXT NOT NULL,
        telefon TEXT NOT NULL,
        zprava TEXT,
        apartman_slug TEXT,
        apartman_label TEXT,
        gdpr INTEGER NOT NULL DEFAULT 1,
        datum TEXT NOT NULL,
        stav TEXT NOT NULL DEFAULT 'Nová'
      )`,
      `CREATE TABLE IF NOT EXISTS media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        src TEXT NOT NULL,
        alt TEXT NOT NULL DEFAULT '',
        kategorie TEXT NOT NULL,
        sirsi INTEGER NOT NULL DEFAULT 0,
        poradi INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS nastaveni (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        telefon TEXT,
        email TEXT,
        email_druhy TEXT,
        standardy_pdf TEXT
      )`,
    ],
    "write"
  );

  const aptCount = await c.execute("SELECT COUNT(*) AS n FROM apartman");
  if (Number(aptCount.rows[0].n) === 0) {
    for (const a of seedApartments) {
      await c.execute({
        sql: `INSERT INTO apartman
          (slug, oznaceni, dispozice, podlazi, plocha_m2, balkon_terasa, vyhled, cena_kc, stav, popis, pudorys, fotky, parkovaci_stani, sklepni_koje, poradi)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        args: [
          a.slug,
          a.oznaceni,
          a.dispozice,
          a.podlazi,
          a.plocha_m2,
          a.balkon_terasa,
          a.vyhled,
          a.cena_kc,
          a.stav,
          a.popis,
          a.pudorys,
          JSON.stringify(a.fotky),
          a.parkovaci_stani ? 1 : 0,
          a.sklepni_koje ? 1 : 0,
          a.poradi,
        ],
      });
    }
  }

  const mediaCount = await c.execute("SELECT COUNT(*) AS n FROM media");
  if (Number(mediaCount.rows[0].n) === 0) {
    let i = 0;
    for (const g of seedGalerie) {
      await c.execute({
        sql: `INSERT INTO media (src, alt, kategorie, sirsi, poradi) VALUES (?,?,?,?,?)`,
        args: [g.src, g.alt, g.kategorie, g.sirsi ? 1 : 0, i++],
      });
    }
  }

  const nast = await c.execute("SELECT COUNT(*) AS n FROM nastaveni WHERE id = 1");
  if (Number(nast.rows[0].n) === 0) {
    await c.execute({
      sql: `INSERT INTO nastaveni (id, telefon, email, email_druhy, standardy_pdf) VALUES (1,?,?,?,?)`,
      args: [site.makler.telefon, site.makler.email, site.makler.emailDruhy, null],
    });
  }
}
