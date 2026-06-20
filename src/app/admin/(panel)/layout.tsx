import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin/AdminNav";
import { logoutAction } from "../actions";

export const dynamic = "force-dynamic";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="border-b border-line lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between p-5 lg:block">
            <div>
              <p className="font-display text-2xl font-medium text-ink">ZÁKOUTÍ</p>
              <p className="mono text-[0.58rem] tracking-[0.2em] text-stone">ADMINISTRACE</p>
            </div>
          </div>
          <div className="hairline-gold mx-5 hidden lg:block" />
          <div className="p-3">
            <AdminNav />
          </div>
          <div className="mt-2 space-y-1 border-t border-line p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-stone transition-colors hover:text-ink"
            >
              <ExternalLink size={17} strokeWidth={1.6} /> Zobrazit web
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-stone transition-colors hover:text-ink"
              >
                <LogOut size={17} strokeWidth={1.6} /> Odhlásit se
              </button>
            </form>
          </div>
        </aside>

        {/* Obsah */}
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
