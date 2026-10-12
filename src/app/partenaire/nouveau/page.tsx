import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import PublicPartnerForm from "@/components/widgets/PublicPartnerForm";
import { getPartnerSectors } from "@/lib/data/partner-sectors";

export const metadata: Metadata = {
  title: "Rejoindre le réseau ODA Sources",
  description:
    "Enregistrez votre entreprise dans le réseau de partenaires ODA Sources.",
  robots: { index: false, follow: false },
};

export const revalidate = 0;

export default async function NewPartnerPublicPage() {
  const sectors = await getPartnerSectors();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eef3fb] to-white">
      {/* Halo décoratif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-navy-200/40 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-express-100/40 to-transparent blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-xl py-12 sm:py-16">
          {/* En-tête */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-lg">
              <Handshake className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              ODA Sources · Réseau
            </p>
            <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[34px]">
              Rejoindre notre réseau
            </h1>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-zinc-600">
              Enregistrez votre entreprise en moins d&apos;une minute. Seul le
              nom est obligatoire — le reste est optionnel.
            </p>
          </div>

          {/* Formulaire */}
          <PublicPartnerForm sectors={sectors} />

          {/* Retour */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-navy-700 transition hover:text-express-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
              Retour au site
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}