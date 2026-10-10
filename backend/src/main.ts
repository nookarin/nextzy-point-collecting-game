import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PLAYER_ID_HEADER } from './common/decorators/player-id.decorator.js';
import { setupSwagger } from './common/swagger/setup-swagger.js';

console.log('[boot] main.ts loaded', {
  hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
  node: process.version,
  region: process.env.VERCEL_REGION,
});
process.on('uncaughtException', (error) => console.error('[boot] uncaughtException', error));
process.on('unhandledRejection', (error) => console.error('[boot] unhandledRejection', error));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', PLAYER_ID_HEADER],
  });
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 4000);
}
await bootstrap();