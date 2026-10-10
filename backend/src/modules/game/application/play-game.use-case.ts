import { Injectable } from '@nestjs/common';
import { addToScore, MAX_SCORE, pickPoints, PointOption } from '../../../domain/score.js';
import { GameRepository } from './game.repository.js';

export interface PlayResult {
  points: PointOption;
  score: number;
  maxScore: number;
  playedAt: Date;
}

@Injectable()
export class PlayGameUseCase {
  constructor(private readonly game: GameRepository) {}

  async execute(playerId: string): Promise<PlayResult> {
    const points = pickPoints();
    const { score, playedAt } = await this.game.recordPlay(
      playerId,
      points,
      (currentScore) => addToScore(currentScore, points),
    );

    return { points, score, maxScore: MAX_SCORE, playedAt };
  }
}