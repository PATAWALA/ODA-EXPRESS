import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Eye,
  Globe2,
  Target,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "ODA SOURCES IMPORT & EXPORT CO., LIMITED — Votre partenaire stratégique pour vos opérations en Chine. Présence à Hong Kong et en Chine continentale.",
};

const STATS = [
  { value: "+3 ans", label: "d'expérience terrain en Chine" },
  { value: "2", label: "implantations Hong Kong & Chine" },
  { value: "5", label: "pôles d'expertise intégrés" },
  { value: "24 h", label: "délai de réponse moyen" },
];

const VALUES = [
  {
    icon: Eye,
    title: "Transparence",
    description:
      "Vous voyez tout : photos réelles, rapports d'inspection, prix départ usine. Aucune zone d'ombre.",
  },
  {
    icon: Award,
    title: "Rigueur",
    description:
      "Chaque étape est documentée et contrôlée. Nous ne validons rien à votre place sans preuve.",
  },
  {
    icon: Users,
    title: "Proximité",
    description:
      "Un seul interlocuteur du premier contact à la livraison. Vous parlez toujours à la même personne.",
  },
  {
    icon: Target,
    title: "Maîtrise des risques",
    description:
      "Vérification fournisseur, contrôle qualité et encadrement des paiements avant chaque engagement.",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                À propos
              </p>

              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Une expertise construite
                <br />
                sur le terrain,
                <br />
                <span className="text-express-600">
                  au cœur de la Chine.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                ODA SOURCES IMPORT & EXPORT CO., LIMITED est une société
                spécialisée dans le sourcing, l&apos;import-export et
                l&apos;accompagnement des opérations commerciales
                internationales, avec une présence à Hong Kong et en Chine
                continentale.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="group"
                >
                  Se faire accompagner
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </ButtonLink>
              </div>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team/equipe-showroom.jpeg"
                alt="Notre équipe en Chine"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Bandeau stats */}
          <div className="border-t border-zinc-200 py-10">
            <dl className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={
                    "px-0 lg:px-8 " +
                    (index > 0 ? "lg:border-l lg:border-zinc-200" : "")
                  }
                >
                  <dt className="text-[26px] font-bold tracking-tight text-navy-900 sm:text-[30px]">
                    {stat.value}
                  </dt>
                  <dd className="mt-1.5 text-[12.5px] leading-snug text-zinc-500">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Notre entreprise */}
      <section className="border-b border-zinc-200 bg-white py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Notre entreprise
              </p>
              <h2 className="mt-6 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[34px]">
                Une expertise construite
                <br />
                sur le terrain
              </h2>

              <div className="mt-7 space-y-5 text-[14.5px] leading-[1.75] text-zinc-600">
                <p>
                  ODA SOURCES s&apos;appuie sur plus de trois années
                  d&apos;expérience pratique dans le sourcing en Chine. Cette
                  expérience de terrain nous a permis de développer une
                  connaissance approfondie des réalités du marché chinois :
                  fonctionnement des fournisseurs et des usines, négociation
                  des conditions commerciales, niveaux de qualité, contraintes
                  liées aux quantités minimales de commande, suivi des
                  marchandises et problématiques logistiques.
                </p>
                <p>
                  Nous considérons qu&apos;un sourcing professionnel ne
                  consiste pas simplement à rechercher le prix le plus bas.
                  Notre rôle est d&apos;identifier la solution la plus adaptée
                  aux exigences du client, en tenant compte de la qualité, du
                  prix, de la fiabilité du fournisseur, des délais et des
                  contraintes logistiques.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team/fondateur-showroom-auto.jpeg"
                alt="Visite showroom automobile"
                className="col-span-2 aspect-[16/10] w-full border border-zinc-200 object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team/fondateur-voiture-blanche.jpeg"
                alt="Livraison véhicule client"
                className="aspect-[4/5] w-full border border-zinc-200 object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team/fondateur-voiture-noire.jpeg"
                alt="Livraison véhicule client"
                className="aspect-[4/5] w-full border border-zinc-200 object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Fondateur */}
      <section className="border-b border-zinc-200 bg-zinc-50/50 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start lg:gap-16">
              {/* Photo fondateur */}
              <div className="border border-zinc-200 bg-white p-3">
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/team/fondateur-voiture-noire.jpeg"
                    alt="DA Olivier, fondateur"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-3 py-5 text-center">
                  <p className="text-[16px] font-bold tracking-tight text-navy-900">
                    DA Olivier
                  </p>
                  <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-express-600">
                    Fondateur
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-zinc-500">
                    Entrepreneur burkinabè établi en Chine
                  </p>
                </div>
              </div>

              {/* Texte fondateur */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                  Notre fondateur
                </p>
                <h2 className="mt-6 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[34px]">
                  DA Olivier
                </h2>

                <div className="mt-7 space-y-5 text-[14.5px] leading-[1.75] text-zinc-600">
                  <p>
                    ODA SOURCES IMPORT & EXPORT CO., LIMITED a été fondée par
                    DA Olivier, entrepreneur burkinabè établi en Chine et
                    disposant de plus de trois années d&apos;expérience dans le
                    sourcing et l&apos;accompagnement commercial sur le marché
                    chinois.
                  </p>
                  <p>
                    Son parcours en finance et management, associé à son
                    expérience entrepreneuriale et à sa connaissance du terrain
                    chinois, lui a permis de développer une compréhension
                    particulière des enjeux auxquels sont confrontées les
                    entreprises souhaitant s&apos;approvisionner en Chine.
                  </p>
                  <p>
                    Au fil des années, il a accompagné différents projets
                    impliquant la recherche de fournisseurs, la négociation,
                    l&apos;achat, la vérification de marchandises et
                    l&apos;organisation d&apos;expéditions internationales,
                    notamment à destination des marchés africains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Équipe */}
      <section className="border-b border-zinc-200 bg-white py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team/equipe-showroom.jpeg"
                alt="Notre équipe en Chine"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Notre équipe
              </p>
              <h2 className="mt-6 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[34px]">
                Une équipe sur le terrain,
                <br />
                à vos côtés à chaque étape.
              </h2>

              <div className="mt-7 space-y-5 text-[14.5px] leading-[1.75] text-zinc-600">
                <p>
                  Notre force, c&apos;est une présence permanente au cœur des
                  écosystèmes industriels et commerciaux chinois. Nous allons
                  physiquement à la rencontre des usines, des fournisseurs et
                  des marchés pour vous.
                </p>
                <p>
                  Chaque dossier est suivi par un interlocuteur dédié qui parle
                  votre langue, comprend vos contraintes et négocie directement
                  en votre nom. Vous ne dépendez d&apos;aucun intermédiaire.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "Présence permanente à Guangzhou, Yiwu et Foshan",
                  "Interlocuteurs francophones et sinophones",
                  "Accompagnement aux usines et salons professionnels",
                  "Un seul contact du début à la fin de votre projet",
                ].map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-express-600/30 bg-express-600/5">
                      <CheckCircle2
                        className="h-3 w-3 text-express-600"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span className="text-[14px] leading-relaxed text-navy-900">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="border-b border-zinc-200 bg-white py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <article className="border border-zinc-200 bg-white p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center border border-express-600 bg-express-600 text-white">
                <Target className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-[22px] font-bold tracking-tight text-navy-900">
                Notre mission
              </h3>
              <p className="mt-5 text-[14.5px] leading-[1.75] text-zinc-600">
                Simplifier et structurer les échanges commerciaux entre la
                Chine et les marchés internationaux, en apportant à nos clients
                une présence locale et un accompagnement à chaque étape de
                leurs opérations. De la recherche du fournisseur à
                l&apos;expédition des marchandises, nous privilégions une
                approche fondée sur la transparence, la rigueur, la proximité
                et la maîtrise des risques.
              </p>
            </article>

            <article className="border border-zinc-200 bg-white p-8 sm:p-10">
              <span className="flex h-12 w-12 items-center justify-center border border-navy-900 bg-navy-900 text-white">
                <Globe2 className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-[22px] font-bold tracking-tight text-navy-900">
                Notre vision
              </h3>
              <p className="mt-5 text-[14.5px] leading-[1.75] text-zinc-600">
                Faire de ODA SOURCES IMPORT & EXPORT un acteur reconnu des
                échanges commerciaux entre la Chine, l&apos;Afrique et le reste
                du monde. À travers notre présence à Hong Kong et en Chine
                continentale, nous souhaitons construire un réseau
                international durable reliant fabricants, fournisseurs,
                entrepreneurs, distributeurs et investisseurs. Plus
                qu&apos;un intermédiaire, notre ambition est d&apos;être un
                partenaire de terrain pour le développement international de
                nos clients.
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* Valeurs */}
      <section className="border-b border-zinc-200 bg-zinc-50/50 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              Nos valeurs
            </p>
            <h2 className="mt-6 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[34px]">
              Ce qui guide chacune de nos décisions
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="bg-white p-7">
                <span className="flex h-11 w-11 items-center justify-center border border-zinc-200 text-navy-900">
                  <value.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[15px] font-bold tracking-tight text-navy-900">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="bg-navy-950 py-20 sm:py-24">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-400">
                Ce qui nous distingue
              </p>
              <h2 className="mt-6 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[34px]">
                Plus qu&apos;un intermédiaire,
                <br />
                un partenaire de terrain.
              </h2>

              <ul className="mt-8 space-y-4">
                {[
                  "Une présence physique permanente à Hong Kong et en Chine continentale",
                  "Une vérification terrain de chaque fournisseur avant tout paiement",
                  "Une couverture complète : sourcing, contrôle, shipping, visa, paiement",
                  "Un seul interlocuteur francophone du début à la fin",
                  "Une connaissance approfondie du marché africain et de ses contraintes",
                ].map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-express-500/40 bg-express-600/10">
                      <CheckCircle2
                        className="h-3 w-3 text-express-400"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span className="text-[14px] leading-relaxed text-navy-100">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 bg-white/5 p-8 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-400">
                Prêt à démarrer ?
              </p>
              <h3 className="mt-5 text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[28px]">
                Parlons de votre prochain
                <br />
                projet d&apos;import.
              </h3>
              <p className="mt-5 text-[14px] leading-[1.75] text-navy-200">
                Nous répondons sous 24 heures ouvrées avec une solution claire
                et un devis précis.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  variant="white"
                  size="md"
                  className="group"
                >
                  Se faire accompagner
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </ButtonLink>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white/10"
                >
                  Voir nos services
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}