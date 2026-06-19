"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Mountain-ridge / topographic silhouette — the site's signature contour.
const RIDGE_PATH =
  "M0,80 C120,78 180,40 280,46 C360,51 410,18 520,30 C610,40 660,8 780,22 C900,36 960,60 1080,52 C1180,46 1240,70 1320,64 C1380,60 1430,74 1440,72";

/** Section divider: the gold ridge draws itself once on scroll-in. */
export function RidgeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        preserveAspectRatio="none"
        className="h-16 w-full md:h-24"
      >
        <motion.path
          d={RIDGE_PATH}
          stroke="var(--color-gold-500)"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </svg>
    </div>
  );
}

/** Hero ridge: scroll-coupled draw + lateral drift (reversible). */
export function HeroRidge() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const length = useTransform(scrollYProgress, [0, 0.4], [0.15, 1]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-[14%] z-10"
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 1440 100"
        fill="none"
        preserveAspectRatio="none"
        className="h-24 w-[116%] md:h-32"
        style={{ x, y }}
      >
        <motion.path
          d={RIDGE_PATH}
          stroke="var(--color-gold-500)"
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{ pathLength: length }}
          opacity={0.85}
        />
      </motion.svg>
    </div>
  );
}

/** Vertical "route" contour for Lokalita — draws on scroll. */
export function RouteRidge({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 120 800"
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <motion.path
          d="M60,0 C30,90 90,160 60,250 C30,340 95,410 58,500 C28,575 88,650 60,740 C52,768 58,786 60,800"
          stroke="var(--color-gold-500)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="1 0"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 2.4, ease: EASE }}
        />
      </svg>
    </div>
  );
}

/** Large faint "Z" monogram watermark. */
export function MonogramZ({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-display leading-none text-gold-500/[0.06] ${className}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      Z
    </span>
  );
}
