import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service.js';
import { GameRepository, RecordedPlay } from '../application/game.repository.js';

@Injectable()
export class PrismaGameRepository extends GameRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  recordPlay(
    playerId: string,
    points: number,
    calculateScore: (currentScore: number) => number,
  ): Promise<RecordedPlay> {
    return this.prisma.$transaction(async (tx) => {
      await tx.player.upsert({
        where: { id: playerId },
        update: {},
        create: { id: playerId },
      });

      const [{ score: currentScore }] = await tx.$queryRaw<{ score: number }[]>`
        SELECT score FROM players WHERE id = ${playerId}::uuid FOR UPDATE
      `;

      const score = calculateScore(currentScore);

      await tx.player.update({ where: { id: playerId }, data: { score } });
      const play = await tx.playHistory.create({
        data: { playerId, points },
        select: { createdAt: true },
      });

      return { score, playedAt: play.createdAt };
    });
  }
}