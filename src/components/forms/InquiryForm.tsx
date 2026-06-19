"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { site } from "@/data/site";

interface InquiryFormProps {
  /** Předvyplněný apartmán (read-only), např. „Apartmán 1+kk · 33 m² (A1)". */
  apartman?: string;
  compact?: boolean;
}

type Errors = Partial<Record<"jmeno" | "email" | "telefon" | "gdpr", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{9,}$/;

export function InquiryForm({ apartman, compact = false }: InquiryFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const jmeno = String(data.get("jmeno") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const telefon = String(data.get("telefon") ?? "").trim();
    const zprava = String(data.get("zprava") ?? "").trim();
    const gdpr = data.get("gdpr") === "on";

    const next: Errors = {};
    if (!jmeno) next.jmeno = "Vyplňte prosím jméno a příjmení.";
    if (!EMAIL_RE.test(email)) next.email = "Zadejte platnou e-mailovou adresu.";
    if (!PHONE_RE.test(telefon)) next.telefon = "Zadejte platné telefonní číslo.";
    if (!gdpr) next.gdpr = "Bez souhlasu Vás bohužel nemůžeme kontaktovat.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const predmet = apartman ? `Nová poptávka — ${apartman}` : "Nová poptávka z webu Zákoutí";
    const telo = [
      apartman ? `Apartmán: ${apartman}` : "Obecná poptávka",
      `Jméno: ${jmeno}`,
      `E-mail: ${email}`,
      `Telefon: ${telefon}`,
      "",
      zprava || "(bez zprávy)",
    ].join("\n");

    // Bez backendu: otevře e-mailového klienta. Lze nahradit POSTem na endpoint (Formspree / vlastní).
    window.location.href = `mailto:${site.makler.email}?subject=${encodeURIComponent(
      predmet
    )}&body=${encodeURIComponent(telo)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 border border-line bg-pure p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-900">
          <Check size={24} strokeWidth={1.6} />
        </span>
        <h3 className="text-h3">Děkujeme, ozveme se Vám co nejdříve.</h3>
        <p className="text-body-lg text-stone">
          Vaše poptávka míří na {site.makler.jmeno}. Pokud se e-mailový klient neotevřel,
          napište prosím přímo na{" "}
          <a href={`mailto:${site.makler.email}`} className="link-underline text-gold-900">
            {site.makler.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const inputBase =
    "w-full border border-line bg-pure px-4 py-3 text-ink outline-none transition-colors placeholder:text-stone/60 focus:border-gold-500";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {apartman && (
        <div>
          <label className="eyebrow mb-2 block">Apartmán</label>
          <input
            type="text"
            value={apartman}
            readOnly
            className="w-full border border-line bg-ivory px-4 py-3 font-display text-lg text-ink"
            aria-label="Vybraný apartmán"
          />
        </div>
      )}

      <div className={compact ? "space-y-5" : "grid gap-5 sm:grid-cols-2"}>
        <div>
          <label htmlFor="jmeno" className="eyebrow mb-2 block">
            Jméno a příjmení *
          </label>
          <input
            id="jmeno"
            name="jmeno"
            type="text"
            autoComplete="name"
            className={inputBase}
            aria-invalid={!!errors.jmeno}
          />
          {errors.jmeno && <p className="mt-1.5 text-sm text-gold-900">{errors.jmeno}</p>}
        </div>
        <div>
          <label htmlFor="telefon" className="eyebrow mb-2 block">
            Telefon *
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            autoComplete="tel"
            className={inputBase}
            aria-invalid={!!errors.telefon}
          />
          {errors.telefon && <p className="mt-1.5 text-sm text-gold-900">{errors.telefon}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="eyebrow mb-2 block">
          E-mail *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputBase}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1.5 text-sm text-gold-900">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="zprava" className="eyebrow mb-2 block">
          Zpráva
        </label>
        <textarea id="zprava" name="zprava" rows={compact ? 3 : 4} className={inputBase} />
      </div>

      <label className="flex items-start gap-3 text-sm text-stone">
        <input type="checkbox" name="gdpr" className="mt-1 h-4 w-4 accent-[var(--color-gold-700)]" />
        <span>
          Souhlasím se zpracováním osobních údajů za účelem vyřízení mé poptávky. *
          {errors.gdpr && <span className="mt-1 block text-gold-900">{errors.gdpr}</span>}
        </span>
      </label>

      <button type="submit" className="btn-gold btn-gold--solid">
        Odeslat poptávku
      </button>
    </form>
  );
}
