import { Building2, CheckCircle2, Globe2, ShieldCheck } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Vérifier avant d'acheter",
    text: "Nous visitons physiquement chaque usine avant que vous ne payiez. Photos et vidéos envoyées sous 24 h.",
  },
  {
    icon: Building2,
    title: "Être présent sur le terrain",
    text: "Notre entrepôt est à Guangzhou. Nous parlons chinois et nous traitons directement avec les usines.",
  },
  {
    icon: Globe2,
    title: "Un seul interlocuteur",
    text: "De la recherche du produit à la livraison dans votre ville, un seul contact suit votre dossier.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-navy-900 px-4 py-16 sm:px-6 sm:py-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1800&q=85')] bg-cover bg-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70"
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-400">
              À propos
            </p>
            <h1 className="mt-3 text-[30px] font-bold leading-tight tracking-tight text-white sm:text-[42px]">
              Nous connectons les usines chinoises aux marchés africains
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-relaxed text-navy-100">
              Depuis Guangzhou, nous accompagnons les commerçants, distributeurs
              et industriels africains dans leurs importations : sourcing,
              inspection et transport maritime.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=85"
                alt="Inspection en usine"
                className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=85"
                alt="Entrepôt à Guangzhou"
                className="aspect-square w-full rounded-2xl object-cover"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=85"
                alt="Départ du port"
                className="aspect-square w-full rounded-2xl object-cover"
              />
            </div>

            <div>
              <h2 className="text-[24px] font-bold tracking-tight text-navy-900 sm:text-[30px]">
                Notre mission
              </h2>
              <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-600">
                Le commerce Chine — Afrique est souvent freiné par deux
                obstacles : des fournisseurs non vérifiés et des expéditions
                mal organisées. ODA SOURCES a été créé pour éliminer ces
                obstacles.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
                Nous allons dans les usines, nous vérifions la marchandise avant
                paiement, nous consolidons les colis et nous expédions par voie
                maritime vers 12 pays d&apos;Afrique.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Basés à Guangzhou, au cœur des usines",
                  "Rapport photo et vidéo sous 24 h",
                  "Uniquement transport maritime",
                  "Dédouanement inclus",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-express-600"
                      strokeWidth={2}
                    />
                    <span className="text-[13px] leading-relaxed text-navy-900">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-gradient-to-b from-navy-50/40 to-white px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-[24px] font-bold tracking-tight text-navy-900 sm:text-[30px]">
              Ce qui nous distingue
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-[0_1px_2px_rgba(10,25,49,0.04)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-900 via-navy-700 to-express-600 text-white shadow-sm">
                    <value.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-[14.5px] font-bold tracking-tight text-navy-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-600">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-white px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[24px] font-bold tracking-tight text-navy-900 sm:text-[30px]">
              Discutons de votre projet
            </h2>
            <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-600">
              Envoyez-nous votre produit, votre besoin ou votre question. Nous
              vous répondons sous 24 h avec un devis clair.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#sur-mesure"
                className="rounded-full bg-gradient-to-br from-express-500 to-express-700 px-6 py-3.5 text-[13px] font-bold text-white shadow-sm transition hover:shadow-md"
              >
                Envoyer ma demande
              </Link>
              <Link
                href="/#catalogue"
                className="rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-[13px] font-semibold text-navy-900 transition hover:border-zinc-300"
              >
                Voir le catalogue
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}