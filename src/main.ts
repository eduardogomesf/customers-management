import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIGS } from './configs/envs';

async function bootstrap() {
  const port = CONFIGS.APP.PORT || 3333;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
