import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "gradient";
}

export function Card({ children, className, variant = "default" }: CardProps) {
  const variants = {
    default:
      "border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(1,18,52,0.04)]",
    elevated:
      "border border-zinc-200 bg-white shadow-[0_4px_24px_-12px_rgba(1,18,52,0.12)]",
    gradient:
      "border border-zinc-200 bg-gradient-to-br from-white via-navy-50/30 to-white shadow-[0_4px_24px_-12px_rgba(1,18,52,0.10)]",
  };

  return <div className={cn(variants[variant], className)}>{children}</div>;
}