import { Container, Mail, PhoneCall } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, WHATSAPP } from "@/data/odaData";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-100 bg-gradient-to-b from-white to-navy-50/50 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between sm:text-left">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center gap-2.5 sm:justify-start">
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
          <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
            Sourcing · Inspection usine · Fret maritime Chine — Afrique
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-navy-900 transition hover:text-express-600"
          >
            <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.75} />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 text-[12px] text-zinc-500 transition hover:text-navy-900"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
            {EMAIL}
          </a>
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