"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { asset } from "@/lib/asset";
import { galerie, type GalerieKategorie } from "@/data/gallery";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

type Tab = "Vše" | GalerieKategorie;
const TABS: Tab[] = ["Vše", "Vizualizace", "Interiér", "Okolí"];

export function GalleryView() {
  const [tab, setTab] = useState<Tab>("Vše");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () => galerie.filter((g) => tab === "Vše" || g.kategorie === tab),
    [tab]
  );

  const lightboxItems: LightboxItem[] = items.map((g) => ({ src: g.src, alt: g.alt }));

  return (
    <div>
      {/* Taby s posuvným podtržením */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              tab === t ? "text-ink" : "text-stone hover:text-ink"
            )}
          >
            {t}
            {tab === t && (
              <motion.span
                layoutId="gallery-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-gold-500"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
        >
          {items.map((g, i) => (
            <motion.button
              key={g.src}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setIndex(i)}
              className="group block w-full cursor-zoom-in overflow-hidden border border-line"
              aria-label={`Zvětšit: ${g.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(g.src)}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      <Lightbox
        items={lightboxItems}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </div>
  );
}
