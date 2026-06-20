import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApartmanForm } from "@/components/admin/ApartmanForm";

export const dynamic = "force-dynamic";

export default function NewApartman() {
  return (
    <div>
      <Link href="/admin/apartmany" className="mono inline-flex items-center gap-2 text-xs text-stone hover:text-ink">
        <ArrowLeft size={14} /> Zpět na apartmány
      </Link>
      <h1 className="mt-4 font-display text-4xl font-medium text-ink">Nový apartmán</h1>
      <div className="mt-8">
        <ApartmanForm />
      </div>
    </div>
  );
}
