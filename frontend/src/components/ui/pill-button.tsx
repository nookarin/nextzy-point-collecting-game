import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const BASE =
  "inline-flex items-center justify-center whitespace-nowrap leading-none font-semibold transition " +
  "active:scale-[0.98] disabled:cursor-not-allowed " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

const VARIANTS = {
  yellow: "bg-brand-yellow text-white",
  red: "bg-brand-red text-white disabled:opacity-30",
  claim: "bg-brand-claim text-white",
  claimed: "bg-brand-claimed text-white",
  locked: "bg-brand-locked text-white",
  blue: "bg-brand-blue text-white",
  outline: "border border-muted bg-white text-muted",
} as const;

const SIZES = {
  sm: "h-[20px] w-[60px] rounded-full text-[8px]",
  md: "h-[35px] rounded-full px-5 text-[16px]",
  lg: "h-[48px] w-full rounded-full text-[20px]",
  reset: "h-[27px] w-[85px] rounded-[12.5px] text-[20px]",
  game: "h-[38px] w-[120px] rounded-[12.5px] text-[20px]",
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