import { Module } from '@nestjs/common';
import { ClaimRewardUseCase } from './application/claim-reward.use-case.js';
import { RewardRepository } from './application/reward.repository.js';
import { PrismaRewardRepository } from './infrastructure/prisma-reward.repository.js';
import { RewardController } from './presentation/reward.controller.js';

@Module({
  controllers: [RewardController],
  providers: [
    ClaimRewardUseCase,
    { provide: RewardRepository, useClass: PrismaRewardRepository },
  ],
})
export class RewardModule {}