import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlayerId } from '../../../common/decorators/player-id.decorator.js';
import { ApiPlayerAuth } from '../../../common/swagger/api-player-auth.decorator.js';
import { GetPlayHistoryUseCase } from '../application/get-play-history.use-case.js';
import { GetPlayerStatusUseCase } from '../application/get-player-status.use-case.js';
import { GetRewardHistoryUseCase } from '../application/get-reward-history.use-case.js';
import { ResetPlayerUseCase } from '../application/reset-player.use-case.js';
import {
  PlayHistoryItemResponse,
  PlayerStatusResponse,
  RewardHistoryItemResponse,
} from './dto/player.responses.js';

@ApiTags('Player')
@ApiPlayerAuth()
@Controller('players/me')
export class PlayerController {
  constructor(
    private readonly getPlayerStatus: GetPlayerStatusUseCase,
    private readonly getPlayHistory: GetPlayHistoryUseCase,
    private readonly getRewardHistory: GetRewardHistoryUseCase,
    private readonly resetPlayer: ResetPlayerUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get score and checkpoint statuses (creates the player on first call)' })
  @ApiOkResponse({ type: PlayerStatusResponse })
  getStatus(@PlayerId() playerId: string): Promise<PlayerStatusResponse> {
    return this.getPlayerStatus.execute(playerId);
  }

  @Get('plays')
  @ApiOperation({ summary: 'Get play history, newest first' })
  @ApiOkResponse({ type: [PlayHistoryItemResponse] })
  getPlays(@PlayerId() playerId: string): Promise<PlayHistoryItemResponse[]> {
    return this.getPlayHistory.execute(playerId);
  }

  @Get('rewards')
  @ApiOperation({ summary: 'Get reward history, newest first' })
  @ApiOkResponse({ type: [RewardHistoryItemResponse] })
  getRewards(@PlayerId() playerId: string): Promise<RewardHistoryItemResponse[]> {
    return this.getRewardHistory.execute(playerId);
  }

  @Post('reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete all score, plays, and claims for this player' })
  @ApiNoContentResponse({ description: 'Player data reset' })
  async reset(@PlayerId() playerId: string): Promise<void> {
    await this.resetPlayer.execute(playerId);
  }
}