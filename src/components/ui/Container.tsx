import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Editorial shell: generous outer gutters (~8vw desktop), capped width. */
export function Container({
  children,
  className,
  size = "normal",
}: {
  children: ReactNode;
  className?: string;
  size?: "tight" | "normal" | "wide";
}) {
  const max =
    size === "tight" ? "max-w-3xl" : size === "wide" ? "max-w-[1500px]" : "max-w-[1320px]";
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8 lg:px-[clamp(2rem,7vw,9rem)]", max, className)}>
      {children}
    </div>
  );
}
