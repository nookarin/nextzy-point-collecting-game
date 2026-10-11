import { apiRequest } from "./client";
import type {
  ClaimResult,
  PlayHistoryItem,
  PlayResult,
  PlayerStatus,
  RewardHistoryItem,
} from "./types";

export const playerApi = {
  getStatus: () => apiRequest<PlayerStatus>("/players/me"),
  getPlays: () => apiRequest<PlayHistoryItem[]>("/players/me/plays"),
  getRewards: () => apiRequest<RewardHistoryItem[]>("/players/me/rewards"),
  play: () => apiRequest<PlayResult>("/players/me/plays", { method: "POST" }),
  claim: (checkpointId: number) =>
    apiRequest<ClaimResult>(`/players/me/checkpoints/${checkpointId}/claim`, { method: "POST" }),
  reset: () => apiRequest<void>("/players/me/reset", { method: "POST" }),
};