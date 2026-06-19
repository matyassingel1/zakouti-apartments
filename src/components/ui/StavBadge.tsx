import type { Stav } from "@/data/apartments";
import { cn } from "@/lib/utils";

const STYLES: Record<Stav, string> = {
  Volný: "bg-gold-100 text-gold-900 border-gold-300",
  Rezervováno: "bg-[#F5EAD6] text-[#8A6D1E] border-[#E3CF9E]",
  Prodáno: "bg-line/60 text-stone border-line",
};

export function StavBadge({ stav, className }: { stav: Stav; className?: string }) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.12em]",
        STYLES[stav],
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          stav === "Volný" && "bg-gold-700",
          stav === "Rezervováno" && "bg-[#B8901F]",
          stav === "Prodáno" && "bg-stone"
        )}
      />
      {stav}
    </span>
  );
}
