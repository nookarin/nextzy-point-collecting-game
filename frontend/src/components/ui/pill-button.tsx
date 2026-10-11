import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const BASE =
  "inline-flex items-center justify-center rounded-full font-semibold transition " +
  "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

const VARIANTS = {
  yellow: "bg-brand-yellow text-white",
  red: "bg-brand-red text-white",
  soft: "bg-brand-red-soft text-white",
  blue: "bg-brand-blue text-white",
  muted: "bg-neutral-200 text-neutral-400",
  outline: "border border-neutral-300 bg-white text-muted",
} as const;

const SIZES = {
  sm: "h-6 px-2.5 text-[11px]",
  md: "h-9 px-5 text-sm",
  lg: "h-12 w-full text-base",
} as const;

export type PillVariant = keyof typeof VARIANTS;
export type PillSize = keyof typeof SIZES;

export function pillClasses(variant: PillVariant = "yellow", size: PillSize = "md", className?: string) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: PillVariant;
  size?: PillSize;
};

export function PillButton({ variant, size, type = "button", className, ...props }: PillButtonProps) {
  return <button type={type} className={pillClasses(variant, size, className)} {...props} />;
}