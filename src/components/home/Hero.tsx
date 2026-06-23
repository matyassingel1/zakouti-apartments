"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { asset } from "@/lib/asset";
import { fixWidows } from "@/lib/utils";
import { HeroRidge } from "@/components/ui/GoldRidge";
import { Magnetic } from "@/components/ui/Decor";
import { Eyebrow } from "@/components/ui/WordReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const headline = ["Moderní", "bydlení", "v", "srdci", "Orlických", "hor"];

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* Foto */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
        <motion.img
          src={asset("/foto/budova.jpg")}
          alt="Vizualizace bytového domu Zákoutí — bílá fasáda, dřevěné balkony, břidlicová střecha a kamenná podnož."
          className="h-full w-full object-cover"
          fetchPriority="high"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Scrim: tmavý nahoře (header) + levý dolní roh (text) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-transparent" />
      <div className="media-scrim pointer-events-none absolute inset-0" />
      {/* Cinematická vinětace */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px 60px rgba(28,27,23,0.55)" }}
      />
      {/* Pomalé zlaté světlo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-[5%] h-[60vh] w-[60vh] rounded-full bg-gold-300/20 blur-[120px]"
        animate={reduce ? undefined : { opacity: [0.25, 0.5, 0.25], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Zlatý hřeben — podpis */}
      <HeroRidge />

      {/* Obsah */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-0 z-20 flex items-end"
      >
        <div className="mx-auto w-full max-w-[1500px] px-6 pb-20 sm:px-8 lg:px-[clamp(2rem,7vw,9rem)] lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Eyebrow dot className="text-gold-300">
              Deštné v Orlických horách · Dokončení 2027
            </Eyebrow>
          </motion.div>

          <h1 className="mt-6 max-w-4xl text-display-1 text-paper">
            {headline.map((w, i) => (
              <span key={i} className="word-mask mr-[0.22em]">
                <motion.span
                  className={w === "srdci" ? "serif-italic text-gold-300" : "inline-block"}
                  style={{ display: "inline-block" }}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.08 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hairline-gold mt-8 max-w-md"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          />

          <motion.p
            className="mt-8 max-w-xl text-lead text-paper/90"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
          >
            {fixWidows(
              "Nové moderní apartmány v Deštném v Orlických horách — ideální pro zimu, léto i dlouhodobý investiční záměr."
            )}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
          >
            <Magnetic>
              <Link href="/apartmany/" className="btn-gold btn-gold--solid">
                Prohlédnout apartmány
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/kontakt/" className="btn-gold border-paper/70 text-paper">
                Domluvit prohlídku
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-paper/70"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown size={26} strokeWidth={1.2} />
      </motion.div>
    </section>
  );
}
