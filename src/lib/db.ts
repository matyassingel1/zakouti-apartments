import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Vercel Postgres (Neon). Connection string přidá integrace „Neon/Postgres" ve Vercelu
// automaticky (DATABASE_URL / POSTGRES_URL). Lokálně se nastaví v .env.local.
let _sql: NeonQueryFunction<false, false> | null = null;

export function getDb(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL_UNPOOLED;
  if (!url) {
    throw new Error(
      "Chybí připojení k databázi. Nastavte DATABASE_URL (Vercel → Storage → Neon/Postgres)."
    );
  }
  _sql = neon(url);
  return _sql;
}
