import {
  createParamDecorator,
  ExecutionContext,
  ParseUUIDPipe,
} from '@nestjs/common';
import type { Request } from 'express';

export const PLAYER_ID_HEADER = 'x-player-id';

const PlayerIdHeader = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.header(PLAYER_ID_HEADER);
  },
);

export const PlayerId = () => PlayerIdHeader(new ParseUUIDPipe());