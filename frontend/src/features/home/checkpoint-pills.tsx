import { PillButton, pillClasses } from "@/components/ui/pill-button";
import type { Checkpoint } from "@/lib/api/types";

interface CheckpointPillsProps {
  checkpoints: Checkpoint[];
  onClaim: (checkpointId: number) => void;
  isClaiming: boolean;
}

export function CheckpointPills({ checkpoints, onClaim, isClaiming }: CheckpointPillsProps) {
  return (
    <div className="mt-1 flex flex-wrap justify-end gap-1.5">
      {checkpoints.map((checkpoint) => {
        if (checkpoint.status === "claimed") {
          return (
            <span key={checkpoint.id} className={pillClasses("soft", "sm")}>
              ได้รับ{checkpoint.rewardName} แล้ว
            </span>
          );
        }

        const isLocked = checkpoint.status === "locked";
        return (
          <PillButton
            key={checkpoint.id}
            size="sm"
            variant={isLocked ? "muted" : "red"}
            disabled={isLocked || isClaiming}
            onClick={() => onClaim(checkpoint.id)}
          >
            กดรับ{checkpoint.rewardName}
          </PillButton>
        );
      })}
    </div>
  );
}