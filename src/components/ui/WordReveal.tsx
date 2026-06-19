"use client";

import { createElement, type ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface WordRevealProps {
  text: string;
  className?: string;
  /** mark these words (lowercase, no punctuation) as italic+gold emphasis */
  emphasize?: string[];
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Per-word masked reveal. Never per-character (would break Czech diakritika).
 * Maska má rezervu nahoře i dole, aby neořízla háčky a descendery.
 */
export function WordReveal({
  text,
  className,
  emphasize = [],
  delay = 0,
  as = "h2",
}: WordRevealProps) {
  const words = text.split(" ");
  const emph = new Set(emphasize.map((w) => w.toLowerCase()));

  const inner = words.map((word, i) => {
    const clean = word.replace(/[.,!?„"»«:;]/g, "").toLowerCase();
    const isEmph = emph.has(clean);
    return (
      <span key={i} className="word-mask mr-[0.25em]" aria-hidden="true">
        <motion.span
          className={isEmph ? "serif-italic text-gold-700" : undefined}
          style={{ display: "inline-block" }}
          initial={{ y: "115%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.75, ease: EASE, delay: delay + i * 0.06 }}
        >
          {word}
        </motion.span>
      </span>
    );
  });

  return createElement(as, { className, "aria-label": text }, inner);
}

export function Eyebrow({
  children,
  dot = false,
  className = "",
}: {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2.5 ${className}`}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-700" />
        </span>
      )}
      {children}
    </span>
  );
}
