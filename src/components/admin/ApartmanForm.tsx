"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, Loader2 } from "lucide-react";
import type { ApartmanRecord, ApartmanInput } from "@/lib/data";
import type { ApartmanFoto, Dispozice, Podlazi, Stav } from "@/data/apartments";
import { saveApartmanAction } from "@/app/admin/actions";

const DISPOZICE: Dispozice[] = ["Garsoniéra", "1+1", "2+kk", "2+1", "Mezonet"];
const PODLAZI: Podlazi[] = ["I. PP", "I. NP", "II. NP", "III. NP"];
const STAVY: Stav[] = ["Volný", "Rezervováno", "Prodáno"];

async function uploadFile(file: File, prefix: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("prefix", prefix);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("Nahrání selhalo.");
  const { url } = await res.json();
  return url as string;
}

const input =
  "w-full border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-gold-500";
const labelCls = "eyebrow mb-1.5 block";

export function ApartmanForm({ apartman }: { apartman?: ApartmanRecord }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [f, setF] = useState({
    oznaceni: apartman?.oznaceni ?? "",
    slug: apartman?.slug ?? "",
    dispozice: apartman?.dispozice ?? ("2+kk" as Dispozice),
    podlazi: apartman?.podlazi ?? ("I. NP" as Podlazi),
    uzitna_m2: apartman?.uzitna_m2 ?? 0,
    celkova_m2: apartman?.celkova_m2 ?? 0,
    venkovni_m2: apartman?.venkovni_m2 ?? 0,
    sklep_m2: apartman?.sklep_m2 ?? 5,
    cena_kc: apartman?.cena_kc ?? 0,
    stav: apartman?.stav ?? ("Volný" as Stav),
    poradi: apartman?.poradi ?? 0,
    parkovaci_stani: apartman?.parkovaci_stani ?? true,
    popis: apartman?.popis ?? "",
  });
  const [pudorysy, setPudorysy] = useState<string[]>(apartman?.pudorysy ?? []);
  const [fotky, setFotky] = useState<ApartmanFoto[]>(apartman?.fotky ?? []);

  function set<K extends keyof typeof f>(key: K, value: (typeof f)[K]) {
    setF((prev) => ({ ...prev, [key]: value }));
  }

  async function onAddPudorys(file: File) {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadFile(file, "pudorys");
      setPudorysy((prev) => [...prev, url]);
    } catch {
      setError("Nahrání půdorysu selhalo.");
    } finally {
      setUploading(false);
    }
  }

  async function onAddFoto(file: File) {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadFile(file, "foto");
      setFotky((prev) => [...prev, { src: url, alt: "", popis: "" }]);
    } catch {
      setError("Nahrání fotografie selhalo.");
    } finally {
      setUploading(false);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!f.oznaceni.trim() || !f.slug.trim() || !f.popis.trim()) {
      setError("Vyplňte označení, slug a popis.");
      return;
    }
    const payload: ApartmanInput = {
      slug: f.slug.trim(),
      oznaceni: f.oznaceni.trim(),
      dispozice: f.dispozice,
      podlazi: f.podlazi,
      uzitna_m2: Number(f.uzitna_m2),
      celkova_m2: Number(f.celkova_m2),
      venkovni_m2: Number(f.venkovni_m2),
      sklep_m2: Number(f.sklep_m2),
      cena_kc: Number(f.cena_kc),
      stav: f.stav,
      popis: f.popis,
      pudorysy,
      fotky,
      parkovaci_stani: f.parkovaci_stani,
      poradi: Number(f.poradi),
    };
    startTransition(async () => {
      try {
        await saveApartmanAction(apartman?.id ?? null, payload);
      } catch (err) {
        // redirect() vyhazuje speciální chybu — tu musíme propustit dál
        if (err && typeof err === "object" && "digest" in err && String((err as { digest?: string }).digest).startsWith("NEXT_REDIRECT")) {
          throw err;
        }
        setError("Uložení selhalo. Zkuste to prosím znovu.");
      }
    });
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Označení *</label>
          <input className={input} value={f.oznaceni} onChange={(e) => set("oznaceni", e.target.value)} placeholder="A11" />
        </div>
        <div>
          <label className={labelCls}>Slug (URL) *</label>
          <input className={input} value={f.slug} onChange={(e) => set("slug", e.target.value)} placeholder="a11" />
        </div>
        <div>
          <label className={labelCls}>Dispozice *</label>
          <select className={input} value={f.dispozice} onChange={(e) => set("dispozice", e.target.value as Dispozice)}>
            {DISPOZICE.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Podlaží *</label>
          <select className={input} value={f.podlazi} onChange={(e) => set("podlazi", e.target.value as Podlazi)}>
            {PODLAZI.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Užitná plocha (m²) *</label>
          <input type="number" className={input} value={f.uzitna_m2} onChange={(e) => set("uzitna_m2", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelCls}>Celková plocha (m²) *</label>
          <input type="number" className={input} value={f.celkova_m2} onChange={(e) => set("celkova_m2", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelCls}>Balkon / terasa / předzahrádka (m²)</label>
          <input type="number" className={input} value={f.venkovni_m2} onChange={(e) => set("venkovni_m2", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelCls}>Zděný sklep (m²)</label>
          <input type="number" className={input} value={f.sklep_m2} onChange={(e) => set("sklep_m2", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelCls}>Cena bez DPH (Kč) *</label>
          <input type="number" className={input} value={f.cena_kc} onChange={(e) => set("cena_kc", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelCls}>Stav *</label>
          <select className={input} value={f.stav} onChange={(e) => set("stav", e.target.value as Stav)}>
            {STAVY.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Pořadí</label>
          <input type="number" className={input} value={f.poradi} onChange={(e) => set("poradi", Number(e.target.value))} />
        </div>
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2.5 text-sm text-ink">
          <input type="checkbox" className="h-4 w-4 accent-[var(--color-gold-700)]" checked={f.parkovaci_stani} onChange={(e) => set("parkovaci_stani", e.target.checked)} />
          Parkovací stání (1×)
        </label>
      </div>

      <div>
        <label className={labelCls}>Popis *</label>
        <textarea className={input} rows={5} value={f.popis} onChange={(e) => set("popis", e.target.value)} />
      </div>

      {/* Půdorysy (3D) — více pohledů */}
      <div>
        <label className={labelCls}>Půdorysy (3D) — nepovinné</label>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {pudorysy.map((src, i) => (
              <div key={i} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Půdorys ${i + 1}`} className="h-28 w-28 border border-line object-contain bg-pure" />
                <button type="button" onClick={() => setPudorysy((p) => p.filter((_, j) => j !== i))}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-paper text-stone hover:text-[#a33]" aria-label="Odebrat půdorys">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 border border-dashed border-line bg-paper px-4 py-2.5 text-sm text-stone hover:border-gold-300 hover:text-ink">
            <Plus size={15} /> Přidat půdorys
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onAddPudorys(e.target.files[0])} />
          </label>
        </div>
      </div>

      {/* Fotky / vizualizace */}
      <div>
        <label className={labelCls}>Fotografie / vizualizace</label>
        <div className="space-y-3">
          {fotky.map((foto, i) => (
            <div key={i} className="flex items-start gap-3 border border-line bg-pure p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={foto.src} alt="" className="h-16 w-16 shrink-0 border border-line object-cover" />
              <div className="flex-1 space-y-2">
                <input className={input} placeholder="Alt text (popis pro přístupnost)" value={foto.alt}
                  onChange={(e) => setFotky((p) => p.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))} />
                <input className={input} placeholder="Popisek" value={foto.popis}
                  onChange={(e) => setFotky((p) => p.map((x, j) => (j === i ? { ...x, popis: e.target.value } : x)))} />
              </div>
              <button type="button" onClick={() => setFotky((p) => p.filter((_, j) => j !== i))} className="text-stone hover:text-[#a33]" aria-label="Odebrat">
                <X size={18} />
              </button>
            </div>
          ))}
          <label className="inline-flex cursor-pointer items-center gap-2 border border-dashed border-line bg-paper px-4 py-2.5 text-sm text-stone hover:border-gold-300 hover:text-ink">
            <Plus size={15} /> Přidat fotografii
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onAddFoto(e.target.files[0])} />
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-gold-900">{error}</p>}

      <div className="flex items-center gap-4 border-t border-line pt-6">
        <button type="submit" disabled={pending || uploading} className="btn-gold btn-gold--solid">
          {pending ? <><Loader2 size={16} className="animate-spin" /> Ukládám…</> : "Uložit apartmán"}
        </button>
        <button type="button" onClick={() => router.push("/admin/apartmany")} className="text-sm text-stone hover:text-ink">
          Zrušit
        </button>
        {uploading && <span className="mono text-xs text-stone">Nahrávám soubor…</span>}
      </div>
    </form>
  );
}
