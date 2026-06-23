"use client";

import { useState } from "react";
import { Expand, Hammer } from "lucide-react";
import { asset } from "@/lib/asset";
import type { Apartman } from "@/data/apartments";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { formatArea } from "@/lib/utils";

export function DetailGallery({ apt }: { apt: Apartman }) {
  const [index, setIndex] = useState<number | null>(null);
  const maPudorys = apt.pudorysy.length > 0;

  const pudorysItems: LightboxItem[] = apt.pudorysy.map((src, i) => ({
    src,
    alt: `3D půdorys apartmánu ${apt.oznaceni} — ${apt.dispozice}, ${apt.uzitna_m2} m² (pohled ${i + 1}).`,
    popis: `Půdorys ${apt.oznaceni} · ${apt.dispozice} · ${formatArea(apt.uzitna_m2)} — pohled ${i + 1} (orientační, změny vyhrazeny)`,
  }));
  const fotkyItems: LightboxItem[] = apt.fotky.map((f) => ({ src: f.src, alt: f.alt, popis: f.popis }));
  const items: LightboxItem[] = [...pudorysItems, ...fotkyItems];

  return (
    <div>
      {/* Půdorys — hrdina, na paspartě */}
      <figure className="border border-line bg-ivory p-4 sm:p-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="eyebrow">Půdorys</p>
            <p className="mt-1 font-display text-xl text-stone">
              {maPudorys ? "Orientační dispozice jednotky" : "Připravujeme"}
            </p>
          </div>
          {maPudorys && (
            <button
              onClick={() => setIndex(0)}
              className="flex items-center gap-2 text-sm text-gold-900 transition-colors hover:text-gold-700"
              aria-label="Zvětšit půdorys"
            >
              <Expand size={16} /> Zvětšit
            </button>
          )}
        </div>

        {maPudorys ? (
          <div className={apt.pudorysy.length > 1 ? "grid gap-4 sm:grid-cols-2" : ""}>
            {apt.pudorysy.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                className="block w-full cursor-zoom-in bg-pure"
                aria-label={`Otevřít půdorys (pohled ${i + 1}) ve fullscreenu`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(src)}
                  alt={`3D půdorys apartmánu ${apt.oznaceni} — pohled ${i + 1}.`}
                  loading="lazy"
                  className="mx-auto max-h-[440px] w-auto object-contain"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 bg-pure px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300 bg-gold-100 text-gold-700">
              <Hammer size={20} strokeWidth={1.6} />
            </span>
            <p className="font-display text-xl text-ink">Půdorys připravujeme</p>
            <p className="max-w-sm text-sm text-stone">
              Detailní půdorys této jednotky doplníme. Rádi Vám jej zašleme na vyžádání — stačí
              odeslat poptávku.
            </p>
          </div>
        )}

        <figcaption className="mono mt-4 text-xs text-stone">
          {maPudorys
            ? "3D půdorys — orientační, změny vyhrazeny."
            : "Půdorys jednotky na vyžádání u makléřky."}
        </figcaption>
      </figure>

      {/* Vizualizace (ilustrativní, společné pro všechny jednotky) */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {apt.fotky.map((f, i) => (
          <button
            key={f.src}
            onClick={() => setIndex(apt.pudorysy.length + i)}
            className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden border border-line"
            aria-label={`Zvětšit: ${f.popis}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(f.src)}
              alt={f.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <p className="mono mt-3 text-xs text-stone">
        Ilustrativní vizualizace — finální provedení dle standardů.
      </p>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </div>
  );
}
