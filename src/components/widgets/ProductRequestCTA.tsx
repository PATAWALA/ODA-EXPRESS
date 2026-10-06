import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Search,
  Link2,
  FileText,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const STEPS = [
  {
    icon: Link2,
    title: "Envoyez-nous le lien",
    description:
      "AliExpress, 1688, Taobao, Alibaba — collez simplement l'URL du produit.",
  },
  {
    icon: FileText,
    title: "Ou décrivez-le",
    description:
      "Nom, photo, quantité, ville de livraison : nous comprenons votre besoin.",
  },
  {
    icon: Search,
    title: "On s'occupe du reste",
    description:
      "Recherche fournisseur, négociation, contrôle qualité et expédition.",
  },
];

export default function ProductRequestCTA() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-16 sm:py-20 lg:py-24">
      {/* Dégradé de section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-navy-50/40 to-white"
      />

      {/* Halo bleu en haut à droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-navy-100/60 via-express-50/40 to-transparent blur-3xl"
      />

      {/* Halo rouge en bas à gauche */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-express-100/50 via-navy-100/30 to-transparent blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-6xl">
          {/* En-tête */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center rounded-2xl border border-navy-100 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-express-600 shadow-sm backdrop-blur">
              Produit introuvable ?
            </p>
            <h2 className="mt-6 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[34px]">
              Vous cherchez un produit
              <br />
              <span className="bg-gradient-to-r from-navy-900 via-navy-700 to-express-600 bg-clip-text text-transparent">
                qui n&apos;est pas dans la liste ?
              </span>
            </h2>
            <p className="mt-5 text-[14.5px] leading-[1.75] text-zinc-600">
              Nous sourçons tout type de produit depuis la Chine. Envoyez-nous
              votre demande, nous trouvons le fournisseur, négocions et
              livrons à votre entrepôt.
            </p>
          </div>

          {/* Comment ça marche : 3 étapes */}
          <div className="mt-12">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-[0_4px_24px_-12px_rgba(1,18,52,0.12)] sm:grid-cols-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="group relative overflow-hidden bg-gradient-to-br from-white via-white to-navy-50/60 p-6 transition-all duration-300 hover:to-express-50/60 sm:p-7"
                >
                  {/* Halo interne au survol */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-navy-200/40 via-transparent to-transparent blur-2xl opacity-60 transition-opacity duration-300 group-hover:from-express-200/60 group-hover:opacity-100"
                  />

                  {/* En-tête étape */}
                  <div className="relative flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:from-express-600 group-hover:to-express-700 group-hover:shadow-[0_8px_20px_-8px_rgba(191,8,8,0.5)]">
                      <step.icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-express-600">
                      Étape {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-[15px] font-bold tracking-tight text-navy-900">
                    {step.title}
                  </h3>
                  <p className="relative mt-2.5 text-[13px] leading-relaxed text-zinc-600">
                    {step.description}
                  </p>

                  {/* Trait rouge qui s'allonge */}
                  <div
                    aria-hidden
                    className="relative mt-5 h-px w-8 bg-gradient-to-r from-express-600 to-transparent transition-all duration-300 group-hover:w-16"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions — centrées */}
          <div className="mt-14 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-express-600 to-express-700 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(191,8,8,0.5)] sm:w-64"
            >
              Envoyer ma demande
              <ArrowRight
                className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>

            <Link
              href="https://wa.me/8619515660197?text=Bonjour%20ODA%20SOURCES%2C%20je%20recherche%20un%20produit%20sp%C3%A9cifique."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-600 bg-white px-8 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-emerald-700 shadow-sm transition-all duration-300 hover:bg-emerald-50 hover:shadow-[0_8px_24px_-12px_rgba(5,150,105,0.4)] sm:w-64"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              WhatsApp
            </Link>
          </div>

          <p className="mt-6 text-center text-[12px] text-zinc-500">
            Réponse sous 24 heures ouvrées · Sans engagement
          </p>
        </div>
      </Container>
    </section>
  );
}