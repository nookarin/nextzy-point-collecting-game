import { GetPlayerStatusUseCase } from './get-player-status.use-case.js';
import { PlayerRepository } from './player.repository.js';

const PLAYER_ID = '6f1c2a3e-8b4d-4e5f-9a6b-7c8d9e0f1a2b';

function createRepository(score: number, claimedIds: number[]): PlayerRepository {
  return {
    findOrCreate: async (id) => ({ id, score }),
    findCheckpoints: async () => [
      { id: 1, threshold: 5000, rewardName: 'รางวัล A', isClaimed: claimedIds.includes(1) },
      { id: 2, threshold: 7500, rewardName: 'รางวัล B', isClaimed: claimedIds.includes(2) },
      { id: 3, threshold: 10000, rewardName: 'รางวัล C', isClaimed: claimedIds.includes(3) },
    ],
    findPlayHistory: async () => [],
    findRewardHistory: async () => [],
    delete: async () => {},
  };
}

describe('GetPlayerStatusUseCase', () => {
  it('แต้ม 8500 โดยรับรางวัล A ไปแล้ว', async () => {
    const useCase = new GetPlayerStatusUseCase(createRepository(8500, [1]));

    const status = await useCase.execute(PLAYER_ID);

    expect(status.score).toBe(8500);
    expect(status.maxScore).toBe(10000);
    expect(status.checkpoints.map((c) => c.status)).toEqual([
      'claimed',
      'claimable',
      'locked',
    ]);
  });

  it('ล็อค checkpoint ทั้งหมด สำหรับผู้เล่นใหม่', async () => {
    const useCase = new GetPlayerStatusUseCase(createRepository(0, []));

    const status = await useCase.execute(PLAYER_ID);

    expect(status.checkpoints.every((c) => c.status === 'locked')).toBe(true);
  });
});