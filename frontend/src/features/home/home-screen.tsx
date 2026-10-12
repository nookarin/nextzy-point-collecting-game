"use client";

import Link from "next/link";
import { useState } from "react";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";
import { ErrorState } from "@/components/ui/error-state";
import { Modal } from "@/components/ui/modal";
import { PillButton, pillClasses } from "@/components/ui/pill-button";
import { getErrorMessage } from "@/lib/api/error-messages";
import { HistoryTabs } from "./history-tabs";
import { CrownCoinIcon } from "./icons";
import { ScoreCard, ScoreCardSkeleton } from "./score-card";
import { useHomeData } from "./use-home-data";

export function HomeScreen() {
  const { status, plays, rewards, claim, reset, claimReward, resetProgress } =
    useHomeData();
  const [claimedRewardName, setClaimedRewardName] = useState<string>();

  async function handleClaim(checkpointId: number) {
    const result = await claimReward(checkpointId);
    if (result) setClaimedRewardName(result.rewardName);
  }

  return (
    <>
      <main className="flex flex-1 flex-col">
        <section className="h-[228px] bg-band px-4 pt-[15px]">
          {status.isLoading && <ScoreCardSkeleton />}
          {status.error && !status.data && (
            <div className="rounded-[16px] bg-white">
              <ErrorState
                message={getErrorMessage(status.error)}
                onRetry={status.refetch}
              />
            </div>
          )}
          {status.data && (
            <ScoreCard
              status={status.data}
              onClaim={handleClaim}
              isClaiming={claim.isPending}
            />
          )}
        </section>

        <div className="flex justify-center pb-[29px] pt-[22px]">
          <PillButton
            variant="blue"
            size="reset"
            onClick={resetProgress}
            disabled={reset.isPending}
          >
            RESET
          </PillButton>
        </div>

        <HistoryTabs plays={plays} rewards={rewards} />
      </main>

      <BottomActionBar>
        <Link href="/game" className={pillClasses("yellow", "lg")}>
          ไปเล่นเกม
        </Link>
      </BottomActionBar>

      <Modal
        open={claimedRewardName !== undefined}
        onClose={() => setClaimedRewardName(undefined)}
        icon={<CrownCoinIcon size={64} />}
        title="ยินดีด้วย"
        message={`คุณได้รับ${claimedRewardName ?? ""}`}
      />

      <Modal
        open={claim.error !== undefined}
        onClose={claim.clearError}
        title="ไม่สามารถรับรางวัลได้"
        message={claim.error ? getErrorMessage(claim.error) : ""}
      />
    </>
  );
}
