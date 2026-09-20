import { Mail, Package, PhoneCall } from "lucide-react";

const WHATSAPP = "8619515660197";
const PHONE = "+86 195 1566 0197";
const EMAIL = "odaxpress10@gmail.com";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-zinc-100 bg-gradient-to-b from-white to-zinc-50/60 px-5 py-12"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:flex-row sm:justify-between sm:text-left">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center gap-2.5 sm:justify-start">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-700 text-white">
              <Package className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="text-[13.5px] font-semibold tracking-tight text-zinc-900">
              ODA Express
            </span>
          </div>
          <p className="mt-3 text-[12px] text-zinc-500">
            Sourcing & Fret Chine — Afrique · Guangzhou
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12.5px] font-medium text-zinc-700 transition hover:text-zinc-900"
          >
            <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.75} />
            {PHONE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 text-[12px] text-zinc-500 transition hover:text-zinc-900"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
            {EMAIL}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl border-t border-zinc-100 pt-6 text-center">
        <p className="text-[11.5px] text-zinc-400">
          © {new Date().getFullYear()} ODA Express · Réponse sous 30 minutes
        </p>
      </div>
    </footer>
  );
}