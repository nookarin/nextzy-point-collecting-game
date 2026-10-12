import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

interface HistoryItemProps {
  variant: "play" | "reward";
  title: string;
  subtitle: string;
}

const AVATAR = {
  play: "bg-linear-to-b from-brand-red to-red-900",
  reward: "bg-[linear-gradient(180deg,#091050_0%,#5d1cf4_64.58%)]",
} as const;

export function HistoryItem({ variant, title, subtitle }: HistoryItemProps) {
  return (
    <li className="flex h-[82px] items-center gap-[22px] border-b border-divider pl-[25px] pr-4">
      <span aria-hidden className={cn("size-12 shrink-0 rounded-full", AVATAR[variant])} />
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold leading-none text-strong">{title}</p>
        <p className="mt-[10px] text-[12px] leading-none text-subtle">{subtitle}</p>
      </div>
    </li>
  );
}

export function HistoryItemSkeleton() {
  return (
    <li className="flex h-[82px] items-center gap-[22px] border-b border-divider pl-[25px] pr-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="flex flex-col gap-[10px]">
        <Skeleton className="h-[15px] w-32" />
        <Skeleton className="h-3 w-40" />
      </div>
    </li>
  );
}