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

## Vývoj

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statický export do out/
```

## Nasazení (GitHub Pages)

```bash
./deploy.sh
```

Web běží na `https://matyassingel1.github.io/zakouti-apartments/`.

## Úprava obsahu

Veškerá data jsou v `src/data/` — žádné údaje nejsou natvrdo v komponentách (připraveno na pozdější napojení CMS):

| Soubor | Obsah |
|--------|-------|
| `src/data/apartments.ts` | 6 apartmánů — ceny, plochy, stav (Volný/Rezervováno/Prodáno), popisy, půdorysy |
| `src/data/site.ts` | kontakt makléřky, adresa projektu, mapa |
| `src/data/standards.ts` | standardy provedení |
| `src/data/gallery.ts` | galerie |

Fotografie jsou v `public/foto/`.

> **Pozn.:** Poptávkový formulář zatím odesílá přes e-mailového klienta (`mailto:`). Administrace a serverové odesílání poptávek + správa apartmánů (CMS) jsou plánované jako další krok.
