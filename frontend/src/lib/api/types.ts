import type { components } from "./schema";

type Schemas = components["schemas"];

export type PlayerStatus = Schemas["PlayerStatusResponse"];
export type Checkpoint = Schemas["CheckpointResponse"];
export type CheckpointStatus = Checkpoint["status"];
export type PlayHistoryItem = Schemas["PlayHistoryItemResponse"];
export type RewardHistoryItem = Schemas["RewardHistoryItemResponse"];
export type PlayResult = Schemas["PlayResultResponse"];
export type ClaimResult = Schemas["ClaimResultResponse"];
export type ApiErrorBody = Schemas["ErrorResponse"];