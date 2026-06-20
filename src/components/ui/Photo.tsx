"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** clip-path reveal on scroll-in */
  reveal?: boolean;
  /** slow vertical parallax on scroll */
  parallax?: boolean;
  priority?: boolean;
  sizes?: string;
}

/**
 * Plain <img> through asset() (GitHub Pages basePath-safe) with an inner
 * scale + clip-path reveal and optional scroll parallax. object-cover by default.
 */
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  reveal = true,
  parallax = false,
  priority = false,
}: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className={parallax ? "h-[116%] w-full" : "h-full w-full"}
        style={parallax ? { y } : undefined}
        initial={reveal ? { clipPath: "inset(0 0 18% 0)", scale: 1.08, opacity: 0.4 } : false}
        whileInView={reveal ? { clipPath: "inset(0 0 0% 0)", scale: 1, opacity: 1 } : undefined}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1, ease: EASE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(src)}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}
