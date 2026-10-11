import { Skeleton } from "@/components/ui/skeleton";
import type { PlayerStatus } from "@/lib/api/types";
import { formatNumber } from "@/lib/format";
import { CheckpointPills } from "./checkpoint-pills";
import { ProgressBar } from "./progress-bar";

const CARD = "rounded-2xl border-2 border-ink bg-white px-3 pb-3 pt-4";

interface ScoreCardProps {
  status: PlayerStatus;
  onClaim: (checkpointId: number) => void;
  isClaiming: boolean;
}

export function ScoreCard({ status, onClaim, isClaiming }: ScoreCardProps) {
  return (
    <div className={CARD}>
      <div className="text-right">
        <h1 className="text-base font-semibold">สะสมคะแนน</h1>
        <p className="text-xs">คะแนนครบ {formatNumber(status.maxScore)} รับรางวัลใหญ่</p>
        <p className="text-2xl font-semibold text-brand-red">
          {formatNumber(status.score)}/{formatNumber(status.maxScore)}
        </p>
      </div>
      <ProgressBar score={status.score} maxScore={status.maxScore} checkpoints={status.checkpoints} />
      <CheckpointPills checkpoints={status.checkpoints} onClaim={onClaim} isClaiming={isClaiming} />
    </div>
  );
}

export function ScoreCardSkeleton() {
  return (
    <div className={CARD} aria-busy="true" aria-label="กำลังโหลดคะแนน">
      <div className="flex flex-col items-end gap-1.5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-7 w-36" />
      </div>
      <Skeleton className="mt-6 h-2 w-full rounded-full" />
      <div className="mt-4 flex justify-end gap-1.5">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}