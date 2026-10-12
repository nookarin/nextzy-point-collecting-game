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
        "flex h-[38px] min-w-0 flex-1 items-center justify-center rounded-[12.5px] text-[24px] font-semibold leading-none text-game-text transition-colors duration-300",
        state === "idle" && "bg-brand-teal",
        state === "eliminated" && "bg-transparent text-game-text/50",
        state === "winner" && "bg-brand-lime",
        isPulsing && "motion-safe:animate-pulse",
      )}
    >
      {formatNumber(points)}
    </li>
  );
}
