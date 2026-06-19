"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

export interface LightboxItem {
  src: string;
  alt: string;
  popis?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Prohlížeč fotografií"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Zavřít"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-paper transition-colors hover:text-gold-300 md:right-8 md:top-8"
          >
            <X size={26} strokeWidth={1.5} />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Předchozí fotografie"
                className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center text-paper transition-colors hover:text-gold-300 md:left-8"
              >
                <ChevronLeft size={34} strokeWidth={1.2} />
              </button>
              <button
                onClick={next}
                aria-label="Další fotografie"
                className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center text-paper transition-colors hover:text-gold-300 md:right-8"
              >
                <ChevronRight size={34} strokeWidth={1.2} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              className="flex max-h-full max-w-5xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(current.src)}
                alt={current.alt}
                className="max-h-[78vh] w-auto max-w-full object-contain"
              />
              <figcaption className="mono mt-4 flex items-center gap-4 text-xs text-paper/70">
                <span>{current.popis ?? current.alt}</span>
                {items.length > 1 && (
                  <span className="text-gold-300">
                    {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
