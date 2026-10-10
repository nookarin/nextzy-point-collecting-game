import { Injectable } from '@nestjs/common';
import { PlayHistoryItem, PlayerRepository } from './player.repository.js';

@Injectable()
export class GetPlayHistoryUseCase {
  constructor(private readonly players: PlayerRepository) {}

  execute(playerId: string): Promise<PlayHistoryItem[]> {
    return this.players.findPlayHistory(playerId);
  }
}