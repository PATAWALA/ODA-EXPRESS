"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Produits", href: "/produits" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Actualités", href: "/actualites" },
  { label: "À propos", href: "/a-propos" },
];

export default function Header() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/95 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Logo — le composant Logo crée déjà son propre lien */}
          <div className="flex shrink-0 items-center">
            <span className="hidden sm:block">
              <Logo variant="navbar" width={180} priority />
            </span>
            <span className="sm:hidden">
              <Logo variant="mark" width={36} priority />
            </span>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[13px] font-semibold tracking-tight transition",
                    active
                      ? "text-navy-900"
                      : "text-zinc-500 hover:text-navy-900",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-express-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <ButtonLink
            href="/contact"
            variant="primary"
            size="sm"
            className="group shrink-0"
          >
            <span>Se faire accompagner</span>
            <ArrowRight
              className="hidden h-3.5 w-3.5 transition group-hover:translate-x-0.5 sm:inline"
              strokeWidth={2.5}
            />
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}