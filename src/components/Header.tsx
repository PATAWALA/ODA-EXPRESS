import { WHATSAPP } from "@/data/oda";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Devis", href: "#devis" },
  { label: "Suivi", href: "#suivi" },
  { label: "Pourquoi nous", href: "#confiance" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <a href="#top" className="text-[14px] font-semibold tracking-tight text-zinc-900">
          ODA Express
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
          className="rounded-full bg-zinc-900 px-4 py-2 text-[12.5px] font-medium text-white transition hover:bg-zinc-800"
        >
          Démarrer
        </a>
      </div>
    </header>
  );
}