import { Module } from '@nestjs/common';
import { GameRepository } from './application/game.repository.js';
import { PlayGameUseCase } from './application/play-game.use-case.js';
import { PrismaGameRepository } from './infrastructure/prisma-game.repository.js';
import { GameController } from './presentation/game.controller.js';

@Module({
  controllers: [GameController],
  providers: [
    PlayGameUseCase,
    { provide: GameRepository, useClass: PrismaGameRepository },
  ],
})
export class GameModule {}