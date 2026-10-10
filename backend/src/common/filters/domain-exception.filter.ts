import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import {
  CheckpointLockedError,
  CheckpointNotFoundError,
  DomainError,
  RewardAlreadyClaimedError,
} from '../../domain/errors.js';

function statusFor(error: DomainError): HttpStatus {
  if (error instanceof CheckpointNotFoundError) return HttpStatus.NOT_FOUND;
  if (error instanceof RewardAlreadyClaimedError) return HttpStatus.CONFLICT;
  if (error instanceof CheckpointLockedError) return HttpStatus.UNPROCESSABLE_ENTITY;
  return HttpStatus.BAD_REQUEST;
}

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(error: DomainError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = statusFor(error);

    response.status(statusCode).json({
      statusCode,
      error: error.name,
      message: error.message,
    });
  }
}