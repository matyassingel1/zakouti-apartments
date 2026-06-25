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
 * Měkký teplý „nádech" v pozadí — místo topografických čar (přání klientky).
 * Dvě sotva patrné zlaté/krémové gradientní záře, jemný parallax při scrollu.
 * Props (opacity/drift/flip) zůstávají — beze změny volání napříč webem.
 * ------------------------------------------------------------------ */

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
  // Přemapuj jemné opacity z čar (0.12–0.16) na čitelnou, ale stále decentní záři.
  const intensity = Math.min(0.6, opacity * 4);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y, opacity: intensity, transform: flip ? "scaleX(-1)" : undefined }}
      >
        <div
          className="absolute -left-[14%] top-[-25%] h-[75vh] w-[75vh] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle at center, var(--color-gold-300), transparent 68%)" }}
        />
        <div
          className="absolute -right-[16%] bottom-[-28%] h-[68vh] w-[68vh] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle at center, var(--color-gold-100), transparent 70%)" }}
        />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Měkká zlatá záře v rohu sekce (dříve soustředné prstence) — bez čar.
 * ------------------------------------------------------------------ */
export function TopoRings({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-[80px]", className)}
      style={{ background: "radial-gradient(circle at center, var(--color-gold-300), transparent 72%)" }}
    />
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
