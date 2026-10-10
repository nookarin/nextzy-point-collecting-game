import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    console.log('[prisma] creating client');
    super({
      adapter: new PrismaPg({
        connectionString: configService.getOrThrow<string>('DATABASE_URL'),
      }),
    });
    console.log('[prisma] client created');
  }

  async onModuleInit() {
    console.log('[prisma] connecting');
    await this.$connect();
    console.log('[prisma] connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
