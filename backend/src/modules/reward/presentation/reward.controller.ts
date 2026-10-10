import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PlayerId } from '../../../common/decorators/player-id.decorator.js';
import { ClaimRewardUseCase } from '../application/claim-reward.use-case.js';

@Controller('players/me/checkpoints')
export class RewardController {
  constructor(private readonly claimReward: ClaimRewardUseCase) {}

  @Post(':checkpointId/claim')
  claim(
    @PlayerId() playerId: string,
    @Param('checkpointId', ParseIntPipe) checkpointId: number,
  ) {
    return this.claimReward.execute(playerId, checkpointId);
  }
}