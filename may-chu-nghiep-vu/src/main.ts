import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Fix: JSON.stringify không serialize được BigInt từ Prisma
// eslint-disable-next-line no-extend-native
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
