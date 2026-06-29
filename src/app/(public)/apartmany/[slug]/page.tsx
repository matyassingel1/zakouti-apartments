import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, FileText, Car, Boxes } from "lucide-react";
import { getApartments, getApartment } from "@/lib/data";
import { standardyShrnuti } from "@/data/standards";
import { formatCzk, formatArea, formatAreaOrDash, fixWidows } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/WordReveal";
import { StavBadge } from "@/components/ui/StavBadge";
import { DetailGallery } from "@/components/apartments/DetailGallery";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const apt = await getApartment(slug);
  if (!apt) return { title: "Apartmán nenalezen" };
  return {
    title: `Apartmán ${apt.dispozice} · ${apt.uzitna_m2} m² (${apt.oznaceni})`,
    description: apt.popis.slice(0, 155),
  };
}

export default async function ApartmanDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const apt = await getApartment(slug);
  if (!apt) notFound();

  const all = await getApartments();
  const i = all.findIndex((a) => a.slug === apt.slug);
  const prev = i > 0 ? all[i - 1] : all[all.length - 1];
  const next = i < all.length - 1 ? all[i + 1] : all[0];
  const prodano = apt.stav === "Prodáno";

  const apartmanLabel = `Apartmán ${apt.dispozice} · ${formatArea(apt.uzitna_m2)} (${apt.oznaceni})`;

  const parametry: { k: string; v: string }[] = [
    { k: "Označení jednotky", v: apt.oznaceni },
    { k: "Dispozice", v: apt.dispozice },
    { k: "Podlaží", v: apt.podlazi },
    { k: "Užitná plocha", v: formatArea(apt.uzitna_m2) },
    { k: "Celková plocha (vč. sklepa a venk. ploch)", v: formatArea(apt.celkova_m2) },
    { k: "Balkon / terasa / předzahrádka", v: formatAreaOrDash(apt.venkovni_m2) },
    { k: "Zděný sklep", v: formatArea(apt.sklep_m2) },
    { k: "Parkovací stání", v: apt.parkovaci_stani ? "ano, 1×" : "—" },
    { k: "Podíl na společných prostorách", v: "ano" },
  ];

  return (
    <>
      {/* Hero detailu */}
      <section className="border-b border-line pb-12 pt-28 lg:pt-36">
        <Container>
          <Link
            href="/apartmany/"
            className="link-underline mono inline-flex items-center gap-2 text-xs text-stone hover:text-ink"
          >
            <ArrowLeft size={14} /> Zpět na nabídku
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <Eyebrow>Zákoutí Apartments · Deštné v Orlických horách</Eyebrow>
              <div className="mt-4 flex flex-wrap items-baseline gap-4">
                <h1 className="text-display-2 text-ink">Apartmán {apt.dispozice}</h1>
                <span className="mono text-xl text-stone">{formatArea(apt.uzitna_m2)}</span>
                <span className="font-display text-2xl text-gold-700">{apt.oznaceni}</span>
              </div>
              <div className="mt-5">
                <StavBadge stav={apt.stav} />
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <p
                className={`font-display text-4xl lg:text-5xl ${prodano ? "text-stone line-through" : "text-ink"}`}
              >
                {formatCzk(apt.cena_kc)}
              </p>
              <p className="mono max-w-xs text-xs leading-relaxed text-stone lg:text-right">
                Cena je konečná a&nbsp;bez&nbsp;DPH · v&nbsp;ceně parkovací stání (1×)
                a&nbsp;zděný sklep (5&nbsp;m²)
              </p>
              <a href="#poptavka" className="btn-gold btn-gold--solid mt-1">
                Mám zájem o tento apartmán
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Levý sloupec — galerie + popis + parametry */}
            <div className="lg:col-span-7">
              <Reveal>
                <DetailGallery apt={apt} />
              </Reveal>

              <Reveal className="mt-14">
                <Eyebrow>O apartmánu</Eyebrow>
                <p className="mt-5 text-lead text-pretty text-stone">{fixWidows(apt.popis)}</p>
              </Reveal>

              {/* Parametry */}
              <Reveal className="mt-14">
                <h2 className="text-h3 text-ink">Parametry apartmánu</h2>
                <dl className="mt-6 border-t border-line">
                  {parametry.map((p) => (
                    <div
                      key={p.k}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                    >
                      <dt className="text-sm text-stone">{p.k}</dt>
                      <dd className="mono text-right text-sm text-ink">{p.v}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                    <dt className="text-sm text-stone">Cena (bez DPH)</dt>
                    <dd
                      className={`mono text-right text-sm ${prodano ? "text-stone line-through" : "text-ink"}`}
                    >
                      {formatCzk(apt.cena_kc)}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              {/* Standardy shrnutí */}
              <Reveal className="mt-14 border border-line bg-ivory p-8">
                <Eyebrow>Standardy</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {standardyShrnuti.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-body-lg text-stone">
                      <Check size={18} className="mt-1 shrink-0 text-gold-700" strokeWidth={2} />
                      <span>{fixWidows(s)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link href="/standardy/" className="btn-gold">
                    Zobrazit kompletní standardy <ArrowRight size={16} />
                  </Link>
                  <span className="mono inline-flex items-center gap-2 self-center text-xs text-stone">
                    <FileText size={15} /> PDF dodá makléřka
                  </span>
                </div>
              </Reveal>

              {/* Mini ikony */}
              <div className="mt-10 flex flex-wrap gap-8">
                <span className="flex items-center gap-2.5 text-sm text-stone">
                  <Car size={18} className="text-gold-700" /> Vlastní parkovací stání
                </span>
                <span className="flex items-center gap-2.5 text-sm text-stone">
                  <Boxes size={18} className="text-gold-700" /> Zděný sklep 5&nbsp;m²
                </span>
              </div>
            </div>

            {/* Pravý sloupec — sticky formulář */}
            <div className="lg:col-span-5">
              <div id="poptavka" className="lg:sticky lg:top-28">
                <div className="border border-line bg-pure p-7 lg:p-8">
                  <h2 className="text-h3 text-ink">Mám zájem o apartmán</h2>
                  <p className="mt-2 text-sm text-stone">
                    Ozveme se Vám co nejdříve.
                  </p>
                  <div className="hairline-gold my-6" />
                  <InquiryForm apartman={apartmanLabel} apartmanSlug={apt.slug} compact />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Prev / next */}
      <section className="border-t border-line py-12">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link href={`/apartmany/${prev.slug}/`} className="group flex items-center gap-4">
              <ArrowLeft size={20} className="text-gold-700 transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="mono block text-xs uppercase tracking-[0.12em] text-stone">
                  Předchozí
                </span>
                <span className="font-display text-lg text-ink">
                  Apartmán {prev.dispozice} · {formatArea(prev.uzitna_m2)}
                </span>
              </span>
            </Link>
            <Link
              href={`/apartmany/${next.slug}/`}
              className="group flex items-center justify-end gap-4 text-right"
            >
              <span>
                <span className="mono block text-xs uppercase tracking-[0.12em] text-stone">Další</span>
                <span className="font-display text-lg text-ink">
                  Apartmán {next.dispozice} · {formatArea(next.uzitna_m2)}
                </span>
              </span>
              <ArrowRight size={20} className="text-gold-700 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
