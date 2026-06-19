import Link from "next/link";
import { Home, TrendingUp, Mountain, ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal, Eyebrow } from "@/components/ui/WordReveal";
import { Photo } from "@/components/ui/Photo";
import { RidgeDivider, MonogramZ } from "@/components/ui/GoldRidge";
import { CountUp } from "@/components/ui/CountUp";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { getApartments } from "@/data/apartments";
import { site } from "@/data/site";

const DUVODY = [
  {
    icon: Home,
    title: "Příjemné sousedství",
    text: "Rodinná zástavba a klid bez hlučného centra, ale v dostupnosti služeb — obchodů, restaurací i lékařské péče.",
  },
  {
    icon: TrendingUp,
    title: "Silný investiční potenciál",
    text: "Poloha horského střediska nabízí krátkodobý pronájem v letní i zimní sezóně (Airbnb, Booking.com, české portály). Výnos až 15 % ročně.",
  },
  {
    icon: Mountain,
    title: "Příjemné životní prostředí",
    text: "Čisté ovzduší, dostatek zeleně a klidná atmosféra v harmonii s přírodou Orlických hor.",
  },
];

export default function HomePage() {
  const apartmany = getApartments();
  const teaser = apartmany.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Developerský projekt — asymetrický intro */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-12 gap-10 lg:gap-16">
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <Eyebrow>Developerský projekt</Eyebrow>
              </Reveal>
              <WordReveal
                as="h2"
                className="mt-6 text-h1 text-ink"
                text="Nové apartmány v lokalitě Zákoutí"
                emphasize={["Zákoutí"]}
              />
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-16">
              <Reveal>
                <p className="text-lead text-pretty text-stone">
                  Nabízíme Vám ke koupi nové moderní apartmány v Deštném v Orlických horách —
                  Zákoutí, jež je perfektním místem pro zimní i letní dovolenou, ale i pro stabilní
                  pronájem.{" "}
                  <span className="text-ink">Stavba bude ukončena a k předání již v roce 2027.</span>
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-16">
            <Photo
              src="/foto/objekt-portret.jpg"
              alt="Bytový dům Zákoutí v krajině Orlických hor."
              className="aspect-[21/9] w-full"
            />
          </Reveal>
        </Container>
      </section>

      {/* Prémiová lokalita — text + foto */}
      <section className="bg-ivory py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-12 items-center gap-10 lg:gap-16">
            <Reveal className="col-span-12 lg:col-span-6">
              <Photo
                src="/foto/okoli-07.jpg"
                alt="Objekt Zákoutí a jeho okolí v Orlických horách."
                className="aspect-[4/3] w-full"
              />
            </Reveal>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <Reveal>
                <Eyebrow>Prémiová lokalita</Eyebrow>
              </Reveal>
              <WordReveal
                as="h2"
                className="mt-5 text-h2 text-ink"
                text="Jedno z nejpopulárnějších horských středisek"
              />
              <Reveal className="mt-6">
                <p className="text-body-lg text-pretty text-stone">
                  Samotná obec Deštné v Orlických horách patří k nejpopulárnějším horským
                  střediskům České republiky. Výhodně položená v oblasti CHKO Orlické hory zajišťuje
                  čisté ovzduší, zážitkovou přírodu a vynikající zázemí pro zimu i léto. Náš projekt
                  v lokalitě Zákoutí nabízí moderní a komfortní apartmány v idylickém prostředí — v
                  dostupnosti skiareálů a turistických tras, a přitom v klidnější části obce.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Proč Zákoutí — editoriální trio spojené konturou */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <Eyebrow>Proč Zákoutí?</Eyebrow>
          </Reveal>
          <WordReveal
            as="h2"
            className="mt-5 max-w-2xl text-h1 text-ink"
            text="Místo, kde se klid potkává s investicí"
            emphasize={["investicí"]}
          />
          <RidgeDivider className="my-10 opacity-80" />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
            {DUVODY.map((d, i) => (
              <Reveal
                key={d.title}
                index={i}
                className={i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300 bg-gold-100 text-gold-700">
                  <d.icon size={24} strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-h3 text-ink">{d.title}</h3>
                <p className="mt-3 text-body-lg text-pretty text-stone">{d.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Investice — count-up */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
        <MonogramZ className="absolute -right-10 -top-16 text-[26rem]" />
        <Container className="relative">
          <Reveal>
            <Eyebrow className="text-gold-500">Investice s výhledem</Eyebrow>
          </Reveal>
          <WordReveal
            as="h2"
            className="mt-5 max-w-2xl text-h1 text-paper"
            text="Horské bydlení, které zhodnocuje"
            emphasize={["zhodnocuje"]}
          />
          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {[
              { value: <><CountUp to={15} />&nbsp;%</>, label: "potenciální roční výnos" },
              { value: "2027", label: "dokončení a předání" },
              { value: <CountUp to={6} />, label: "exkluzivních apartmánů" },
              { value: "1,5–2 km", label: "ke skiareálu Deštné–Šerlich" },
            ].map((s, i) => (
              <Reveal key={i} index={i}>
                <p className="font-display text-5xl font-light text-gold-300 lg:text-6xl">
                  {s.value}
                </p>
                <div className="hairline-gold mt-4 max-w-[80%] opacity-50" />
                <p className="mt-4 text-sm leading-relaxed text-paper/70">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <p className="max-w-2xl text-body-lg text-paper/80">
              Apartmány budou zkolaudovány jako bytové jednotky, což umožňuje bezproblémové
              financování prostřednictvím hypotečního úvěru.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Interiér — editoriální trio */}
      <section className="bg-ivory py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <Eyebrow>Interiér</Eyebrow>
              </Reveal>
              <WordReveal as="h2" className="mt-5 text-h1 text-ink" text="Jak se v Zákoutí bydlí" />
            </div>
            <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="text-body-lg text-pretty text-stone">
                Teplé dřevo, přírodní materiály a klid hor v každém detailu.
              </p>
              <Link
                href="/galerie/"
                className="link-underline mt-4 inline-flex items-center gap-2 text-gold-900"
              >
                Prohlédnout galerii <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-6">
            <Reveal className="col-span-12 lg:col-span-8">
              <Photo
                src="/foto/interiery/obyvaci-pokoj.webp"
                alt="Obývací pokoj s jídelnou — rohová sedačka, kruhové LED svítidlo a výhled do hor."
                className="aspect-[16/10] w-full"
              />
              <p className="mono mt-3 text-xs text-stone">
                Ilustrativní vizualizace — finální provedení dle standardů.
              </p>
            </Reveal>
            <div className="col-span-12 grid gap-6 lg:col-span-4">
              <Reveal index={1}>
                <Photo
                  src="/foto/interiery/loznice.webp"
                  alt="Ložnice s čalouněnou postelí, zrcadlovou skříní a horským obrazem."
                  className="aspect-[4/3] w-full"
                />
              </Reveal>
              <Reveal index={2}>
                <Photo
                  src="/foto/interiery/kuchyne-studio.webp"
                  alt="Kuchyňské studio 1+kk — dubová linka a jídelní kout."
                  className="aspect-[4/3] w-full"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Zima / Léto */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal className="border border-line bg-pure p-8 lg:p-10">
              <Eyebrow>Zimní sezóna</Eyebrow>
              <h3 className="mt-4 text-h2 text-ink">Skiareál na dosah</h3>
              <p className="mt-4 text-body-lg text-pretty text-stone">
                Skiareál Deštné – Šerlich leží v těsné blízkosti (cca 1,5–2 km). Apartmány navržené
                pro aktivní sportovce i rodinnou zimní dovolenou — výhledy na zasněžené hory,
                prostorné zázemí a možnost zabezpečeného uložení lyžařského vybavení.
              </p>
            </Reveal>
            <Reveal index={1} className="border border-line bg-pure p-8 lg:mt-12 lg:p-10">
              <Eyebrow>Letní sezóna</Eyebrow>
              <h3 className="mt-4 text-h2 text-ink">Příroda pro aktivní rodinu</h3>
              <p className="mt-4 text-body-lg text-pretty text-stone">
                V létě je Deštné oblíbené pro turistiku, cyklistiku a zdravý způsob života v
                přírodě — naučné stezky, výhledy na vrcholy a relax na čerstvém horském ovzduší. V
                blízkosti Bikepark Deštné a Adventure park.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Sense of place — full-bleed aerial */}
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <Photo
          src="/foto/okoli-01.jpg"
          alt="Letecký pohled na údolí Deštného — louky, lesy a sjezdovka se hřebeny Orlických hor v dáli."
          className="absolute inset-0 h-full w-full"
          reveal={false}
        />
        <div className="media-scrim absolute inset-0" />
        <Container className="relative flex h-full items-end pb-16 lg:pb-20">
          <div className="max-w-2xl">
            <WordReveal
              as="h2"
              className="text-display-2 text-paper"
              text="Krajina, která tají dech"
              emphasize={["dech"]}
            />
            <Reveal className="mt-5">
              <p className="text-lead text-paper/90">
                Hřebeny Orlických hor, čistý vzduch a výhledy, které si vychutnáte z vlastního
                balkonu — každý den v roce.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Teaser apartmánů */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <Eyebrow>Nabídka · 6 apartmánů</Eyebrow>
              </Reveal>
              <WordReveal
                as="h2"
                className="mt-5 text-h1 text-ink"
                text="Vyberte si svůj apartmán"
                emphasize={["svůj"]}
              />
            </div>
            <Reveal>
              <Link href="/apartmany/" className="btn-gold">
                Zobrazit všechny apartmány
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teaser.map((apt, i) => (
              <Reveal key={apt.slug} index={i}>
                <ApartmentCard apt={apt} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Závěrečné CTA */}
      <section className="bg-ivory py-24 lg:py-32">
        <Container className="text-center">
          <Reveal>
            <Eyebrow>Kontakt</Eyebrow>
          </Reveal>
          <WordReveal
            as="h2"
            className="mx-auto mt-5 max-w-3xl text-display-2 text-ink"
            text="Uvidíme se na prohlídce?"
            emphasize={["prohlídce?"]}
          />
          <Reveal className="mt-8">
            <p className="mx-auto max-w-xl text-body-lg text-stone">
              {site.makler.jmeno} · {site.makler.telefon} · {site.makler.email}
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kontakt/" className="btn-gold btn-gold--solid">
                Kontaktovat
              </Link>
              <Link href="/apartmany/" className="btn-gold">
                Zobrazit apartmány
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
