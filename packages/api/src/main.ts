import './globals';
import { AppModule } from './AppModule';
import { createDocument } from './swagger';
import { SwaggerModule } from '@nestjs/swagger';
import setupApp from './app';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = setupApp(await NestFactory.create(AppModule));
  SwaggerModule.setup('api/documentation', app, createDocument(app));
  await app.setGlobalPrefix('api').listen(3030);
}
bootstrap();
