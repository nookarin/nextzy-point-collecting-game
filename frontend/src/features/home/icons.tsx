import Image from "next/image";
import crownImage from "@/assets/icon/crown.png";

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className}>
      <path d="M4 8.5 7 11l5-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CrownCoinIcon({ size, className }: { size: number; className?: string }) {
  return (
    <Image src={crownImage} alt="" width={size} height={size} className={className} aria-hidden />
  );
}