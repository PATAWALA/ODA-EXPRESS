import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl";
}) {
  const sizes = {
    md: "max-w-3xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };
  return (
    <div className={cn("mx-auto px-4 sm:px-6", sizes[size], className)}>
      {children}
    </div>
  );
}
