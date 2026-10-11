import type { PlayResult } from "@/lib/api/types";

export const POINT_OPTIONS = [300, 500, 1000, 3000] as const satisfies readonly PlayResult["points"][];

export const ELIMINATION_STEP_MS = 600;
export const REDUCED_MOTION_STEP_MS = 150;