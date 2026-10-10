import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiSecurity } from '@nestjs/swagger';
import { ErrorResponse } from './error.response.js';

export const PLAYER_ID_SECURITY = 'player-id';

export const ApiPlayerAuth = () =>
  applyDecorators(
    ApiSecurity(PLAYER_ID_SECURITY),
    ApiBadRequestResponse({
      type: ErrorResponse,
      description: 'Missing or invalid x-player-id header',
    }),
  );