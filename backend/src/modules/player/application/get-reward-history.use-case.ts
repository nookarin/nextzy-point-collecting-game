import { Injectable } from '@nestjs/common';
import { PlayerRepository, RewardHistoryItem } from './player.repository.js';

@Injectable()
export class GetRewardHistoryUseCase {
  constructor(private readonly players: PlayerRepository) {}

  execute(playerId: string): Promise<RewardHistoryItem[]> {
    return this.players.findRewardHistory(playerId);
  }
}