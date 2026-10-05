import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site ODA SOURCES IMPORT & EXPORT CO., LIMITED.",
};

export default function MentionsLegalesPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            Informations légales
          </p>
          <h1 className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[40px]">
            Mentions légales
          </h1>
          <p className="mt-4 text-[13px] text-zinc-500">
            Dernière mise à jour : janvier 2026
          </p>

          <div className="mt-12 space-y-10">
            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                1. Éditeur du site
              </h2>
              <div className="mt-4 space-y-2 text-[14.5px] leading-[1.75] text-zinc-600">
                <p>
                  <strong className="font-semibold text-navy-900">
                    Raison sociale :
                  </strong>{" "}
                  ODA SOURCES IMPORT & EXPORT CO., LIMITED
                </p>
                <p>
                  <strong className="font-semibold text-navy-900">
                    Implantations :
                  </strong>{" "}
                  Chine 🇨🇳
                </p>
                <p>
                  <strong className="font-semibold text-navy-900">
                    Activité :
                  </strong>{" "}
                  Sourcing, import-export et accompagnement des opérations
                  commerciales internationales.
                </p>
                <p>
                  <strong className="font-semibold text-navy-900">
                    Email :
                  </strong>{" "}
                  odaxpress10@gmail.com
                </p>
                <p>
                  <strong className="font-semibold text-navy-900">
                    Téléphone / WhatsApp :
                  </strong>{" "}
                  +86 195 1566 0197
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                2. Hébergement
              </h2>
              <div className="mt-4 space-y-2 text-[14.5px] leading-[1.75] text-zinc-600">
                <p>
                  <strong className="font-semibold text-navy-900">
                    Hébergeur :
                  </strong>{" "}
                  Vercel Inc.
                </p>
                <p>
                  <strong className="font-semibold text-navy-900">
                    Adresse :
                  </strong>{" "}
                  340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                </p>
                <p>
                  <strong className="font-semibold text-navy-900">
                    Site :
                  </strong>{" "}
                  vercel.com
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                3. Propriété intellectuelle
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                L&apos;ensemble des contenus présents sur ce site (textes,
                images, logos, marques, structure, code) est la propriété
                exclusive de ODA SOURCES IMPORT & EXPORT CO., LIMITED ou de ses
                partenaires. Toute reproduction, représentation, modification ou
                exploitation, totale ou partielle, sans autorisation écrite
                préalable est strictement interdite.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                4. Responsabilité
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                ODA SOURCES IMPORT & EXPORT CO., LIMITED s&apos;efforce
                d&apos;assurer l&apos;exactitude des informations diffusées sur
                ce site. Toutefois, elle ne peut garantir l&apos;exhaustivité ni
                l&apos;absence d&apos;erreur. Les informations présentées sont
                fournies à titre indicatif et sont susceptibles d&apos;évoluer
                sans préavis.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                5. Liens externes
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Ce site peut contenir des liens vers des sites tiers. ODA
                SOURCES IMPORT & EXPORT CO., LIMITED n&apos;exerce aucun
                contrôle sur ces sites et décline toute responsabilité quant à
                leur contenu.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-900">
                6. Droit applicable
              </h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-600">
                Les présentes mentions légales sont régies par le droit en
                vigueur en Chine 🇨🇳. Tout litige relatif à l&apos;utilisation
                du site relève de la compétence exclusive des tribunaux
                compétents en Chine.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}