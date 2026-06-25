import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { listApartments } from "@/lib/data";
import { formatCzk, formatArea } from "@/lib/utils";
import { StavBadge } from "@/components/ui/StavBadge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteApartmanAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminApartmany() {
  const apartmany = await listApartments();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl font-medium text-ink">Apartmány</h1>
        <Link href="/admin/apartmany/novy" className="btn-gold btn-gold--solid">
          <Plus size={16} /> Nový apartmán
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-line bg-pure">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b-2 border-gold-700">
              {["Ozn.", "Dispozice", "Podlaží", "Plocha", "Cena", "Stav", "Pořadí", ""].map((h) => (
                <th key={h} className="mono px-4 py-3 text-[0.62rem] uppercase tracking-[0.12em] text-stone">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {apartmany.map((a) => (
              <tr key={a.id} className="hover:bg-ivory">
                <td className="px-4 py-3 font-display text-lg text-gold-700">{a.oznaceni}</td>
                <td className="px-4 py-3 text-sm text-ink">{a.dispozice}</td>
                <td className="px-4 py-3 text-sm text-stone">{a.podlazi}</td>
                <td className="mono px-4 py-3 text-sm text-ink">{formatArea(a.uzitna_m2)}</td>
                <td className="mono px-4 py-3 text-sm text-ink">{formatCzk(a.cena_kc)}</td>
                <td className="px-4 py-3"><StavBadge stav={a.stav} /></td>
                <td className="mono px-4 py-3 text-sm text-stone">{a.poradi}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/apartmany/${a.id}`}
                      className="inline-flex items-center gap-1.5 text-sm text-gold-900 hover:text-gold-700"
                    >
                      <Pencil size={15} /> Upravit
                    </Link>
                    <DeleteButton
                      action={deleteApartmanAction}
                      id={a.id}
                      confirmText={`Smazat apartmán ${a.oznaceni}?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
