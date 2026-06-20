import { listMedia } from "@/lib/data";
import { GalerieManager } from "@/components/admin/GalerieManager";

export const dynamic = "force-dynamic";

export default async function AdminGalerie() {
  const items = await listMedia();
  return (
    <div>
      <h1 className="font-display text-4xl font-medium text-ink">Galerie</h1>
      <p className="mt-2 text-stone">{items.length} fotografií · zobrazují se na stránce Galerie.</p>
      <div className="mt-8">
        <GalerieManager items={items} />
      </div>
    </div>
  );
}
