# Nasazení webu s administrací na Vercel

Tato větev (`vercel-admin`) obsahuje **plnou administraci** (CMS) — správa apartmánů, poptávek,
galerie a kontaktů. Admin potřebuje server + databázi, proto se nasazuje na **Vercel** (ne na
GitHub Pages). Veřejný náhled na GitHub Pages (větev `main`) zůstává beze změny funkční.

Co admin umí:
- ✅ přidat / upravit / smazat apartmán (všechna pole)
- ✅ změnit **stav** (Volný / Rezervováno / Prodáno) i **cenu** → ihned se projeví na webu
- ✅ nahrát / vyměnit **půdorys** a **fotky** apartmánu
- ✅ změnit **pořadí** apartmánů
- ✅ vidět a spravovat **poptávky** (stav Nová → Vyřízená, mazání)
- ✅ spravovat **galerii** (přidat / odebrat fotky, kategorie)
- ✅ upravit **kontakt makléřky** a nahrát **PDF standardů**

---

## 1. Databáze — Turso (libSQL, zdarma)

1. Vytvořte si účet na <https://turso.tech> a nainstalujte CLI (`brew install tursodatabase/tap/turso`)
   nebo použijte webové rozhraní.
2. Vytvořte databázi a token:
   ```bash
   turso db create zakouti
   turso db show zakouti --url           # → TURSO_DATABASE_URL  (libsql://...)
   turso db tokens create zakouti        # → TURSO_AUTH_TOKEN
   ```
   Tabulky se vytvoří a naplní seed daty **automaticky** při prvním načtení webu.

> Alternativa: jakákoli libSQL-kompatibilní DB. Bez nastavené `TURSO_DATABASE_URL` web jede
> lokálně proti souboru `data/local.db` (jen pro vývoj).

## 2. Import projektu na Vercel

1. <https://vercel.com/new> → importujte repozitář `matyassingel1/zakouti-apartments`.
2. **Production Branch:** nastavte na `vercel-admin` (Settings → Git).
3. Framework: Next.js (detekuje se sám). Žádné další nastavení buildu není třeba.

## 3. Úložiště obrázků — Vercel Blob

Ve Vercel projektu → **Storage → Create → Blob**. Tím se automaticky přidá proměnná
`BLOB_READ_WRITE_TOKEN`. Sem se ukládají nahrané půdorysy, fotky a PDF.

## 4. Proměnné prostředí (Settings → Environment Variables)

| Proměnná | Popis |
|----------|-------|
| `ADMIN_PASSWORD` | **heslo do administrace** (zvolte silné) |
| `AUTH_SECRET` | náhodný dlouhý řetězec pro podpis přihlášení (`openssl rand -base64 32`) |
| `TURSO_DATABASE_URL` | z kroku 1 |
| `TURSO_AUTH_TOKEN` | z kroku 1 |
| `BLOB_READ_WRITE_TOKEN` | přidá se sám v kroku 3 |
| `RESEND_API_KEY` | *(volitelné)* odesílání e-mailu o nové poptávce přes [Resend](https://resend.com) |
| `RESEND_FROM` | *(volitelné)* odesílatel, např. `Zákoutí <noreply@vasedomena.cz>` |

> Poptávky se **vždy uloží do databáze** a jsou vidět v administraci. E-mail je jen navíc
> (když je nastaven Resend).

## 5. Deploy

Klikněte **Deploy**. Po nasazení:
- Web: `https://<projekt>.vercel.app/`
- Administrace: `https://<projekt>.vercel.app/admin` → přihlášení heslem `ADMIN_PASSWORD`

## 6. Vlastní doména

Vercel → Settings → Domains → přidejte doménu a nastavte DNS dle pokynů Vercelu.

---

## Lokální vývoj

```bash
npm install
cp .env.example .env.local   # vyplňte ADMIN_PASSWORD + AUTH_SECRET
npm run dev                  # web na http://localhost:3000, admin na /admin
```

Lokálně se použije souborová DB `data/local.db` a obrázky se ukládají do `public/uploads/`
(obojí je v `.gitignore`).
