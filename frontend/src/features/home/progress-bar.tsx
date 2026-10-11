import type { Checkpoint } from "@/lib/api/types";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { CheckIcon, CrownCoinIcon } from "./icons";

interface ProgressBarProps {
  score: number;
  maxScore: number;
  checkpoints: Checkpoint[];
}

export function ProgressBar({ score, maxScore, checkpoints }: ProgressBarProps) {
  const percent = Math.min(score / maxScore, 1) * 100;
  const position = (value: number) => `${(value / maxScore) * 100}%`;

  return (
    <div className="px-3 pt-3">
      <div className="relative h-4">
        {checkpoints.map((checkpoint) => (
          <span
            key={checkpoint.id}
            className="absolute top-0 -translate-x-1/2 text-[9px] text-muted"
            style={{ left: position(checkpoint.threshold) }}
          >
            {formatNumber(checkpoint.threshold)}
          </span>
        ))}
      </div>

      <div className="relative h-7">
        <div
          role="progressbar"
          aria-label="คะแนนสะสม"
          aria-valuemin={0}
          aria-valuemax={maxScore}
          aria-valuenow={score}
          className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-orange-100"
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-orange-300 to-brand-red transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <span
          aria-hidden
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red ring-2 ring-white"
          style={{ left: `${percent}%` }}
        />

        {checkpoints.map((checkpoint) => (
          <span
            key={checkpoint.id}
            aria-hidden
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: position(checkpoint.threshold) }}
          >
            {checkpoint.threshold === maxScore ? (
              <CrownCoinIcon className="size-6" />
            ) : (
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-full text-white ring-2 ring-white",
                  checkpoint.status === "claimed" && "bg-green-700",
                  checkpoint.status === "claimable" && "bg-neutral-400",
                  checkpoint.status === "locked" && "bg-neutral-200",
                )}
              >
                {checkpoint.status !== "locked" && <CheckIcon className="size-3" />}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}