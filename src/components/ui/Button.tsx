import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "whatsapp" | "white";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-express-600 text-white shadow-sm transition hover:bg-express-700 hover:shadow-md",
  outline:
    "border border-navy-900 bg-white text-navy-900 transition hover:bg-navy-50",
  ghost: "text-navy-900 transition hover:bg-navy-50",
  whatsapp:
    "bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md",
  white: "bg-white text-navy-900 shadow-md transition hover:shadow-lg",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[12px]",
  md: "px-6 py-3 text-[13px]",
  lg: "px-8 py-4 text-[14px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-50";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  target,
  rel,
}: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (target === "_blank" || href.startsWith("http")) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}