import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './common/filters/domain-exception.filter.js';
import { PrismaModule } from './infrastructure/database/prisma.module.js';
import { GameModule } from './modules/game/game.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { PlayerModule } from './modules/player/player.module.js';
import { RewardModule } from './modules/reward/reward.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    PlayerModule,
    GameModule,
    RewardModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: DomainExceptionFilter }],
})
export class AppModule {}