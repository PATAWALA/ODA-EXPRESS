"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  ArrowRight,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Constantes locales ---------- */
const WHATSAPP_NUMBER = "8619515660197";
const CONTACT_PHONE_DISPLAY = "+86 195 1566 0197";
const CONTACT_EMAIL = "odaxpress10@gmail.com";

interface NavLink {
  href: string;
  label: string;
  subtitle: string;
}

const LINKS: NavLink[] = [
  { href: "/", label: "Accueil", subtitle: "Page d'accueil" },
  { href: "/services", label: "Services", subtitle: "Nos 5 pôles d'expertise" },
  { href: "/produits", label: "Produits", subtitle: "Catalogue produits" },
  { href: "/realisations", label: "Réalisations", subtitle: "Galerie de projets" },
  { href: "/actualites", label: "Actualités", subtitle: "Guides & conseils" },
  { href: "/a-propos", label: "À propos", subtitle: "Qui nous sommes" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!open) return null;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <aside
        className="relative flex h-full w-full flex-col bg-white shadow-2xl sm:w-[380px] sm:border-r sm:border-zinc-200"
        style={{
          animation: "oda-slide-in 300ms cubic-bezier(0.32, 0.72, 0, 1) both",
        }}
      >
        {/* En-tête */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 px-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/navbar/logo-navbar@3x.png"
            alt="ODA Sources"
            className="h-auto max-h-10 w-[150px] object-contain object-left"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="flex h-9 w-9 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-navy-900 hover:text-navy-900"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul>
            {LINKS.map((link, index) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-4 border-b border-zinc-100 py-5 transition",
                      active && "bg-zinc-50/60 -mx-5 px-5",
                    )}
                  >
                    <span
                      className={cn(
                        "w-6 shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] transition",
                        active
                          ? "text-express-600"
                          : "text-zinc-400 group-hover:text-express-600",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-[17px] font-bold leading-tight tracking-tight transition",
                          active
                            ? "text-navy-900"
                            : "text-navy-900 group-hover:text-express-600",
                        )}
                      >
                        {link.label}
                      </p>
                      <p className="mt-1 text-[12px] leading-snug text-zinc-500">
                        {link.subtitle}
                      </p>
                    </div>

                    <ArrowRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition",
                        active
                          ? "text-express-600"
                          : "text-zinc-300 group-hover:translate-x-1 group-hover:text-express-600",
                      )}
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA + contacts */}
        <div className="shrink-0 border-t border-zinc-200 bg-zinc-50/60 px-5 py-5">
          <Link
            href="/contact"
            onClick={onClose}
            className="group inline-flex w-full items-center justify-between gap-3 bg-express-600 px-5 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700"
          >
            Se faire accompagner
            <ArrowRight
              className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </Link>

          <div className="mt-5 space-y-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[12.5px] font-medium text-zinc-600 transition hover:text-navy-900"
            >
              <MessageCircle
                className="h-3.5 w-3.5 shrink-0 text-express-600"
                strokeWidth={1.75}
              />
              WhatsApp · {CONTACT_PHONE_DISPLAY}
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-[12.5px] font-medium text-zinc-600 transition hover:text-navy-900"
            >
              <Mail
                className="h-3.5 w-3.5 shrink-0 text-express-600"
                strokeWidth={1.75}
              />
              {CONTACT_EMAIL}
            </a>

            <div className="flex items-center gap-3 text-[12.5px] text-zinc-500">
              <MapPin
                className="h-3.5 w-3.5 shrink-0 text-express-600"
                strokeWidth={1.75}
              />
              Guangzhou · Hong Kong · Chine
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}