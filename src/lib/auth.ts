import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "zak_admin";

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (s) return new TextEncoder().encode(s);
  // V produkci NIKDY nefallbackovat — jinak by šel podpis session zfalšovat.
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    throw new Error(
      "Chybí AUTH_SECRET. Nastavte ho v proměnných prostředí (Vercel → Settings → Environment Variables)."
    );
  }
  return new TextEncoder().encode("dev-insecure-secret-change-me");
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function isAuthed(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export function checkPassword(pw: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && pw === expected;
}

/** Hodí chybu, pokud uživatel není přihlášen (pro server actions). */
export async function requireAuth(): Promise<void> {
  if (!(await isAuthed())) throw new Error("Neautorizováno.");
}
