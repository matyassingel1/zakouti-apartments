"use client";

import { useState, useTransition } from "react";
import { Upload, Loader2, FileText, Check } from "lucide-react";
import type { Settings } from "@/lib/data";
import { saveSettingsAction } from "@/app/admin/actions";

const input = "w-full border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-gold-500";

async function uploadPdf(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("prefix", "standardy");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("upload");
  const { url } = await res.json();
  return url as string;
}

export function NastaveniForm({ settings }: { settings: Settings }) {
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [telefon, setTelefon] = useState(settings.telefon);
  const [email, setEmail] = useState(settings.email);
  const [emailDruhy, setEmailDruhy] = useState(settings.email_druhy);
  const [pdf, setPdf] = useState<string | null>(settings.standardy_pdf);

  async function onPdf(file: File) {
    setBusy(true);
    setError(null);
    try {
      setPdf(await uploadPdf(file));
    } catch {
      setError("Nahrání PDF selhalo.");
    } finally {
      setBusy(false);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    start(async () => {
      await saveSettingsAction({ telefon, email, email_druhy: emailDruhy, standardy_pdf: pdf });
      setSaved(true);
    });
  }

  return (
    <form onSubmit={submit} className="max-w-xl space-y-6">
      <div className="border border-line bg-pure p-6">
        <p className="eyebrow mb-4">Kontakt makléřky</p>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs text-stone">Telefon</label>
            <input className={input} value={telefon} onChange={(e) => setTelefon(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">E-mail</label>
            <input className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">Druhý e-mail</label>
            <input className={input} value={emailDruhy} onChange={(e) => setEmailDruhy(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="border border-line bg-pure p-6">
        <p className="eyebrow mb-4">PDF standardů</p>
        <div className="flex items-center gap-4">
          {pdf && (
            <a href={pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-gold-900">
              <FileText size={16} /> Aktuální PDF
            </a>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 border border-line bg-paper px-4 py-2.5 text-sm text-ink hover:border-gold-300">
            {busy ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            {pdf ? "Změnit PDF" : "Nahrát PDF"}
            <input type="file" accept="application/pdf" className="hidden" disabled={busy} onChange={(e) => e.target.files?.[0] && onPdf(e.target.files[0])} />
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-gold-900">{error}</p>}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending || busy} className="btn-gold btn-gold--solid">
          {pending ? <><Loader2 size={16} className="animate-spin" /> Ukládám…</> : "Uložit nastavení"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-gold-900">
            <Check size={16} /> Uloženo
          </span>
        )}
      </div>
    </form>
  );
}
