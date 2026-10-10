import { Injectable } from '@nestjs/common';
import { PlayerRepository } from './player.repository.js';

@Injectable()
export class ResetPlayerUseCase {
  constructor(private readonly players: PlayerRepository) {}

  execute(playerId: string): Promise<void> {
    return this.players.delete(playerId);
  }
}