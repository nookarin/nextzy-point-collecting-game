export const MAX_SCORE = 10000;
export const POINT_OPTIONS = [300, 500, 1000, 3000] as const;
export type PointOption = (typeof POINT_OPTIONS)[number];

// สุ่มเลขตัวเลือกจาก POINT_OPTIONS
export function pickPoints(random: () => number = Math.random): PointOption {
  const index = Math.floor(random() * POINT_OPTIONS.length);
  return POINT_OPTIONS[index];
}

// clamp to MAX_SCORE บวกเกิน ไม่ได้
export function addToScore(current: number, points: number): number {
  return Math.min(current + points, MAX_SCORE);
}
