import { ApiProperty } from '@nestjs/swagger';
import { POINT_OPTIONS, PointOption } from '../../../../domain/score.js';

export class PlayResultResponse {
  @ApiProperty({ enum: POINT_OPTIONS, example: 1000, description: 'Points won this round' })
  points: PointOption;

  @ApiProperty({ example: 9500, description: 'New total, capped at maxScore' })
  score: number;

  @ApiProperty({ example: 10000 })
  maxScore: number;

  @ApiProperty({ type: String, format: 'date-time' })
  playedAt: Date;
}