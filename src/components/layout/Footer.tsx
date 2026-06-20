import Link from "next/link";
import { NAV, site } from "@/data/site";
import { Aurora } from "@/components/ui/Decor";

const TICKER = "ZÁKOUTÍ · ORLICKÉ HORY · 2027 · ";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <Aurora className="opacity-60" />
      <div className="hairline-gold" />

      {/* Marquee ticker */}
      <div className="relative z-10 overflow-hidden border-b border-paper/10 py-5">
        <div className="marquee">
          {[0, 1].map((k) => (
            <span
              key={k}
              aria-hidden={k === 1}
              className="mono whitespace-nowrap pr-0 text-sm tracking-[0.25em] text-gold-500/80"
            >
              {TICKER.repeat(8)}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 py-20 sm:px-8 lg:px-[clamp(2rem,7vw,9rem)]">
        {/* Faint monogram */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 top-0 select-none font-display text-[18rem] leading-none text-paper/[0.04]"
        >
          Z
        </span>

        <div className="relative max-w-3xl">
          <p className="text-h1 text-paper">
            Váš nový domov v <span className="serif-italic text-gold-300">srdci</span> Orlických hor.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Značka */}
          <div>
            <p className="font-display text-2xl font-medium">ZÁKOUTÍ APARTMENTS</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/70">{site.claim}</p>
            <p className="mt-4 text-sm text-paper/60">{site.adresaProjektu}</p>
          </div>

          {/* Navigace */}
          <div>
            <p className="eyebrow text-gold-500">Navigace</p>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-sm text-paper/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <p className="eyebrow text-gold-500">Kontakt</p>
            <p className="mt-5 text-sm text-paper/90">{site.makler.jmeno}</p>
            <p className="mt-2 text-sm text-paper/70">{site.makler.kancelar}</p>
            <a
              href={`tel:${site.makler.telefonHref}`}
              className="link-underline mono mt-3 block text-sm text-gold-300"
            >
              {site.makler.telefon}
            </a>
            <a
              href={`mailto:${site.makler.email}`}
              className="link-underline mt-1 block text-sm text-paper/80 hover:text-paper"
            >
              {site.makler.email}
            </a>
          </div>

          {/* O projektu */}
          <div>
            <p className="eyebrow text-gold-500">O projektu</p>
            <p className="mt-5 text-sm leading-relaxed text-paper/70">{site.developer.veta}</p>
            <p className="mt-3 text-sm text-paper/60">Dokončení a předání v roce {site.dokonceni}.</p>
          </div>
        </div>

        <div className="relative mt-16 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Zákoutí Apartments. Všechna práva vyhrazena.</p>
          <p>Zásady zpracování osobních údajů · Změny vyhrazeny</p>
        </div>
      </div>
    </footer>
  );
}
