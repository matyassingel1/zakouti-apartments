"use client";

import { useTransition } from "react";
import { Check, RotateCcw, Trash2 } from "lucide-react";
import { setPoptavkaStavAction, deletePoptavkaAction } from "@/app/admin/actions";

export function PoptavkaActions({ id, stav }: { id: number; stav: "Nová" | "Vyřízená" }) {
  const [pending, start] = useTransition();
  const next = stav === "Nová" ? "Vyřízená" : "Nová";

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={pending}
        onClick={() => start(() => setPoptavkaStavAction(id, next))}
        className="inline-flex items-center gap-1.5 text-sm text-gold-900 hover:text-gold-700 disabled:opacity-50"
      >
        {stav === "Nová" ? <><Check size={15} /> Vyřídit</> : <><RotateCcw size={15} /> Znovu otevřít</>}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm("Smazat poptávku?")) start(() => deletePoptavkaAction(id));
        }}
        className="inline-flex items-center gap-1.5 text-sm text-stone hover:text-[#a33] disabled:opacity-50"
        aria-label="Smazat"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
