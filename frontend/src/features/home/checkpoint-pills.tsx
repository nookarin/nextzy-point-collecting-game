import { PillButton, pillClasses } from "@/components/ui/pill-button";
import type { Checkpoint } from "@/lib/api/types";

interface CheckpointPillsProps {
  checkpoints: Checkpoint[];
  onClaim: (checkpointId: number) => void;
  isClaiming: boolean;
}

export function CheckpointPills({ checkpoints, onClaim, isClaiming }: CheckpointPillsProps) {
  return (
    <div className="absolute bottom-[14px] right-[8px] flex gap-[10px]">
      {checkpoints.map((checkpoint) => {
        if (checkpoint.status === "claimed") {
          return (
            <span key={checkpoint.id} className={pillClasses("claimed", "sm")}>
              ได้รับ{checkpoint.rewardName} แล้ว
            </span>
          );
        }

        const isLocked = checkpoint.status === "locked";
        return (
          <PillButton
            key={checkpoint.id}
            size="sm"
            variant={isLocked ? "locked" : "claim"}
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