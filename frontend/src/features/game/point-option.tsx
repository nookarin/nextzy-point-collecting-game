import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

export type PointOptionState = "idle" | "eliminated" | "winner";

interface PointOptionProps {
  points: number;
  state: PointOptionState;
  isPulsing: boolean;
}

export function PointOption({ points, state, isPulsing }: PointOptionProps) {
  return (
    <li
      className={cn(
        "flex h-10 min-w-0 flex-1 items-center justify-center rounded-lg text-base font-semibold transition-colors duration-300 sm:text-lg",
        state === "idle" && "bg-brand-teal text-white",
        state === "eliminated" && "bg-transparent text-brand-teal/60",
        state === "winner" && "bg-brand-lime text-white",
        isPulsing && "motion-safe:animate-pulse",
      )}
    >
      {formatNumber(points)}
    </li>
  );
}