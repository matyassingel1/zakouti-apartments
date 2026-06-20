"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  id,
  label = "Smazat",
  confirmText = "Opravdu smazat?",
}: {
  action: (id: number) => Promise<void>;
  id: number;
  label?: string;
  confirmText?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(confirmText)) start(() => action(id));
      }}
      className="inline-flex items-center gap-1.5 text-sm text-stone transition-colors hover:text-[#a33] disabled:opacity-50"
    >
      <Trash2 size={15} /> {pending ? "Mažu…" : label}
    </button>
  );
}
