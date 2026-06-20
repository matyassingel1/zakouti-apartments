"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Inbox, Images, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Přehled", icon: LayoutDashboard, exact: true },
  { href: "/admin/apartmany", label: "Apartmány", icon: Building2 },
  { href: "/admin/poptavky", label: "Poptávky", icon: Inbox },
  { href: "/admin/galerie", label: "Galerie", icon: Images },
  { href: "/admin/nastaveni", label: "Nastavení", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {ITEMS.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
              active
                ? "border-l-2 border-gold-500 bg-gold-100 text-gold-900"
                : "border-l-2 border-transparent text-stone hover:bg-ivory hover:text-ink"
            )}
          >
            <it.icon size={17} strokeWidth={1.6} />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
