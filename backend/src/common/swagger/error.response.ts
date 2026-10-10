import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'RewardAlreadyClaimedError' })
  error: string;

  @ApiProperty({ example: 'Reward for checkpoint 1 has already been claimed' })
  message: string;
}