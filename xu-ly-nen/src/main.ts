import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // xu-ly-nen is a background worker, it does not need an HTTP port
  await app.init();
}
bootstrap();
