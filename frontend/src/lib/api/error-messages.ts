import type { ApiError } from "./client";

const MESSAGES: Record<string, string> = {
  RewardAlreadyClaimedError: "คุณรับรางวัลนี้ไปแล้ว",
  CheckpointLockedError: "คะแนนยังไม่ถึงเงื่อนไขของรางวัลนี้",
  CheckpointNotFoundError: "ไม่พบรางวัลนี้",
  NetworkError: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",
};

export function getErrorMessage(error: ApiError): string {
  return MESSAGES[error.code] ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
}