import {
  CheckpointLockedError,
  CheckpointNotFoundError,
  RewardAlreadyClaimedError,
} from '../../../domain/errors.js';
import { ClaimRewardUseCase } from './claim-reward.use-case.js';
import { ClaimContext, RewardRepository } from './reward.repository.js';

const PLAYER_ID = '6f1c2a3e-8b4d-4e5f-9a6b-7c8d9e0f1a2b';
const CHECKPOINT_A = { id: 1, threshold: 5000, rewardName: 'รางวัล A' };

function createUseCase(context: ClaimContext) {
  const repository: RewardRepository = {
    findClaimContext: async () => context,
    createClaim: async () => ({ id: 'claim-1', claimedAt: new Date('2026-10-10') }),
  };
  return new ClaimRewardUseCase(repository);
}

describe('ClaimRewardUseCase', () => {
  it('checkpoint A ยังไม่เตลม', async () => {
    const useCase = createUseCase({ score: 5000, checkpoint: CHECKPOINT_A, isClaimed: false });

    const result = await useCase.execute(PLAYER_ID, 1);

    expect(result.rewardName).toBe('รางวัล A');
  });

  it('ไม่ถึง checkpoint a เคลมไม่ได้', async () => {
    const useCase = createUseCase({ score: 4999, checkpoint: CHECKPOINT_A, isClaimed: false });

    await expect(useCase.execute(PLAYER_ID, 1)).rejects.toBeInstanceOf(CheckpointLockedError);
  });

  it('เคลมไปแล้ว จะเคลมอีกไม่ได้', async () => {
    const useCase = createUseCase({ score: 9000, checkpoint: CHECKPOINT_A, isClaimed: true });

    await expect(useCase.execute(PLAYER_ID, 1)).rejects.toBeInstanceOf(RewardAlreadyClaimedError);
  });

  it('ไม่ทราบ checkpoint', async () => {
    const useCase = createUseCase({ score: 9000, checkpoint: null, isClaimed: false });

    await expect(useCase.execute(PLAYER_ID, 99)).rejects.toBeInstanceOf(CheckpointNotFoundError);
  });
});