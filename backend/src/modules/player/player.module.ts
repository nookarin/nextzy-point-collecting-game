import { Module } from '@nestjs/common';
import { GetPlayHistoryUseCase } from './application/get-play-history.use-case.js';
import { GetPlayerStatusUseCase } from './application/get-player-status.use-case.js';
import { GetRewardHistoryUseCase } from './application/get-reward-history.use-case.js';
import { PlayerRepository } from './application/player.repository.js';
import { ResetPlayerUseCase } from './application/reset-player.use-case.js';
import { PrismaPlayerRepository } from './infrastructure/prisma-player.repository.js';
import { PlayerController } from './presentation/player.controller.js';

@Module({
  controllers: [PlayerController],
  providers: [
    GetPlayerStatusUseCase,
    GetPlayHistoryUseCase,
    GetRewardHistoryUseCase,
    ResetPlayerUseCase,
    { provide: PlayerRepository, useClass: PrismaPlayerRepository },
  ],
})
export class PlayerModule {}