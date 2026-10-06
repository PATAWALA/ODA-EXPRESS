"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="relative rounded-[32px] lg:rounded-[40px] border border-[#1A1A1A]/10 bg-[#1A1A1A] text-[#EFECE6] p-10 lg:p-20 overflow-hidden">
          {/* Décor flou caramel */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#A8896A]/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#A8896A]/10 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Colonne texte */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#EFECE6]/50 mb-5">
                <span className="w-8 h-px bg-[#EFECE6]/30" />
                Newsletter
              </div>
              <h2 className="font-serif text-[36px] lg:text-[52px] leading-[1] font-light tracking-[-0.02em]">
                Rejoignez le{" "}
                <span className="italic text-[#A8896A]">cercle.</span>
              </h2>
              <p className="mt-5 text-[13.5px] leading-relaxed text-[#EFECE6]/60 max-w-md">
                Recevez en avant-première nos nouvelles pièces, éditions
                limitées et offres exclusives. Pas de spam — promis.
              </p>
            </div>

            {/* Colonne formulaire */}
            <div className="lg:col-span-6">
              <form
                onSubmit={submit}
                className="flex items-center gap-3 p-2 pl-6 rounded-full border border-[#EFECE6]/20 bg-[#EFECE6]/5 backdrop-blur-sm focus-within:border-[#EFECE6]/40 transition-colors"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="flex-1 bg-transparent py-3.5 text-[13px] text-[#EFECE6] placeholder:text-[#EFECE6]/40 outline-none min-w-0"
                />

                {/* Groupe : label + bouton icône */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Texte d'accompagnement (desktop) */}
                  <span
                    className={`hidden md:block text-[10px] uppercase tracking-[0.28em] transition-all duration-500 ${
                      sent
                        ? "text-[#A8896A] opacity-100"
                        : "text-[#EFECE6]/40 opacity-100"
                    }`}
                  >
                    {sent ? "Merci !" : "S'inscrire"}
                  </span>

                  {/* Bouton icône seule */}
                  <button
                    type="submit"
                    aria-label={sent ? "Inscrit" : "S'inscrire"}
                    className="group relative w-12 h-12 rounded-full bg-[#EFECE6] text-[#1A1A1A] flex items-center justify-center hover:bg-[#A8896A] hover:text-[#EFECE6] transition-colors duration-300"
                  >
                    {/* Anneau pulsé au hover */}
                    <span className="absolute inset-0 rounded-full ring-1 ring-[#EFECE6]/0 group-hover:ring-[#A8896A]/60 group-hover:ring-offset-2 group-hover:ring-offset-[#1A1A1A] transition-all duration-500" />

                    {/* Icône */}
                    {sent ? (
                      <Check size={16} strokeWidth={2} />
                    ) : (
                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#EFECE6]/40">
                En vous inscrivant, vous acceptez notre politique de
                confidentialité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}