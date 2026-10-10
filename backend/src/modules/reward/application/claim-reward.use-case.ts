import { Injectable } from '@nestjs/common';
import { getCheckpointStatus } from '../../../domain/checkpoint.js';
import {
  CheckpointLockedError,
  CheckpointNotFoundError,
  RewardAlreadyClaimedError,
} from '../../../domain/errors.js';
import { RewardRepository } from './reward.repository.js';

export interface ClaimResult {
  id: string;
  checkpointId: number;
  rewardName: string;
  claimedAt: Date;
}

@Injectable()
export class ClaimRewardUseCase {
  constructor(private readonly rewards: RewardRepository) {}

  async execute(playerId: string, checkpointId: number): Promise<ClaimResult> {
    const { score, checkpoint, isClaimed } = await this.rewards.findClaimContext(
      playerId,
      checkpointId,
    );

    if (!checkpoint) throw new CheckpointNotFoundError(checkpointId);

    const status = getCheckpointStatus(score, checkpoint.threshold, isClaimed);
    if (status === 'claimed') throw new RewardAlreadyClaimedError(checkpointId);
    if (status === 'locked') throw new CheckpointLockedError(checkpointId);

    const claim = await this.rewards.createClaim(playerId, checkpointId);

    return {
      id: claim.id,
      checkpointId,
      rewardName: checkpoint.rewardName,
      claimedAt: claim.claimedAt,
    };
  }
}