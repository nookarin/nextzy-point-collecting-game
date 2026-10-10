export interface RecordedPlay {
  score: number;
  playedAt: Date;
}

export abstract class GameRepository {
  /**
   * Atomically records a play: locks the player's row, computes the new
   * score with `calculateScore`, saves it, and adds a history entry.
   */
  abstract recordPlay(
    playerId: string,
    points: number,
    calculateScore: (currentScore: number) => number,
  ): Promise<RecordedPlay>;
}