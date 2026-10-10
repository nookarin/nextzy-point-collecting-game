export interface ClaimContext {
  score: number;
  checkpoint: { id: number; threshold: number; rewardName: string } | null;
  isClaimed: boolean;
}

export interface CreatedClaim {
  id: string;
  claimedAt: Date;
}

export abstract class RewardRepository {
  abstract findClaimContext(playerId: string, checkpointId: number): Promise<ClaimContext>;

  /** Throws RewardAlreadyClaimedError ถ้ารางวัลโดนเตลมไปแล้ว */
  abstract createClaim(playerId: string, checkpointId: number): Promise<CreatedClaim>;
}