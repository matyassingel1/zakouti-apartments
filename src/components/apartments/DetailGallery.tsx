"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { asset } from "@/lib/asset";
import type { Apartman } from "@/data/apartments";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { formatArea } from "@/lib/utils";

export function DetailGallery({ apt }: { apt: Apartman }) {
  const [index, setIndex] = useState<number | null>(null);

  const items: LightboxItem[] = [
    {
      src: apt.pudorys,
      alt: `Půdorys apartmánu ${apt.oznaceni} — ${apt.dispozice}, ${apt.plocha_m2} m².`,
      popis: `Půdorys — ${apt.dispozice} · ${formatArea(apt.plocha_m2)} (orientační, změny vyhrazeny)`,
    },
    ...apt.fotky.map((f) => ({ src: f.src, alt: f.alt, popis: f.popis })),
  ];

  return (
    <div>
      {/* Půdorys — hrdina, na paspartě */}
      <figure className="border border-line bg-ivory p-4 sm:p-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="eyebrow">Půdorys</p>
            <p className="mt-1 font-display text-xl text-stone">Orientační dispozice jednotky</p>
          </div>
          <button
            onClick={() => setIndex(0)}
            className="flex items-center gap-2 text-sm text-gold-900 transition-colors hover:text-gold-700"
            aria-label="Zvětšit půdorys"
          >
            <Expand size={16} /> Zvětšit
          </button>
        </div>
        <button
          onClick={() => setIndex(0)}
          className="block w-full cursor-zoom-in bg-pure"
          aria-label="Otevřít půdorys ve fullscreenu"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(apt.pudorys)}
            alt={`Půdorys apartmánu ${apt.oznaceni} — ${apt.dispozice}, ${apt.plocha_m2} m².`}
            loading="lazy"
            className="mx-auto max-h-[520px] w-auto object-contain"
          />
        </button>
        <figcaption className="mono mt-4 text-xs text-stone">
          Půdorys — orientační, změny vyhrazeny.
        </figcaption>
      </figure>

      {/* Vizualizace */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {apt.fotky.map((f, i) => (
          <button
            key={f.src}
            onClick={() => setIndex(i + 1)}
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
