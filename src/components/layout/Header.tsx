"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV, site } from "@/data/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (menuOpen) return;
    setHidden(y > prev && y > 320);
  });

  const transparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          transparent
            ? "bg-transparent"
            : "border-b border-line bg-paper/90 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 sm:px-8 lg:px-[clamp(2rem,7vw,9rem)] lg:py-5">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none" aria-label="Zákoutí Apartments — domů">
            <span
              className={cn(
                "font-display text-2xl font-medium tracking-tight transition-colors md:text-[1.7rem]",
                transparent ? "text-paper" : "text-ink"
              )}
            >
              ZÁKOUTÍ
            </span>
            <span
              className={cn(
                "mono mt-0.5 text-[0.58rem] tracking-[0.22em] transition-colors",
                transparent ? "text-paper/70" : "text-stone"
              )}
            >
              APARTMENTS · ORLICKÉ HORY
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "link-underline text-[0.95rem] font-medium transition-colors",
                    transparent ? "text-paper/90 hover:text-paper" : "text-ink/80 hover:text-ink",
                    active && "after:scale-x-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt/"
              className={cn("btn-gold ml-2", transparent && "border-paper/70 text-paper")}
            >
              Mám zájem
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Otevřít menu"
            aria-expanded={menuOpen}
            className={cn(
              "flex h-10 w-10 items-center justify-center lg:hidden",
              transparent ? "text-paper" : "text-ink"
            )}
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-display text-2xl font-medium text-ink">ZÁKOUTÍ</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Zavřít menu"
                className="flex h-10 w-10 items-center justify-center text-ink"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>
            <div className="hairline-gold mx-6" />
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-4xl font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + NAV.length * 0.06, duration: 0.5, ease: EASE }}
                className="mt-8"
              >
                <Link href="/kontakt/" onClick={() => setMenuOpen(false)} className="btn-gold btn-gold--solid">
                  Mám zájem
                </Link>
                <p className="mono mt-6 text-xs text-stone">{site.makler.telefon}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
