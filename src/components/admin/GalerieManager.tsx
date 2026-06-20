"use client";

import { useState, useTransition } from "react";
import { Upload, Trash2, Loader2 } from "lucide-react";
import type { MediaRecord } from "@/lib/data";
import type { GalerieKategorie } from "@/data/gallery";
import { addMediaAction, deleteMediaAction } from "@/app/admin/actions";

const KATEGORIE: GalerieKategorie[] = ["Vizualizace", "Interiér", "Okolí"];

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("prefix", "galerie");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("upload");
  const { url } = await res.json();
  return url as string;
}

export function GalerieManager({ items }: { items: MediaRecord[] }) {
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kategorie, setKategorie] = useState<GalerieKategorie>("Interiér");
  const [alt, setAlt] = useState("");
  const [sirsi, setSirsi] = useState(false);

  async function onUpload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const src = await uploadFile(file);
      start(() => addMediaAction({ src, alt, kategorie, sirsi, poradi: items.length }));
      setAlt("");
      setSirsi(false);
    } catch {
      setError("Nahrání selhalo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* Přidání */}
      <div className="border border-line bg-pure p-5">
        <p className="eyebrow mb-4">Přidat fotografii</p>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
          <div>
            <label className="mb-1.5 block text-xs text-stone">Popis (alt)</label>
            <input
              className="w-full border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-gold-500"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Popis fotografie"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">Kategorie</label>
            <select
              className="border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-gold-500"
              value={kategorie}
              onChange={(e) => setKategorie(e.target.value as GalerieKategorie)}
            >
              {KATEGORIE.map((k) => <option key={k}>{k}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 pb-2.5 text-sm text-ink">
            <input type="checkbox" className="h-4 w-4 accent-[var(--color-gold-700)]" checked={sirsi} onChange={(e) => setSirsi(e.target.checked)} />
            Širší
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 border border-line bg-paper px-4 py-2.5 text-sm text-ink hover:border-gold-300">
            {busy || pending ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            Nahrát
            <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
          </label>
        </div>
        {error && <p className="mt-3 text-sm text-gold-900">{error}</p>}
      </div>

      {/* Mřížka */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((m) => (
          <div key={m.id} className="group relative overflow-hidden border border-line bg-pure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={m.alt} className="aspect-[4/3] w-full object-cover" />
            <div className="flex items-center justify-between p-2.5">
              <span className="mono text-[0.6rem] uppercase tracking-wider text-stone">{m.kategorie}</span>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Odebrat z galerie?")) start(() => deleteMediaAction(m.id));
                }}
                className="text-stone hover:text-[#a33]"
                aria-label="Odebrat"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
