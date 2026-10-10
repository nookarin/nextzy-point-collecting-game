export type CheckpointStatus = 'locked' | 'claimable' | 'claimed';

export function getCheckpointStatus(
  score: number,
  threshold: number,
  isClaimed: boolean,
): CheckpointStatus {
  if (isClaimed) return 'claimed';
  return score >= threshold ? 'claimable' : 'locked';
}