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

## 1. Import projektu na Vercel

1. <https://vercel.com/new> → importujte repozitář `matyassingel1/zakouti-apartments`.
2. **Production Branch:** nastavte na `vercel-admin` (Settings → Git).
3. Framework: Next.js (detekuje se sám). Žádné další nastavení buildu není třeba.

## 2. Databáze — Vercel Postgres (Neon), vše uvnitř Vercelu

Ve Vercel projektu → **Storage → Create Database → Postgres (Neon)** → potvrdit.
Tím se do projektu **automaticky přidá `DATABASE_URL`** (žádný samostatný účet ani CLI).
Tabulky se vytvoří a naplní 19 apartmány **automaticky** při prvním načtení webu.

## 3. Úložiště obrázků — Vercel Blob

Ve Vercel projektu → **Storage → Create → Blob**. Tím se automaticky přidá proměnná
`BLOB_READ_WRITE_TOKEN`. Sem se ukládají nahrané půdorysy, fotky a PDF.

## 4. Proměnné prostředí (Settings → Environment Variables)

| Proměnná | Popis |
|----------|-------|
| `ADMIN_PASSWORD` | **heslo do administrace** (zvolte silné) |
| `AUTH_SECRET` | **povinné** — náhodný dlouhý řetězec pro podpis přihlášení (`openssl rand -base64 32`). Bez něj je admin v produkci nepřístupný (fail-closed). |
| `DATABASE_URL` | přidá se sám v kroku 2 (Postgres/Neon) |
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
cp .env.example .env.local   # vyplňte ADMIN_PASSWORD, AUTH_SECRET a DATABASE_URL (z Neonu)
npm run dev                  # web na http://localhost:3000, admin na /admin
```

Lokálně se připojuje ke stejné Postgres DB přes `DATABASE_URL`; obrázky se bez Blob tokenu
ukládají do `public/uploads/` (v `.gitignore`).
