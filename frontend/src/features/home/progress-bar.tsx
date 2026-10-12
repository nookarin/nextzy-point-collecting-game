import type { Checkpoint } from "@/lib/api/types";
import { formatNumber } from "@/lib/format";
import { CheckpointCheckIcon, CrownCoinIcon } from "./icons";

interface ProgressBarProps {
  score: number;
  maxScore: number;
  checkpoints: Checkpoint[];
}

const CENTER = "top-[37px] -translate-x-1/2 -translate-y-1/2";

export function ProgressBar({ score, maxScore, checkpoints }: ProgressBarProps) {
  const toPercent = (value: number) => `${(Math.min(value, maxScore) / maxScore) * 100}%`;

  return (
    <div className="absolute left-[18px] right-[31px] top-[104px] h-[52px]">
      {checkpoints.map((checkpoint) => (
        <span
          key={`label-${checkpoint.id}`}
          className="absolute top-[2px] -translate-x-1/2 text-[10px] leading-none text-label"
          style={{ left: toPercent(checkpoint.threshold) }}
        >
          {formatNumber(checkpoint.threshold)}
        </span>
      ))}

      <div
        role="progressbar"
        aria-label="คะแนนสะสม"
        aria-valuemin={0}
        aria-valuemax={maxScore}
        aria-valuenow={score}
        className="absolute inset-x-0 top-[37px] h-[9px] -translate-y-1/2 overflow-hidden rounded-full bg-track"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-[#ff8158] to-[#ff8902] transition-[width] duration-500"
          style={{ width: toPercent(score) }}
        />
      </div>

      <span
        aria-hidden
        className={`absolute ${CENTER} size-[18px] rounded-full bg-linear-to-b from-[#ff0004] to-[#fc8625]`}
        style={{ left: toPercent(score) }}
      />

      {checkpoints.map((checkpoint) => (
        <span
          key={`marker-${checkpoint.id}`}
          aria-hidden
          className={`absolute ${CENTER} grid place-items-center`}
          style={{ left: toPercent(checkpoint.threshold) }}
        >
          {checkpoint.threshold === maxScore ? (
            <CrownCoinIcon size={30} />
          ) : (
            checkpoint.status !== "locked" && (
              <CheckpointCheckIcon claimed={checkpoint.status === "claimed"} />
            )
          )}
        </span>
      ))}
    </div>
  );
}