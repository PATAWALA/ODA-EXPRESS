import { cn } from "@/lib/utils";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {badge && (
        <p
          className={cn(
            "text-[11.5px] font-bold uppercase tracking-[0.18em]",
            light ? "text-express-300" : "text-express-600",
          )}
        >
          {badge}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 text-[24px] font-bold tracking-tight sm:text-[32px]",
          light ? "text-white" : "text-navy-700",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-[13.5px] leading-relaxed",
            light ? "text-navy-100" : "text-zinc-600",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
