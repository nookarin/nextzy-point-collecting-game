"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { useApiQuery } from "@/hooks/use-api-query";
import { playerApi } from "@/lib/api/player-api";

export function useHomeData() {
  const status = useApiQuery(playerApi.getStatus);
  const plays = useApiQuery(playerApi.getPlays);
  const rewards = useApiQuery(playerApi.getRewards);
  const claim = useApiMutation(playerApi.claim);
  const reset = useApiMutation(playerApi.reset);

  async function claimReward(checkpointId: number) {
    const result = await claim.mutate(checkpointId);
    if (result) {
      status.refetch();
      rewards.refetch();
    }
    return result;
  }

  async function resetProgress() {
    await reset.mutate();
    status.refetch();
    plays.refetch();
    rewards.refetch();
  }

  return { status, plays, rewards, claim, reset, claimReward, resetProgress };
}