"use client";

import { motion } from "framer-motion";
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
  priority?: boolean;
  sizes?: string;
}

/**
 * Plain <img> through asset() (GitHub Pages basePath-safe) with an inner
 * scale + clip-path reveal. object-cover by default.
 */
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  reveal = true,
  priority = false,
}: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="h-full w-full"
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
