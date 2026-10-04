"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");

    // Pas de Hero sur cette page → widget toujours visible
    if (!hero) {
      setVisible(true);
      return;
    }

    // Au chargement : vérifier si le Hero est visible
    function checkVisibility() {
      const rect = hero!.getBoundingClientRect();
      // Le Hero est encore visible si son bas est au-dessus du milieu de l'écran
      const heroStillVisible = rect.bottom > window.innerHeight * 0.5;
      setVisible(!heroStillVisible);
    }

    // Vérifier au chargement
    checkVisibility();

    // Vérifier à chaque scroll
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  return (
    <div
      className={
        "fixed bottom-6 right-4 z-40 md:right-6 transition-all duration-500 " +
        (visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0")
      }
      aria-hidden={!visible}
    >
      {open && (
        <div className="mb-3 w-72 overflow-hidden border border-zinc-200 bg-white shadow-2xl">
          <div className="border-b border-zinc-200 bg-white px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-express-600">
              ODA SOURCES
            </p>
            <p className="mt-1 text-[14px] font-bold text-navy-900">
              Bonjour, comment pouvons-nous vous aider ?
            </p>
          </div>

          <div className="p-5">
            <p className="text-[13px] leading-relaxed text-zinc-600">
              Envoyez-nous votre besoin, votre produit ou votre projet. Nous
              répondons sous 24 h.
            </p>

            <a
              href="https://wa.me/8619515660197?text=Bonjour%20ODA%20SOURCES%2C%20je%20souhaite%20discuter%20de%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-emerald-600 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-700"
            >
              <Send className="h-3.5 w-3.5" strokeWidth={2} />
              Ouvrir WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer" : "Contacter sur WhatsApp"}
        className="ml-auto flex h-14 w-14 items-center justify-center bg-emerald-600 text-white shadow-xl transition hover:bg-emerald-700"
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}