import { ApiProperty } from '@nestjs/swagger';
import { CHECKPOINT_STATUSES, CheckpointStatus } from '../../../../domain/checkpoint.js';

export class CheckpointResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 5000 })
  threshold: number;

  @ApiProperty({ example: 'รางวัล A' })
  rewardName: string;

  @ApiProperty({ enum: CHECKPOINT_STATUSES, example: 'claimable' })
  status: CheckpointStatus;
}

export class PlayerStatusResponse {
  @ApiProperty({ format: 'uuid' })
  playerId: string;

  @ApiProperty({ example: 8500 })
  score: number;

  @ApiProperty({ example: 10000 })
  maxScore: number;

  @ApiProperty({ type: [CheckpointResponse] })
  checkpoints: CheckpointResponse[];
}

export class PlayHistoryItemResponse {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 1000 })
  points: number;

  @ApiProperty({ type: String, format: 'date-time' })
  playedAt: Date;
}

export class RewardHistoryItemResponse {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 1 })
  checkpointId: number;

  @ApiProperty({ example: 'รางวัล A' })
  rewardName: string;

  @ApiProperty({ type: String, format: 'date-time' })
  claimedAt: Date;
}