import "server-only";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

/** Uloží soubor: na Vercelu do Vercel Blob, lokálně do public/uploads. Vrací veřejnou URL. */
export async function saveUpload(file: File, prefix = "soubor"): Promise<string> {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const rand = Math.random().toString(36).slice(2, 9);
  const name = `${prefix}-${Date.now()}-${rand}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`zakouti/${name}`, file, { access: "public" });
    return blob.url;
  }

  // Na Vercelu je souborový systém read-only → bez Blob tokenu fail-fast se srozumitelnou hláškou.
  if (process.env.VERCEL) {
    throw new Error(
      "Chybí BLOB_READ_WRITE_TOKEN — přidejte úložiště Vercel Blob (Storage → Create → Blob)."
    );
  }

  // Lokální vývoj — zapiš do public/uploads
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buf);
  return `/uploads/${name}`;
}
