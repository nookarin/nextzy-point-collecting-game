import { Injectable } from '@nestjs/common';
import { CheckpointStatus, getCheckpointStatus } from '../../../domain/checkpoint.js';
import { MAX_SCORE } from '../../../domain/score.js';
import { PlayerRepository } from './player.repository.js';

export interface PlayerStatus {
  playerId: string;
  score: number;
  maxScore: number;
  checkpoints: {
    id: number;
    threshold: number;
    rewardName: string;
    status: CheckpointStatus;
  }[];
}

@Injectable()
export class GetPlayerStatusUseCase {
  constructor(private readonly players: PlayerRepository) {}

  async execute(playerId: string): Promise<PlayerStatus> {
    const [player, checkpoints] = await Promise.all([
      this.players.findOrCreate(playerId),
      this.players.findCheckpoints(playerId),
    ]);

    return {
      playerId: player.id,
      score: player.score,
      maxScore: MAX_SCORE,
      checkpoints: checkpoints.map((checkpoint) => ({
        id: checkpoint.id,
        threshold: checkpoint.threshold,
        rewardName: checkpoint.rewardName,
        status: getCheckpointStatus(player.score, checkpoint.threshold, checkpoint.isClaimed),
      })),
    };
  }
}