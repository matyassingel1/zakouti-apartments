import { createClient, type Client } from "@libsql/client";

// libSQL: lokálně soubor (data/local.db), na Vercelu Turso (env).
let client: Client | null = null;

export function db(): Client {
  if (client) return client;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  client = url
    ? createClient({ url, authToken })
    : createClient({ url: "file:data/local.db" });
  return client;
}
