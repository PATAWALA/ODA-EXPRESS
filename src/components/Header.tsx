import { Package } from "lucide-react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Devis", href: "#devis" },
  { label: "Suivi", href: "#suivi" },
  { label: "Pourquoi nous", href: "#confiance" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 via-fuchsia-500 to-blue-900 text-white shadow-sm">
            <Package className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="text-[14px] font-semibold tracking-tight text-zinc-900">
            ODA Express
          </span>
        </a>

        <nav className="hidden items-center gap-7 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12.5px] font-medium text-zinc-500 transition hover:text-zinc-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#devis"
          className="rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-blue-900 px-4 py-2 text-[12.5px] font-medium text-white shadow-sm transition hover:shadow-md"
        >
          Démarrer
        </a>
      </div>
    </header>
  );
}