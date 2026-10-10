import { Controller, Post } from '@nestjs/common';
import { PlayerId } from '../../../common/decorators/player-id.decorator.js';
import { PlayGameUseCase } from '../application/play-game.use-case.js';

@Controller('players/me/plays')
export class GameController {
  constructor(private readonly playGame: PlayGameUseCase) {}

  @Post()
  play(@PlayerId() playerId: string) {
    return this.playGame.execute(playerId);
  }
}