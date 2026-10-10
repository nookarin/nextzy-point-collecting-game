import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PlayerId } from '../../../common/decorators/player-id.decorator.js';
import { ApiPlayerAuth } from '../../../common/swagger/api-player-auth.decorator.js';
import { ErrorResponse } from '../../../common/swagger/error.response.js';
import { ClaimRewardUseCase } from '../application/claim-reward.use-case.js';
import { ClaimResultResponse } from './dto/claim-result.response.js';

@ApiTags('Reward')
@ApiPlayerAuth()
@Controller('players/me/checkpoints')
export class RewardController {
  constructor(private readonly claimReward: ClaimRewardUseCase) {}

  @Post(':checkpointId/claim')
  @ApiOperation({ summary: "Claim a checkpoint's reward once the score has reached it" })
  @ApiParam({ name: 'checkpointId', example: 1 })
  @ApiCreatedResponse({ type: ClaimResultResponse })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Checkpoint does not exist' })
  @ApiConflictResponse({ type: ErrorResponse, description: 'Reward already claimed' })
  @ApiUnprocessableEntityResponse({ type: ErrorResponse, description: 'Score has not reached the checkpoint' })
  claim(
    @PlayerId() playerId: string,
    @Param('checkpointId', ParseIntPipe) checkpointId: number,
  ): Promise<ClaimResultResponse> {
    return this.claimReward.execute(playerId, checkpointId);
  }
}