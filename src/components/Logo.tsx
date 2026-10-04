// Fichier cible : src/components/Logo.tsx
// Usage dans la navbar :   <Logo variant="navbar" />
// Usage dans le footer :   <Logo variant="full" width={260} />
// Usage sur fond sombre :  <Logo variant="white" width={260} />   (logo blanc, fond transparent)
// Usage mobile compact :   <Logo variant="mark" />               (carré « ODA »)

import Image from "next/image";
import Link from "next/link";

type Variant = "navbar" | "compact" | "full" | "white" | "mark";

// Chaque fichier est fourni en haute définition ; next/image génère la bonne taille tout seul.
const VARIANTS: Record<Variant, { src: string; ratio: number; defaultWidth: number; alt: string }> = {
  // logo complet avec « IMPORT & EXPORT » : 1209 x 212  (ratio 5.70)
  navbar: { src: "/brand/navbar/logo-navbar@3x.png", ratio: 1209 / 212, defaultWidth: 364, alt: "ODA Sources — Import & Export" },
  // sans la baseline, plus lisible quand la navbar est petite : 1209 x 146 (ratio 8.28)
  compact: { src: "/brand/navbar/logo-navbar-compact@3x.png", ratio: 1209 / 146, defaultWidth: 330, alt: "ODA Sources" },
  full: { src: "/brand/logo/logo-full-1920.png", ratio: 1209 / 212, defaultWidth: 360, alt: "ODA Sources — Import & Export" },
  white: { src: "/brand/logo/logo-white-1920.png", ratio: 1209 / 212, defaultWidth: 360, alt: "ODA Sources — Import & Export" },
  mark: { src: "/brand/mark/logo-mark-256.png", ratio: 1, defaultWidth: 44, alt: "ODA Sources" },
};

export default function Logo({
  variant = "navbar",
  width,
  href = "/",
  priority = false,
  className,
}: {
  variant?: Variant;
  width?: number;
  href?: string | null; // null = pas de lien
  priority?: boolean;   // true pour le logo de la navbar (visible dès le chargement)
  className?: string;
}) {
  const v = VARIANTS[variant];
  const w = width ?? v.defaultWidth;
  const h = Math.round(w / v.ratio);

  const img = (
    <Image src={v.src} alt={v.alt} width={w} height={h} priority={priority} className={className} style={{ width: w, height: "auto" }} />
  );

  return href ? (
    <Link href={href} aria-label="Accueil — ODA Sources" className="inline-flex items-center">
      {img}
    </Link>
  ) : (
    img
  );
}

/* Exemple Navbar responsive (Tailwind) :
<header className="sticky top-0 z-50 border-b bg-white">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
    <span className="hidden sm:block"><Logo variant="navbar" width={230} priority /></span>
    <span className="sm:hidden"><Logo variant="mark" width={40} priority /></span>
    ...menu...
  </div>
</header>
*/