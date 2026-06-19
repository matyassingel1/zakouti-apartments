import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Apartman } from "@/data/apartments";
import { formatCzk, formatArea } from "@/lib/utils";
import { asset } from "@/lib/asset";
import { StavBadge } from "@/components/ui/StavBadge";

export function ApartmentCard({ apt }: { apt: Apartman }) {
  const prodano = apt.stav === "Prodáno";
  return (
    <Link
      href={`/apartmany/${apt.slug}/`}
      className="group flex flex-col border border-line bg-pure transition-all duration-300 hover:-translate-y-2 hover:border-gold-300 hover:shadow-[0_18px_50px_-24px_rgba(124,98,40,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(apt.fotky[0].src)}
          alt={apt.fotky[0].alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4">
          <StavBadge stav={apt.stav} />
        </div>
        <span className="mono absolute right-4 top-4 text-xs text-paper/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
          {apt.oznaceni}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-medium text-ink">Apartmán {apt.dispozice}</h3>
          <span className="mono text-sm text-stone">{formatArea(apt.plocha_m2)}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-stone">
          {apt.podlazi} · {apt.balkon_terasa}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone">Výhled: {apt.vyhled}</p>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <span className={`mono text-lg ${prodano ? "text-stone line-through" : "text-ink"}`}>
            {formatCzk(apt.cena_kc)}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gold-900 transition-colors">
            Detail
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
