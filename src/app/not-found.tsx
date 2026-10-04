import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            Erreur 404
          </p>

          <h1 className="mt-6 text-[80px] font-bold leading-none tracking-[-0.04em] text-navy-900 sm:text-[120px]">
            404
          </h1>

          <h2 className="mt-8 text-[24px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[30px]">
            Cette page n&apos;existe pas
            <br />
            ou a été déplacée.
          </h2>

          <p className="mx-auto mt-6 max-w-md text-[14.5px] leading-relaxed text-zinc-600">
            La page que vous cherchez est introuvable. Revenez à l&apos;accueil
            ou explorez nos services pour trouver ce que vous cherchez.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" variant="primary" size="lg" className="group">
              <Home className="h-4 w-4" strokeWidth={2} />
              Retour à l&apos;accueil
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </ButtonLink>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:border-navy-300 hover:bg-zinc-50"
            >
              <Search className="h-3.5 w-3.5" strokeWidth={2} />
              Découvrir nos services
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}