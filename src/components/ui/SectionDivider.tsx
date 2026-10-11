type Variant = "wave" | "arc" | "zigzag" | "tilt" | "curve";
type Color = "white" | "zinc-50" | "navy-900" | "navy-950" | "navy-50";

interface Props {
  variant?: Variant;
  /** Couleur du SVG = couleur de la section du DESSOUS */
  color?: Color;
  /** Hauteur du SVG */
  height?: "sm" | "md" | "lg";
  /** Inverse verticalement */
  flip?: boolean;
  /** Couleur de fond du bloc (section du dessus) */
  bg?: Color;
  className?: string;
}

const FILL: Record<Color, string> = {
  white: "fill-white",
  "zinc-50": "fill-zinc-50",
  "navy-900": "fill-navy-900",
  "navy-950": "fill-navy-950",
  "navy-50": "fill-[#eef3fb]",
};

const BG: Record<Color, string> = {
  white: "bg-white",
  "zinc-50": "bg-zinc-50",
  "navy-900": "bg-navy-900",
  "navy-950": "bg-navy-950",
  "navy-50": "bg-[#eef3fb]",
};

const PATHS: Record<Variant, string> = {
  // Vague douce
  wave: "M0,100 L0,60 C240,20 480,20 720,60 C960,100 1200,100 1440,60 L1440,100 Z",
  // Dôme bombé
  arc: "M0,100 L0,30 Q720,180 1440,30 L1440,100 Z",
  // Zigzag anguleux
  zigzag: "M0,100 L0,50 L240,90 L480,50 L720,90 L960,50 L1200,90 L1440,50 L1440,100 Z",
  // Diagonale
  tilt: "M0,100 L0,90 L1440,30 L1440,100 Z",
  // Courbe en S
  curve: "M0,100 L0,40 C480,120 960,-40 1440,40 L1440,100 Z",
};

const HEIGHTS = {
  sm: "h-[40px] sm:h-[50px] lg:h-[60px]",
  md: "h-[60px] sm:h-[80px] lg:h-[110px]",
  lg: "h-[80px] sm:h-[120px] lg:h-[160px]",
};

export default function SectionDivider({
  variant = "wave",
  color = "white",
  bg,
  height = "md",
  flip = false,
  className = "",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative -mb-px block w-full ${
        bg ? BG[bg] : ""
      } ${HEIGHTS[height]} ${className}`}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
      >
        <path d={PATHS[variant]} className={FILL[color]} />
      </svg>
    </div>
  );
}