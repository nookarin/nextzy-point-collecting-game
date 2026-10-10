import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { PlayerModule } from './modules/player/player.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    PlayerModule,
  ],
})
export class AppModule {}
