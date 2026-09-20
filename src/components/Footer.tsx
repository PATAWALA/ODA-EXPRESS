import { EMAIL, PHONE, WHATSAPP } from "@/data/oda";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-zinc-100 px-5 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-[13px] font-semibold tracking-tight text-zinc-900">
            ODA Express
          </p>
          <p className="mt-1 text-[12px] text-zinc-500">
            Sourcing & Fret Chine — Afrique · Guangzhou
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 sm:items-end">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] font-medium text-zinc-700 transition hover:text-zinc-900"
          >
            {PHONE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[12px] text-zinc-500 transition hover:text-zinc-900"
          >
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