import { Mail, Phone } from "lucide-react";
import { listInquiries } from "@/lib/data";
import { PoptavkaActions } from "@/components/admin/PoptavkaActions";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPoptavky() {
  const inquiries = await listInquiries();

  return (
    <div>
      <h1 className="font-display text-4xl font-medium text-ink">Poptávky</h1>
      <p className="mt-2 text-stone">{inquiries.length} celkem</p>

      {inquiries.length === 0 ? (
        <div className="mt-8 border border-line bg-pure p-12 text-center text-stone">
          Zatím nedorazily žádné poptávky.
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {inquiries.map((q) => (
            <li
              key={q.id}
              className={`border bg-pure p-5 ${q.stav === "Nová" ? "border-gold-300" : "border-line opacity-80"}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-display text-xl text-ink">{q.jmeno}</p>
                    <span
                      className={`mono text-[0.62rem] uppercase tracking-[0.12em] ${q.stav === "Nová" ? "text-gold-900" : "text-stone"}`}
                    >
                      {q.stav}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-stone">
                    {q.apartman_label ?? "Obecná poptávka"} · {formatDate(q.datum)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    <a href={`tel:${q.telefon}`} className="inline-flex items-center gap-1.5 text-ink hover:text-gold-900">
                      <Phone size={14} className="text-gold-700" /> {q.telefon}
                    </a>
                    <a href={`mailto:${q.email}`} className="inline-flex items-center gap-1.5 text-ink hover:text-gold-900">
                      <Mail size={14} className="text-gold-700" /> {q.email}
                    </a>
                  </div>
                  {q.zprava && (
                    <p className="mt-3 max-w-xl border-l-2 border-line pl-3 text-sm text-stone">{q.zprava}</p>
                  )}
                </div>
                <PoptavkaActions id={q.id} stav={q.stav} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
