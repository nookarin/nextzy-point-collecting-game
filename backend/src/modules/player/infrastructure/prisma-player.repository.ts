import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service.js';
import {
  CheckpointRecord,
  PlayHistoryItem,
  PlayerRecord,
  PlayerRepository,
  RewardHistoryItem,
} from '../application/player.repository.js';

@Injectable()
export class PrismaPlayerRepository extends PlayerRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  findOrCreate(playerId: string): Promise<PlayerRecord> {
    return this.prisma.player.upsert({
      where: { id: playerId },
      update: {},
      create: { id: playerId },
      select: { id: true, score: true },
    });
  }

  async findCheckpoints(playerId: string): Promise<CheckpointRecord[]> {
    const checkpoints = await this.prisma.checkpoint.findMany({
      orderBy: { threshold: 'asc' },
      include: {
        claims: { where: { playerId }, select: { id: true } },
      },
    });

    return checkpoints.map((checkpoint) => ({
      id: checkpoint.id,
      threshold: checkpoint.threshold,
      rewardName: checkpoint.rewardName,
      isClaimed: checkpoint.claims.length > 0,
    }));
  }

  async findPlayHistory(playerId: string): Promise<PlayHistoryItem[]> {
    const plays = await this.prisma.playHistory.findMany({
      where: { playerId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, points: true, createdAt: true },
    });

    return plays.map((play) => ({
      id: play.id,
      points: play.points,
      playedAt: play.createdAt,
    }));
  }

  async findRewardHistory(playerId: string): Promise<RewardHistoryItem[]> {
    const claims = await this.prisma.rewardClaim.findMany({
      where: { playerId },
      orderBy: { claimedAt: 'desc' },
      include: { checkpoint: { select: { rewardName: true } } },
    });

    return claims.map((claim) => ({
      id: claim.id,
      checkpointId: claim.checkpointId,
      rewardName: claim.checkpoint.rewardName,
      claimedAt: claim.claimedAt,
    }));
  }

  async delete(playerId: string): Promise<void> {
    await this.prisma.player.deleteMany({ where: { id: playerId } });
  }
}