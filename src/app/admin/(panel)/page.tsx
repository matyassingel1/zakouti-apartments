import Link from "next/link";
import { Building2, Inbox, KeyRound, ArrowRight } from "lucide-react";
import { dashboardStats, listInquiries } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await dashboardStats();
  const inquiries = (await listInquiries()).slice(0, 5);

  const cards = [
    { label: "Apartmány", value: stats.apartmany, sub: `${stats.volne} volných`, href: "/admin/apartmany", icon: Building2 },
    { label: "Nové poptávky", value: stats.novePoptavky, sub: "k vyřízení", href: "/admin/poptavky", icon: Inbox },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-medium text-ink">Přehled</h1>
      <p className="mt-2 text-stone">Vítejte v administraci Zákoutí Apartments.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group flex items-center justify-between border border-line bg-pure p-6 transition-colors hover:border-gold-300"
          >
            <div>
              <p className="eyebrow">{c.label}</p>
              <p className="mt-2 font-display text-5xl text-ink">{c.value}</p>
              <p className="mt-1 text-sm text-stone">{c.sub}</p>
            </div>
            <c.icon size={36} strokeWidth={1.2} className="text-gold-500" />
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-line bg-pure">
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="font-display text-xl text-ink">Poslední poptávky</h2>
          <Link href="/admin/poptavky" className="flex items-center gap-1.5 text-sm text-gold-900">
            Vše <ArrowRight size={15} />
          </Link>
        </div>
        {inquiries.length === 0 ? (
          <p className="p-5 text-sm text-stone">Zatím žádné poptávky.</p>
        ) : (
          <ul className="divide-y divide-line">
            {inquiries.map((q) => (
              <li key={q.id} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-ink">{q.jmeno}</p>
                  <p className="text-sm text-stone">
                    {q.apartman_label ?? "Obecná poptávka"} · {q.telefon}
                  </p>
                </div>
                <span
                  className={`mono text-xs uppercase tracking-wider ${q.stav === "Nová" ? "text-gold-900" : "text-stone"}`}
                >
                  {q.stav}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mono mt-8 flex items-center gap-2 text-xs text-stone">
        <KeyRound size={13} /> Heslo a databázi spravujete v proměnných prostředí na Vercelu.
      </p>
    </div>
  );
}
