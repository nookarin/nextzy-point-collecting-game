export interface PlayerRecord {
  id: string;
  score: number;
}

export interface CheckpointRecord {
  id: number;
  threshold: number;
  rewardName: string;
  isClaimed: boolean;
}

export interface PlayHistoryItem {
  id: string;
  points: number;
  playedAt: Date;
}

export interface RewardHistoryItem {
  id: string;
  checkpointId: number;
  rewardName: string;
  claimedAt: Date;
}

export abstract class PlayerRepository {
  abstract findOrCreate(playerId: string): Promise<PlayerRecord>;
  abstract findCheckpoints(playerId: string): Promise<CheckpointRecord[]>;
  abstract findPlayHistory(playerId: string): Promise<PlayHistoryItem[]>;
  abstract findRewardHistory(playerId: string): Promise<RewardHistoryItem[]>;
  abstract delete(playerId: string): Promise<void>;
}