// Na Vercelu běží web v kořeni (basePath ""). Pro statický export pod podcestou
// lze nastavit NEXT_PUBLIC_BASE_PATH. Absolutní URL (Vercel Blob, http) procházejí beze změny.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith("data:")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
