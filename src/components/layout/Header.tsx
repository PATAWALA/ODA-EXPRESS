"use client";

import Image from "next/image";
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  User,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open || searchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  const scrollToCatalog = (cat?: string) => {
    setOpen(false);
    const el = document.getElementById("catalogue");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (cat) {
      window.dispatchEvent(new CustomEvent("gm:setCategory", { detail: cat }));
    }
  };

  return (
    <>
      {/* ============ ANNONCE TOP BAR ============ */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] bg-[#1A1A1A] text-[#EFECE6] transition-all duration-500 ${
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100"
        } overflow-hidden`}
      >
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-9 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em]">
          <Sparkles size={11} strokeWidth={1.5} className="text-[#A8896A]" />
          <span className="text-[#EFECE6]/70">
            Livraison offerte à Kinshasa dès 150 $
          </span>
          <span className="hidden md:inline text-[#A8896A]">·</span>
          <span className="hidden md:inline text-[#EFECE6]/70">
            Paiement sécurisé
          </span>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "top-3 py-0" : "top-12 py-0"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div
            className={`flex items-center justify-between gap-4 px-4 lg:px-6 h-16 rounded-full border transition-all duration-500 ${
              scrolled
                ? "bg-[#EFECE6]/85 backdrop-blur-xl border-[#1A1A1A]/10 shadow-[0_10px_40px_-20px_rgba(26,26,26,0.3)]"
                : "bg-[#EFECE6]/60 backdrop-blur-md border-[#1A1A1A]/8"
            }`}
          >
            {/* -------- GAUCHE : LOGO -------- */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 shrink-0"
              aria-label="GM Boutique — Accueil"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#E6E1D8] ring-1 ring-[#1A1A1A]/10">
                <Image
                  src="/logo.jpg"
                  alt="GM Boutique & Sélection"
                  fill
                  priority
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="hidden sm:flex flex-col leading-none text-left">
                <span className="font-serif text-[15px] italic text-[#1A1A1A] tracking-wide">
                  GM Boutique
                </span>
                <span className="not-italic uppercase tracking-[0.22em] text-[9px] text-[#1A1A1A]/50 mt-1">
                  & Sélection
                </span>
              </span>
            </button>

            {/* -------- CENTRE : NAV DESKTOP -------- */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollToCatalog(cat)}
                  className="group relative px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
                >
                  {cat}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-px w-0 bg-[#1A1A1A] transition-all duration-300 group-hover:w-6" />
                </button>
              ))}
            </nav>

            {/* -------- DROITE : ACTIONS -------- */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Recherche */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Recherche"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition"
              >
                <Search size={16} strokeWidth={1.5} />
              </button>

              {/* Compte */}
              <button
                aria-label="Compte"
                className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition"
              >
                <User size={16} strokeWidth={1.5} />
              </button>

              {/* Séparateur vertical */}
              <span className="hidden sm:block w-px h-5 bg-[#1A1A1A]/15 mx-1" />

              {/* Panier — icône seule avec badge */}
              <button
                onClick={openCart}
                aria-label={`Panier — ${count} article(s)`}
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition"
              >
                <ShoppingBag size={17} strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#A8896A] text-[#EFECE6] text-[9px] font-medium tabular-nums flex items-center justify-center ring-2 ring-[#EFECE6]">
                    {count}
                  </span>
                )}
              </button>

              {/* Menu mobile */}
              <button
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#1A1A1A]/5 transition ml-1"
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
              >
                {open ? (
                  <X size={18} strokeWidth={1.5} />
                ) : (
                  <Menu size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MENU MOBILE PLEIN ÉCRAN ============ */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm"
        />
        <div
          className={`absolute top-0 left-0 right-0 bg-[#EFECE6] pt-32 pb-12 px-6 rounded-b-[32px] transition-transform duration-500 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <nav className="flex flex-col">
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => scrollToCatalog(cat)}
                className="group flex items-center justify-between py-5 border-b border-[#1A1A1A]/10 last:border-0 text-left"
              >
                <span className="font-serif text-[28px] italic text-[#1A1A1A]">
                  {cat}
                </span>
                <span className="text-[10px] tabular-nums tracking-[0.3em] text-[#1A1A1A]/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-10 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-[#1A1A1A]/50">
            <span>Kinshasa · RDC</span>
            <span>+243 900 000 000</span>
          </div>
        </div>
      </div>

      {/* ============ OVERLAY RECHERCHE ============ */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-500 ${
          searchOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={() => setSearchOpen(false)}
          className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-md"
        />
        <div
          className={`absolute top-0 left-0 right-0 bg-[#EFECE6] pt-8 pb-8 px-6 lg:px-8 transition-transform duration-500 ${
            searchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/60">
                Rechercher
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Fermer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#1A1A1A]/5 transition"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex items-center gap-4 border-b border-[#1A1A1A]/20 pb-4">
              <Search size={20} strokeWidth={1.5} className="text-[#1A1A1A]/40" />
              <input
                autoFocus={searchOpen}
                placeholder="Costume, robe, bouillie bio…"
                className="flex-1 bg-transparent text-[22px] lg:text-[28px] font-serif italic text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 outline-none"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Costume", "Robe", "Montre", "Bouillie BIO", "Sac"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 rounded-full border border-[#1A1A1A]/15 text-[11px] uppercase tracking-[0.15em] text-[#1A1A1A]/70 hover:bg-[#1A1A1A] hover:text-[#EFECE6] hover:border-[#1A1A1A] transition"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}