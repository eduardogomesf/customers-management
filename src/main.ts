import { NestFactory } from '@nestjs/core';
import * as env from 'dotenv';
import { AppModule } from './app.module';

env.config();

async function bootstrap() {
  const port = process.env.APP_PORT || 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
