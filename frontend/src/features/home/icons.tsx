import Image from "next/image";
import checkClaimed from "@/assets/icon/check-claimed.png";
import checkReached from "@/assets/icon/check-reached.png";
import crownImage from "@/assets/icon/crown.png";

export function CrownCoinIcon({ size, className }: { size: number; className?: string }) {
  return <Image src={crownImage} alt="" width={size} height={size} className={className} aria-hidden />;
}

export function CheckpointCheckIcon({ claimed }: { claimed: boolean }) {
  return (
    <Image src={claimed ? checkClaimed : checkReached} alt="" width={20} height={20} aria-hidden />
  );
}