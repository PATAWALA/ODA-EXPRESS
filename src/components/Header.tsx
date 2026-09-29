import { Container } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-navy-900 via-navy-700 to-express-600 text-white shadow-sm">
            <Container className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="leading-tight">
            <span className="block text-[14.5px] font-bold tracking-tight text-navy-900">
              ODA SOURCES
            </span>
            <span className="block text-[10.5px] font-medium uppercase tracking-wider text-zinc-500">
              Import & Export
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-600 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-express-500" />
          Chine
          <span className="text-zinc-300">→</span>
          Afrique
        </div>

        <a
          href="#catalogue"
          className="rounded-full bg-gradient-to-br from-navy-900 to-navy-700 px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:shadow-md"
        >
          Soumettre un projet
        </a>
      </div>
    </header>
  );
}