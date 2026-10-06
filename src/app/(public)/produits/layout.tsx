import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos produits — Catalogue sourcing Chine",
  description:
    "Découvrez les familles de produits que nous sourçons et expédions depuis la Chine : machines industrielles, matériaux de construction, électronique en gros, textile et plus.",
  openGraph: {
    title: "Nos produits — Catalogue sourcing Chine | ODA Sources",
    description:
      "Machines, matériaux, électronique, textile. Découvrez notre catalogue de produits sourcés depuis la Chine et livrés en Afrique.",
    url: "/produits",
  },
  alternates: { canonical: "/produits" },
};

export default function ProduitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}