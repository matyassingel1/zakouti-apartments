# Zákoutí Apartments

Prémiový web rezidenčního projektu **Zákoutí Apartments** — Deštné v Orlických horách, lokalita Zákoutí, č. p. 32. Dokončení 2027.

Designový koncept **„Zlatý hřeben"** — bílo-zlatá butiková estetika (úroveň Sotheby's International Realty) s jednou spojitou zlatou vrstevnicí jako podpisem, scroll-driven storytellingem a editorial typografií.

## Tech stack

- **Next.js 16** (App Router) + **React 19** — statický export (`output: "export"`)
- **TypeScript** (strict)
- **Tailwind CSS v4** — tokeny v `globals.css`
- **Framer Motion** — reveal, parallax, per-word nadpisy, lightbox
- **Lucide React** — ikony
- Fonty: **Cormorant Garamond** + **Manrope** + **JetBrains Mono** (vše `latin-ext`)

> **Větve:** `main` = statický web pro GitHub Pages (náhled). **`vercel-admin`** (tato větev) =
> plná verze s administrací + databází pro **Vercel**.

## Backend & administrace

- **Databáze:** libSQL (lokálně soubor `data/local.db`, produkce **Turso**)
- **Administrace** na `/admin` — správa apartmánů, poptávek, galerie, kontaktů
- **Auth:** přihlášení heslem (cookie session, `jose`)
- **Upload:** Vercel Blob (produkce) / `public/uploads` (lokálně)
- **Poptávky:** ukládají se do DB + volitelně e-mail (Resend)

Tabulky se vytvoří a naplní seed daty automaticky při prvním spuštění.

## Vývoj

```bash
npm install
cp .env.example .env.local   # vyplňte ADMIN_PASSWORD + AUTH_SECRET
npm run dev                  # web http://localhost:3000, admin /admin
npm run build
```

## Nasazení na Vercel + administrace

Viz **[NASAZENI-ADMIN.md](NASAZENI-ADMIN.md)** — krok za krokem (Turso, Vercel Blob, proměnné prostředí).

## Úprava obsahu

Obsah se spravuje v **administraci na `/admin`**. Seed (výchozí data) jsou v `src/data/`
(`apartments.ts`, `site.ts`, `standards.ts`, `gallery.ts`). Fotografie v `public/foto/`.
