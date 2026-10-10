import { ApiProperty } from '@nestjs/swagger';

export class ClaimResultResponse {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 1 })
  checkpointId: number;

  @ApiProperty({ example: 'รางวัล A' })
  rewardName: string;

  @ApiProperty({ type: String, format: 'date-time' })
  claimedAt: Date;
}