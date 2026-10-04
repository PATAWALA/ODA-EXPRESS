import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "red" | "outline" | "success";
  className?: string;
}

export function Badge({ children, variant = "navy", className }: BadgeProps) {
  const variants = {
    navy: "bg-navy-50 text-navy-700",
    red: "bg-express-600 text-white",
    outline: "border border-zinc-200 bg-white text-zinc-600",
    success: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-2xl px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.15em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}