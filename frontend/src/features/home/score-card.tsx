import { Skeleton } from "@/components/ui/skeleton";
import type { PlayerStatus } from "@/lib/api/types";
import { formatNumber } from "@/lib/format";
import { CheckpointPills } from "./checkpoint-pills";
import { ProgressBar } from "./progress-bar";

const CARD = "relative h-[200px] rounded-[16px] border border-black bg-white";

interface ScoreCardProps {
  status: PlayerStatus;
  onClaim: (checkpointId: number) => void;
  isClaiming: boolean;
}

export function ScoreCard({ status, onClaim, isClaiming }: ScoreCardProps) {
  return (
    <div className={CARD}>
      <span className="absolute -left-[3px] top-[15px] grid h-[22px] w-[70px] place-items-center rounded-tl-[4px] rounded-r-full bg-brand-tag text-[10px] leading-none text-white">
        แชร์รางวัล
      </span>

      <div className="absolute right-[15px] top-[26px] text-right text-ink">
        <h1 className="text-[16px] font-semibold leading-none">สะสมคะแนน</h1>
        <p className="mt-[6px] text-[12px] leading-none">
          คะแนนครบ {formatNumber(status.maxScore)} รับรางวัลใหญ่
        </p>
      </div>

      <p className="absolute right-[11px] top-[68px] text-[24px] font-semibold leading-none text-brand-red">
        {formatNumber(status.score)}/{formatNumber(status.maxScore)}
      </p>

      <ProgressBar
        score={status.score}
        maxScore={status.maxScore}
        checkpoints={status.checkpoints}
      />
      <CheckpointPills
        checkpoints={status.checkpoints}
        onClaim={onClaim}
        isClaiming={isClaiming}
      />
    </div>
  );
}

export function ScoreCardSkeleton() {
  return (
    <div className={CARD} aria-busy="true" aria-label="กำลังโหลดคะแนน">
      <div className="absolute right-[15px] top-[26px] flex flex-col items-end gap-[6px]">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-44" />
      </div>
      <Skeleton className="absolute right-[11px] top-[68px] h-6 w-36" />
      <Skeleton className="absolute left-[18px] right-[31px] top-[136px] h-[9px] rounded-full" />
      <div className="absolute bottom-[14px] right-[8px] flex gap-[10px]">
        <Skeleton className="h-[20px] w-[60px] rounded-full" />
        <Skeleton className="h-[20px] w-[60px] rounded-full" />
        <Skeleton className="h-[20px] w-[60px] rounded-full" />
      </div>
    </div>
  );
}
