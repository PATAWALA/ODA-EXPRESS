import Link from "next/link";
import { ArrowRight, MessageCircle, FolderPlus } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function CustomProjectCTA() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 border border-zinc-200 bg-white p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:p-12">
            {/* Texte */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Un projet différent ?
              </p>

              <h2 className="mt-6 text-[28px] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-[36px] lg:text-[40px]">
                Chaque projet est unique.
                <br />
                Le vôtre mérite
                <br />
                <span className="text-express-600">
                  une réponse sur mesure.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-[14.5px] leading-[1.75] text-zinc-600">
                Camions, engins, machines, conteneurs, textile en gros... Si
                votre projet ne figure pas dans nos réalisations, décrivez-le
                nous. Nous étudions chaque demande et construisons une solution
                adaptée à vos contraintes.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 lg:min-w-[240px]">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-6 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
              >
                <FolderPlus className="h-4 w-4" strokeWidth={2.25} />
                Décrire mon projet
                <ArrowRight
                  className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>

              <Link
                href="https://wa.me/8619515660197?text=Bonjour%20ODA%20SOURCES%2C%20j%27ai%20un%20projet%20sp%C3%A9cifique%20%C3%A0%20vous%20soumettre."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:border-navy-700"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                WhatsApp direct
              </Link>

              <p className="mt-3 text-center text-[11.5px] text-zinc-500 lg:text-left">
                Réponse sous 24 h · Sans engagement
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}