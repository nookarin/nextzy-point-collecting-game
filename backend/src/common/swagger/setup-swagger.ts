import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PLAYER_ID_HEADER } from '../decorators/player-id.decorator.js';
import { PLAYER_ID_SECURITY } from './api-player-auth.decorator.js';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Nextzy Points Game API')
    .setDescription(
      'Backend API for the เกมสะสมคะแนน Nextzy assignment. ' +
        'Player endpoints require an `x-player-id` header containing a UUID.',
    )
    .setVersion('1.0.0')
    .addApiKey(
      { type: 'apiKey', in: 'header', name: PLAYER_ID_HEADER, description: 'Player UUID' },
      PLAYER_ID_SECURITY,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    ui: false,
    jsonDocumentUrl: 'api/docs-json',
  });
}