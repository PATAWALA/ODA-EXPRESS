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
    <section className="border-b border-zinc-200 bg-zinc-50/50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* En-tête */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              Produit introuvable ?
            </p>
            <h2 className="mt-6 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[34px]">
              Vous cherchez un produit
              <br />
              qui n&apos;est pas dans la liste ?
            </h2>
            <p className="mt-5 text-[14.5px] leading-[1.75] text-zinc-600">
              Nous sourçons tout type de produit depuis la Chine. Envoyez-nous
              votre demande, nous trouvons le fournisseur, négocions et
              livrons à votre entrepôt.
            </p>
          </div>

          {/* Comment ça marche : 3 étapes */}
          <div className="mt-12 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title} className="bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-zinc-200 text-navy-900">
                    <step.icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-express-600">
                    Étape {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-[15px] font-bold tracking-tight text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Actions — centrées */}
          <div className="mt-14 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-express-600 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 sm:w-64"
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
              className="group inline-flex items-center justify-center gap-2 border border-emerald-600 bg-white px-8 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-emerald-700 transition hover:bg-emerald-50 sm:w-64"
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