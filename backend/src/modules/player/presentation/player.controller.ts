import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PlayerId } from '../../../common/decorators/player-id.decorator.js';
import { GetPlayHistoryUseCase } from '../application/get-play-history.use-case.js';
import { GetPlayerStatusUseCase } from '../application/get-player-status.use-case.js';
import { GetRewardHistoryUseCase } from '../application/get-reward-history.use-case.js';
import { ResetPlayerUseCase } from '../application/reset-player.use-case.js';

@Controller('players/me')
export class PlayerController {
  constructor(
    private readonly getPlayerStatus: GetPlayerStatusUseCase,
    private readonly getPlayHistory: GetPlayHistoryUseCase,
    private readonly getRewardHistory: GetRewardHistoryUseCase,
    private readonly resetPlayer: ResetPlayerUseCase,
  ) {}

  @Get()
  getStatus(@PlayerId() playerId: string) {
    return this.getPlayerStatus.execute(playerId);
  }

  @Get('plays')
  getPlays(@PlayerId() playerId: string) {
    return this.getPlayHistory.execute(playerId);
  }

  @Get('rewards')
  getRewards(@PlayerId() playerId: string) {
    return this.getRewardHistory.execute(playerId);
  }

  @Post('reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reset(@PlayerId() playerId: string): Promise<void> {
    await this.resetPlayer.execute(playerId);
  }
}