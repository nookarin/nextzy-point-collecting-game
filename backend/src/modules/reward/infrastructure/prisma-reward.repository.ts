import { Injectable } from '@nestjs/common';
import { RewardAlreadyClaimedError } from '../../../domain/errors.js';
import { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../../infrastructure/database/prisma.service.js';
import {
  ClaimContext,
  CreatedClaim,
  RewardRepository,
} from '../application/reward.repository.js';

@Injectable()
export class PrismaRewardRepository extends RewardRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findClaimContext(playerId: string, checkpointId: number): Promise<ClaimContext> {
    const [player, checkpoint, claim] = await Promise.all([
      this.prisma.player.findUnique({ where: { id: playerId }, select: { score: true } }),
      this.prisma.checkpoint.findUnique({ where: { id: checkpointId } }),
      this.prisma.rewardClaim.findUnique({
        where: { playerId_checkpointId: { playerId, checkpointId } },
        select: { id: true },
      }),
    ]);

    return {
      score: player?.score ?? 0,
      checkpoint,
      isClaimed: claim !== null,
    };
  }

  async createClaim(playerId: string, checkpointId: number): Promise<CreatedClaim> {
    try {
      return await this.prisma.rewardClaim.create({
        data: { playerId, checkpointId },
        select: { id: true, claimedAt: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new RewardAlreadyClaimedError(checkpointId);
      }
      throw error;
    }
  }
}