import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlayerId } from '../../../common/decorators/player-id.decorator.js';
import { ApiPlayerAuth } from '../../../common/swagger/api-player-auth.decorator.js';
import { PlayGameUseCase } from '../application/play-game.use-case.js';
import { PlayResultResponse } from './dto/play-result.response.js';

@ApiTags('Game')
@ApiPlayerAuth()
@Controller('players/me/plays')
export class GameController {
  constructor(private readonly playGame: PlayGameUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Play one round: the server picks the points and adds them to the score' })
  @ApiCreatedResponse({ type: PlayResultResponse })
  play(@PlayerId() playerId: string): Promise<PlayResultResponse> {
    return this.playGame.execute(playerId);
  }
}