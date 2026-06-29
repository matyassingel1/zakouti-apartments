import type { Metadata } from "next";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/WordReveal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { site } from "@/data/site";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte nás — prodej apartmánů Zákoutí v Deštném v Orlických horách.",
};

export default async function KontaktPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Rádi Vám apartmány ukážeme"
        emphasize={["ukážeme"]}
        lead="Veškerý prodej a prohlídky zajišťuje makléřka projektu. Neváhejte se ozvat — ráda Vám odpoví na všechny dotazy."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Kontaktní info */}
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <Eyebrow>Prodej a zprostředkování</Eyebrow>
                <p className="mt-5 font-display text-3xl text-ink">Prodej apartmánů Zákoutí</p>
                <div className="hairline-gold my-7 max-w-xs opacity-70" />

                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <Phone size={20} className="mt-0.5 shrink-0 text-gold-700" strokeWidth={1.5} />
                    <a
                      href={`tel:${settings.telefon.replace(/\s/g, "")}`}
                      className="link-underline mono text-lg text-ink"
                    >
                      {settings.telefon}
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail size={20} className="mt-0.5 shrink-0 text-gold-700" strokeWidth={1.5} />
                    <div>
                      <a
                        href={`mailto:${settings.email}`}
                        className="link-underline block text-ink"
                      >
                        {settings.email}
                      </a>
                      <a
                        href={`mailto:${settings.email_druhy}`}
                        className="link-underline mt-1 block text-sm text-stone"
                      >
                        {settings.email_druhy}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-gold-700" strokeWidth={1.5} />
                    <span className="text-ink">{site.makler.kancelar}</span>
                  </li>
                </ul>

                <div className="mt-10 border-l-2 border-gold-300 bg-ivory p-6">
                  <div className="flex items-center gap-3">
                    <Building2 size={18} className="text-gold-700" />
                    <p className="eyebrow">O projektu</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{site.developer.veta}</p>
                </div>
              </Reveal>
            </div>

            {/* Formulář */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <Reveal className="border border-line bg-pure p-7 lg:p-9">
                <h2 className="text-h3 text-ink">Napište nám</h2>
                <p className="mt-2 text-sm text-stone">
                  Vyplňte formulář a ozveme se Vám co nejdříve.
                </p>
                <div className="hairline-gold my-6" />
                <InquiryForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Mapy — projekt + realitní kancelář */}
      <section className="bg-ivory py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10">
            <Reveal>
              <Eyebrow>Lokalita projektu</Eyebrow>
              <h2 className="mt-3 text-h3 text-ink">{site.adresaProjektu}</h2>
              <div className="mt-6 overflow-hidden border border-line">
                <iframe
                  title="Mapa — Deštné v Orlických horách, lokalita Zákoutí"
                  src={site.mapa.embed}
                  className="h-[340px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
            <Reveal index={1}>
              <Eyebrow>Realitní kancelář</Eyebrow>
              <h2 className="mt-3 text-h3 text-ink">{site.makler.kancelar}</h2>
              <div className="mt-6 overflow-hidden border border-line">
                <iframe
                  title="Mapa — realitní kancelář, Hradec Králové"
                  src={site.mapa.kancelarEmbed}
                  className="h-[340px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={site.mapa.kancelarOdkaz}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mono mt-3 inline-flex items-center gap-2 text-sm text-gold-900"
              >
                Otevřít kancelář v Google Mapách
              </a>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
