import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles — ODA SOURCES.",
};

export default function ConfidentialitePage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            Protection des données
          </p>
          <h1 className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[40px]">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-[13px] text-zinc-500">
            Dernière mise à jour : janvier 2026
          </p>

          <div className="mt-12 space-y-10">
            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                1. Données collectées
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Nous collectons uniquement les données strictement nécessaires
                au traitement de votre demande :
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] leading-[1.75] text-zinc-600">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                  Nom et prénom
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                  Adresse email
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                  Numéro de téléphone / WhatsApp (facultatif)
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                  Description du projet, produit ou besoin
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                2. Finalité du traitement
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Vos données sont utilisées pour :
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] leading-[1.75] text-zinc-600">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                  Répondre à votre demande de devis ou d&apos;information
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                  Assurer le suivi de votre dossier commercial
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                  Vous envoyer nos actualités et conseils d&apos;import (uniquement si vous y avez consenti)
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                3. Conservation des données
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Vos données sont conservées pendant la durée nécessaire au
                traitement de votre demande et au suivi de la relation
                commerciale, puis archivées ou supprimées conformément aux
                obligations légales applicables.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                4. Partage des données
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Vos données ne sont ni vendues, ni louées, ni cédées à des tiers
                à des fins commerciales. Elles peuvent être transmises à nos
                partenaires strictement nécessaires à l&apos;exécution de votre
                projet (fournisseurs, transitaires, transporteurs) et uniquement
                dans ce cadre.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                5. Sécurité
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Nous mettons en œuvre les mesures techniques et
                organisationnelles appropriées pour protéger vos données contre
                tout accès non autorisé, toute altération ou toute divulgation.
                Les communications entre votre navigateur et notre site sont
                chiffrées via HTTPS.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                6. Vos droits
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Vous disposez d&apos;un droit d&apos;accès, de rectification,
                d&apos;effacement, de limitation et d&apos;opposition au
                traitement de vos données. Pour exercer ces droits, contactez-nous
                à l&apos;adresse suivante :
              </p>
              <p className="mt-4 text-[14.5px] font-semibold text-navy-900">
                odaxpress10@gmail.com
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                7. Cookies
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Ce site utilise uniquement des cookies techniques nécessaires à
                son bon fonctionnement. Aucun cookie publicitaire ou de
                traçage tiers n&apos;est utilisé sans votre consentement
                explicite.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                8. Modification de la politique
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Nous nous réservons le droit de modifier la présente politique
                à tout moment. La version en vigueur est celle publiée sur cette
                page.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}