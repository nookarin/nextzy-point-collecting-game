export const CHECKPOINT_STATUSES = ['locked', 'claimable', 'claimed'] as const;
export type CheckpointStatus = (typeof CHECKPOINT_STATUSES)[number];

export function getCheckpointStatus(
  score: number,
  threshold: number,
  isClaimed: boolean,
): CheckpointStatus {
  if (isClaimed) return 'claimed';
  return score >= threshold ? 'claimable' : 'locked';
}