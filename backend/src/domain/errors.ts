export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class CheckpointNotFoundError extends DomainError {
  constructor(checkpointId: number) {
    super(`ไม่พบเจอ Checkpoint ${checkpointId}`);
  }
}

export class CheckpointLockedError extends DomainError {
  constructor(checkpointId: number) {
    super(`ยังไม่ถึง Checkpoint ${checkpointId}`);
  }
}

export class RewardAlreadyClaimedError extends DomainError {
  constructor(checkpointId: number) {
    super(`Checkpoint ${checkpointId} ถูกใช้ไปแล้ว`);
  }
}