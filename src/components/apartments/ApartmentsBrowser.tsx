"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Table as TableIcon } from "lucide-react";
import type { Apartman, Dispozice, Podlazi, Stav } from "@/data/apartments";
import { formatCzk, formatArea, formatAreaOrDash, cn } from "@/lib/utils";
import { StavBadge } from "@/components/ui/StavBadge";
import { ApartmentCard } from "./ApartmentCard";
import { CountUp } from "@/components/ui/CountUp";

type DispFilter = "Vše" | Dispozice;
type PodFilter = "Vše" | Podlazi;
type StavFilter = "Vše" | "Volný" | "Rezervováno";
type Sort = "poradi" | "cena-asc" | "cena-desc" | "plocha-asc" | "plocha-desc";
type View = "tabulka" | "karty";

const DISP: DispFilter[] = ["Vše", "Garsoniéra", "1+1", "2+kk", "2+1", "Mezonet"];
const POD: PodFilter[] = ["Vše", "I. PP", "I. NP", "II. NP", "III. NP"];
const STAV: StavFilter[] = ["Vše", "Volný", "Rezervováno"];
const SORTS: { key: Sort; label: string }[] = [
  { key: "poradi", label: "Doporučené" },
  { key: "cena-asc", label: "Cena ↑" },
  { key: "cena-desc", label: "Cena ↓" },
  { key: "plocha-desc", label: "Plocha ↓" },
];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "mono border px-3.5 py-1.5 text-xs uppercase tracking-[0.1em] transition-all duration-200",
        active
          ? "border-gold-500 bg-gold-100 text-gold-900"
          : "border-line bg-paper text-stone hover:border-gold-300 hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

export function ApartmentsBrowser({ apartments }: { apartments: Apartman[] }) {
  const [disp, setDisp] = useState<DispFilter>("Vše");
  const [pod, setPod] = useState<PodFilter>("Vše");
  const [stav, setStav] = useState<StavFilter>("Vše");
  const [sort, setSort] = useState<Sort>("poradi");
  const [view, setView] = useState<View>("tabulka");

  // Načti stav filtrů z URL (po mountu, bez hydration mismatch).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("disp")) setDisp(p.get("disp") as DispFilter);
    if (p.get("pod")) setPod(p.get("pod") as PodFilter);
    if (p.get("stav")) setStav(p.get("stav") as StavFilter);
    if (p.get("sort")) setSort(p.get("sort") as Sort);
    if (p.get("view") === "karty") setView("karty");
  }, []);

  // Zapiš filtry do URL.
  useEffect(() => {
    const p = new URLSearchParams();
    if (disp !== "Vše") p.set("disp", disp);
    if (pod !== "Vše") p.set("pod", pod);
    if (stav !== "Vše") p.set("stav", stav);
    if (sort !== "poradi") p.set("sort", sort);
    if (view !== "tabulka") p.set("view", view);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [disp, pod, stav, sort, view]);

  const volnych = apartments.filter((a) => a.stav === "Volný").length;

  const filtered = useMemo(() => {
    const out = apartments.filter((a) => {
      if (disp !== "Vše" && a.dispozice !== disp) return false;
      if (pod !== "Vše" && a.podlazi !== pod) return false;
      if (stav !== "Vše" && a.stav !== stav) return false;
      return true;
    });
    out.sort((a, b) => {
      switch (sort) {
        case "cena-asc":
          return a.cena_kc - b.cena_kc;
        case "cena-desc":
          return b.cena_kc - a.cena_kc;
        case "plocha-asc":
          return a.uzitna_m2 - b.uzitna_m2;
        case "plocha-desc":
          return b.uzitna_m2 - a.uzitna_m2;
        default:
          return a.poradi - b.poradi;
      }
    });
    return out;
  }, [apartments, disp, pod, stav, sort]);

  const hasFilters = disp !== "Vše" || pod !== "Vše" || stav !== "Vše";
  function reset() {
    setDisp("Vše");
    setPod("Vše");
    setStav("Vše");
    setSort("poradi");
  }

  return (
    <div>
      {/* Count-up */}
      <p className="text-h3 mb-8 text-ink">
        <CountUp to={volnych} className="font-display text-gold-700" />{" "}
        <span className="font-display">volných apartmánů</span>
      </p>

      {/* Sticky filtr */}
      <div className="sticky top-[72px] z-30 -mx-4 mb-10 border-y border-line bg-paper/95 px-4 py-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <FilterRow label="Dispozice">
            {DISP.map((d) => (
              <Pill key={d} active={disp === d} onClick={() => setDisp(d)}>
                {d}
              </Pill>
            ))}
          </FilterRow>
          <FilterRow label="Podlaží">
            {POD.map((d) => (
              <Pill key={d} active={pod === d} onClick={() => setPod(d)}>
                {d}
              </Pill>
            ))}
          </FilterRow>
          <FilterRow label="Stav">
            {STAV.map((d) => (
              <Pill key={d} active={stav === d} onClick={() => setStav(d)}>
                {d}
              </Pill>
            ))}
          </FilterRow>
          <FilterRow label="Řazení">
            {SORTS.map((s) => (
              <Pill key={s.key} active={sort === s.key} onClick={() => setSort(s.key)}>
                {s.label}
              </Pill>
            ))}
          </FilterRow>

          <div className="ml-auto flex items-center gap-3">
            {hasFilters && (
              <button onClick={reset} className="link-underline text-sm text-stone hover:text-ink">
                Zrušit filtry
              </button>
            )}
            <div className="flex items-center border border-line">
              <button
                onClick={() => setView("tabulka")}
                aria-label="Zobrazit jako tabulku"
                aria-pressed={view === "tabulka"}
                className={cn(
                  "flex h-9 w-9 items-center justify-center transition-colors",
                  view === "tabulka" ? "bg-gold-100 text-gold-900" : "text-stone hover:text-ink"
                )}
              >
                <TableIcon size={17} strokeWidth={1.6} />
              </button>
              <button
                onClick={() => setView("karty")}
                aria-label="Zobrazit jako karty"
                aria-pressed={view === "karty"}
                className={cn(
                  "flex h-9 w-9 items-center justify-center border-l border-line transition-colors",
                  view === "karty" ? "bg-gold-100 text-gold-900" : "text-stone hover:text-ink"
                )}
              >
                <LayoutGrid size={17} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prázdný stav */}
      {filtered.length === 0 ? (
        <div className="border border-line bg-pure py-24 text-center">
          <p className="text-h3 text-ink">Tomuto výběru neodpovídá žádný apartmán.</p>
          <button onClick={reset} className="btn-gold mt-6">
            Zrušit filtry
          </button>
        </div>
      ) : view === "karty" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((apt, i) => (
            <motion.div
              key={apt.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <ApartmentCard apt={apt} />
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          {/* Tabulka (desktop) */}
          <div className="hidden overflow-hidden border border-line bg-pure md:block">
            <div className="grid grid-cols-[0.7fr_0.9fr_0.8fr_0.7fr_1.1fr_1.1fr_1fr_auto] items-center gap-4 border-b-2 border-gold-700 px-6 py-4">
              {["Apartmán", "Dispozice", "Podlaží", "Užitná", "Venkovní", "Cena bez DPH", "Stav", ""].map(
                (h, i) => (
                  <span key={i} className="mono text-[0.68rem] uppercase tracking-[0.12em] text-stone">
                    {h}
                  </span>
                )
              )}
            </div>
            {filtered.map((apt, i) => {
              const prodano = apt.stav === "Prodáno";
              return (
                <motion.div
                  key={apt.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/apartmany/${apt.slug}/`}
                    className={cn(
                      "group grid grid-cols-[0.7fr_0.9fr_0.8fr_0.7fr_1.1fr_1.1fr_1fr_auto] items-center gap-4 border-b border-line px-6 py-5 transition-colors duration-200 hover:bg-ivory",
                      "relative before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:origin-top before:scale-y-0 before:bg-gold-500 before:transition-transform before:duration-200 hover:before:scale-y-100",
                      prodano && "opacity-60"
                    )}
                  >
                    <span className="font-display text-xl font-medium text-gold-700">{apt.oznaceni}</span>
                    <span className="text-sm text-ink">{apt.dispozice}</span>
                    <span className="text-sm text-stone">{apt.podlazi}</span>
                    <span className="mono text-sm text-ink">{formatArea(apt.uzitna_m2)}</span>
                    <span className="mono text-sm text-stone">{formatAreaOrDash(apt.venkovni_m2)}</span>
                    <span className={cn("mono text-sm", prodano ? "text-stone line-through" : "text-ink")}>
                      {formatCzk(apt.cena_kc)}
                    </span>
                    <span>
                      <StavBadge stav={apt.stav} />
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-stone transition-all duration-200 group-hover:translate-x-1 group-hover:text-gold-700"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Tabulka (mobil) — kompaktní, klikací řádky */}
          <div className="overflow-hidden border border-line bg-pure md:hidden">
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b-2 border-gold-700 px-4 py-3">
              <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-stone">
                Apartmán
              </span>
              <span className="mono text-right text-[0.62rem] uppercase tracking-[0.12em] text-stone">
                Cena
              </span>
            </div>
            {filtered.map((apt, i) => {
              const prodano = apt.stav === "Prodáno";
              return (
                <motion.div
                  key={apt.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/apartmany/${apt.slug}/`}
                    className={cn(
                      "grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-4 py-4 transition-colors active:bg-ivory",
                      "relative before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-gold-500",
                      prodano && "opacity-60"
                    )}
                  >
                    <span>
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-lg font-medium text-gold-700">
                          {apt.oznaceni}
                        </span>
                        <span className="text-sm text-ink">{apt.dispozice}</span>
                        <span className="mono text-xs text-stone">{formatArea(apt.uzitna_m2)}</span>
                      </span>
                      <span className="mt-1.5 flex items-center gap-2">
                        <StavBadge stav={apt.stav} />
                        <span className="text-xs text-stone">{apt.podlazi}</span>
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "mono text-sm",
                          prodano ? "text-stone line-through" : "text-ink"
                        )}
                      >
                        {formatCzk(apt.cena_kc)}
                      </span>
                      <ArrowRight size={16} className="text-gold-700" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="mono hidden text-[0.62rem] uppercase tracking-[0.14em] text-stone/70 sm:inline">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
