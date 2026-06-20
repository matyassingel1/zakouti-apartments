import { getSettings } from "@/lib/data";
import { NastaveniForm } from "@/components/admin/NastaveniForm";

export const dynamic = "force-dynamic";

export default async function AdminNastaveni() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-display text-4xl font-medium text-ink">Nastavení</h1>
      <p className="mt-2 text-stone">Kontakt makléřky a PDF standardů ke stažení.</p>
      <div className="mt-8">
        <NastaveniForm settings={settings} />
      </div>
    </div>
  );
}
