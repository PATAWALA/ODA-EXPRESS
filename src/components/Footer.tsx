import { Mail, MapPin, Package, PhoneCall } from "lucide-react";
import {
  AFRICA_DESTINATIONS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  SERVICES,
  WAREHOUSE_ADDRESS,
  WHATSAPP_NUMBER,
} from "@/data/odaData";

const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Devis express", href: "#devis" },
  { label: "Suivi de colis", href: "#suivi" },
  { label: "Pourquoi Mr ODA", href: "#confiance" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marque */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-900">
                <Package className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[15px] font-bold tracking-tight text-white">
                  ODA EXPRESS
                </span>
                <span className="block text-[11px] font-medium text-slate-400">
                  Sourcing & Fret Chine — Afrique
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[13px] leading-relaxed">
              Sourcing fournisseur, inspection qualité en usine et fret aérien ou
              maritime vers 12 pays d&apos;Afrique. Un seul interlocuteur, basé
              physiquement à Guangzhou.
            </p>

            <p className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              {WAREHOUSE_ADDRESS}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[13px] font-medium transition hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-[12px] font-bold uppercase tracking-[0.14em] text-white">
              Accès rapide
            </h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] font-medium transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">
              Zones desservies
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-3">
              {AFRICA_DESTINATIONS.map((entry) => (
                <li key={entry.country} className="text-[13px] font-medium">
                  <span className="block text-slate-200">{entry.country}</span>
                  <span className="mt-0.5 block text-[11.5px] text-slate-500">
                    {entry.cities.slice(0, 2).join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">
              Contact direct
            </h3>

            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[13px] font-medium transition hover:text-white"
                >
                  <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span>
                    <span className="block text-slate-200">{CONTACT_PHONE_DISPLAY}</span>
                    <span className="mt-0.5 block text-[11.5px] text-slate-500">
                      WhatsApp · réponse en moins de 30 min
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-3 text-[13px] font-medium transition hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span className="block text-slate-200">{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>

            <a
              href="#devis"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-[13.5px] font-semibold text-white transition hover:bg-brand-700"
            >
              Démarrer une demande qualifiée
            </a>
          </div>
        </div>

        {/* Barre légale */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] font-medium">
            © {new Date().getFullYear()} ODA EXPRESS — Mr ODA. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium">
            <span>Sourcing · Inspection · Fret international</span>
            <a href="#confiance" className="transition hover:text-white">
              Mentions légales
            </a>
            <a href="#services" className="transition hover:text-white">
              Conditions de transport
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}