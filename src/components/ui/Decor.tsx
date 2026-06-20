"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Topografické vrstevnice — podpisový motiv (hory = contour lines).
 * Vrstvy zlatých „hřebenů" se jemně posouvají při scrollu (parallax).
 * ------------------------------------------------------------------ */

const VW = 1440;
const VH = 600;

function buildRidge(baseY: number, amp: number, phase: number, freq: number): string {
  const step = 48;
  let d = "";
  for (let x = 0; x <= VW; x += step) {
    const t = x / VW;
    const y =
      baseY +
      Math.sin(t * Math.PI * freq + phase) * amp +
      Math.cos(t * Math.PI * freq * 1.8 + phase * 1.4) * amp * 0.4;
    d += x === 0 ? `M${x},${y.toFixed(1)}` : ` L${x},${y.toFixed(1)}`;
  }
  return d;
}

// Hustá sada vrstevnic přes celou výšku — topografická textura.
const RIDGES = Array.from({ length: 16 }, (_, i) =>
  buildRidge(20 + i * 38, 20 + (i % 4) * 4, i * 0.55, 2.4 + (i % 3) * 0.8)
);

interface ContourFieldProps {
  className?: string;
  opacity?: number;
  /** parallax intenzita (0 = bez pohybu) */
  drift?: number;
  flip?: boolean;
}

export function ContourField({
  className,
  opacity = 0.16,
  drift = 8,
  flip = false,
}: ContourFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${drift}%`, `-${drift}%`]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.svg
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        preserveAspectRatio="none"
        className="h-[120%] w-full"
        style={{ y, opacity, transform: flip ? "scaleX(-1)" : undefined }}
      >
        {RIDGES.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="var(--color-gold-500)"
            strokeWidth={1.1}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </motion.svg>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Topografické soustředné prstence (jako vrchol na mapě) — roh sekce.
 * ------------------------------------------------------------------ */
export function TopoRings({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute", className)}>
      <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx={200 + i * 4}
            cy={200 - i * 3}
            rx={40 + i * 22}
            ry={32 + i * 18}
            stroke="var(--color-gold-500)"
            strokeWidth={1}
            opacity={0.5 - i * 0.05}
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Aurora — měkké zlaté světlo pro tmavé sekce (ať „dýchají").
 * ------------------------------------------------------------------ */
export function Aurora({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute -left-[15%] top-[-10%] h-[55vh] w-[55vh] rounded-full bg-gold-500/20 blur-[130px]"
        animate={reduce ? undefined : { x: [0, 70, 0], y: [0, 40, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] h-[48vh] w-[48vh] rounded-full bg-gold-700/15 blur-[130px]"
        animate={reduce ? undefined : { x: [0, -60, 0], y: [0, -30, 0], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetické tlačítko — element-local tah ≤ 6 px (povoleno).
 * ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  const clamp = (v: number) => Math.max(-6, Math.min(6, v));

  return (
    <motion.span
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
