import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos réalisations — Projets import Chine Afrique",
  description:
    "Camions, engins de chantier, machines industrielles, conteneurs. Découvrez les projets que nos clients nous confient régulièrement.",
  openGraph: {
    title: "Nos réalisations | ODA Sources",
    description:
      "Une sélection de projets d'import réalisés pour nos clients en Afrique : engins, machines, textile et conteneurs.",
    url: "/realisations",
  },
  alternates: { canonical: "/realisations" },
};

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}