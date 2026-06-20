"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Tenká zlatá linka nahoře — wayfinding / scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[56] h-[2px] origin-left bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700"
    />
  );
}
