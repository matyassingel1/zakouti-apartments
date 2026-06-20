import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getApartmentById } from "@/lib/data";
import { ApartmanForm } from "@/components/admin/ApartmanForm";

export const dynamic = "force-dynamic";

export default async function EditApartman({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apt = await getApartmentById(Number(id));
  if (!apt) notFound();

  return (
    <div>
      <Link href="/admin/apartmany" className="mono inline-flex items-center gap-2 text-xs text-stone hover:text-ink">
        <ArrowLeft size={14} /> Zpět na apartmány
      </Link>
      <h1 className="mt-4 font-display text-4xl font-medium text-ink">
        Apartmán {apt.oznaceni} · {apt.dispozice}
      </h1>
      <div className="mt-8">
        <ApartmanForm apartman={apt} />
      </div>
    </div>
  );
}
