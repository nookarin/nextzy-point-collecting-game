import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const VARIANTS = {
  yellow: "bg-brand-yellow text-white",
  red: "bg-brand-red text-white",
  blue: "bg-brand-blue text-white",
  outline: "border border-neutral-300 bg-white text-muted",
} as const;

const SIZES = {
  sm: "h-6 px-2.5 text-[11px]",
  md: "h-9 px-5 text-sm",
  lg: "h-12 w-full text-base",
} as const;

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
};

export function PillButton({
  variant = "yellow",
  size = "md",
  type = "button",
  className,
  ...props
}: PillButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition",
        "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}