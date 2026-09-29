import { Container, Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import { EMAIL, PHONE_DISPLAY, WHATSAPP } from "@/data/odaData";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-100 bg-gradient-to-b from-white to-navy-50/50 px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-navy-900 via-navy-700 to-express-600 text-white shadow-sm">
              <Container className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="leading-tight">
              <span className="block text-[14px] font-bold tracking-tight text-navy-900">
                ODA SOURCES
              </span>
              <span className="block text-[10.5px] font-medium uppercase tracking-wider text-zinc-500">
                Import & Export
              </span>
            </span>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-zinc-500">
            Sourcing · Inspection usine · Fret maritime Chine — Afrique
          </p>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-navy-900">
            Navigation
          </p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/" className="text-[12.5px] text-zinc-500 transition hover:text-navy-900">Accueil</Link></li>
            <li><Link href="/#catalogue" className="text-[12.5px] text-zinc-500 transition hover:text-navy-900">Catalogue</Link></li>
            <li><Link href="/maritime" className="text-[12.5px] text-zinc-500 transition hover:text-navy-900">Maritime</Link></li>
            <li><Link href="/actualites" className="text-[12.5px] text-zinc-500 transition hover:text-navy-900">Actualités</Link></li>
            <li><Link href="/a-propos" className="text-[12.5px] text-zinc-500 transition hover:text-navy-900">À propos</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-navy-900">
            Services
          </p>
          <ul className="mt-3 space-y-2 text-[12.5px] text-zinc-500">
            <li>Sourcing 1688 / Taobao</li>
            <li>Inspection usine</li>
            <li>Groupage maritime</li>
            <li>Conteneur complet</li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-navy-900">
            Contact
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-navy-900 transition hover:text-express-600"
              >
                <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.75} />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-[12px] text-zinc-500 transition hover:text-navy-900"
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-zinc-100 pt-6 text-center">
        <p className="text-[11px] text-zinc-400">
          © {new Date().getFullYear()} ODA SOURCES · Guangzhou, Chine
        </p>
      </div>
    </footer>
  );
}