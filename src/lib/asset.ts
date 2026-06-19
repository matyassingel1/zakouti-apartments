// Static export on GitHub Pages serves under /zakouti-apartments.
// next/link and _next assets get basePath automatically, but plain <img> src does NOT.
// Every image path must go through asset() so it carries the basePath in production.
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/zakouti-apartments" : "";

export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
