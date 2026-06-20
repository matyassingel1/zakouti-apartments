import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Přeskočit na obsah
      </a>
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />
      <Header />
      <main id="obsah" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
