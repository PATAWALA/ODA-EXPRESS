import Link from "next/link";
import { Mail, MapPin, PhoneCall, Clock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Produits", href: "/produits" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Actualités", href: "/actualites" },
  { label: "S'abonner", href: "/newsletter" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  "Global Sourcing & Achat",
  "Vérification & Contrôle Qualité",
  "Shipping & Logistique",
  "Assistance Visa & Hôtel",
  "Paiement Fournisseur",
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-navy-950 text-white">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-16 lg:py-20">
          {/* Colonne 1 : identité */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo/logo-white-1920.png"
              alt="ODA Sources"
              className="h-auto w-[180px]"
            />

            <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-navy-200">
              Votre partenaire stratégique pour vos opérations en Chine.
              Sourcing, contrôle qualité, shipping et accompagnement complet.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-2xl border border-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                Chine 🇨🇳
              </span>
            </div>
          </div>

          {/* Colonne 2 : navigation */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-express-400">
              Navigation
            </p>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-navy-200 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : services */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-express-400">
              Nos services
            </p>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-[13px] text-navy-200 transition hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : contact */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-express-400">
              Contact direct
            </p>

            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="https://wa.me/8619515660197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-[13px] text-navy-200 transition hover:text-white"
                >
                  <PhoneCall
                    className="mt-0.5 h-4 w-4 shrink-0 text-express-400"
                    strokeWidth={1.75}
                  />
                  <span>
                    <span className="block font-semibold text-white">
                      +86 195 1566 0197
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-navy-300">
                      WhatsApp · réponse sous 24 h
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:odaxpress10@gmail.com"
                  className="flex items-start gap-3 text-[13px] text-navy-200 transition hover:text-white"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-express-400"
                    strokeWidth={1.75}
                  />
                  <span>odaxpress10@gmail.com</span>
                </a>
              </li>

              <li className="flex items-start gap-3 text-[13px] text-navy-200">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-express-400"
                  strokeWidth={1.75}
                />
                <span>Chine 🇨🇳</span>
              </li>

              <li className="flex items-start gap-3 text-[13px] text-navy-200">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-express-400"
                  strokeWidth={1.75}
                />
                <span>Lundi au samedi · 9h — 19h</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:border-white/50 hover:bg-white/5"
            >
              Se faire accompagner
              <ArrowUpRight
                className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>

        {/* Barre légale */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-navy-300">
            © {new Date().getFullYear()} ODA SOURCES IMPORT & EXPORT CO.,
            LIMITED.{" "}
            <Link
              href="/admin"
              className="transition hover:text-white"
            >
              Tous droits réservés.
            </Link>
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11.5px] text-navy-300">
            <Link href="/mentions-legales" className="transition hover:text-white">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition hover:text-white">
              Confidentialité
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}