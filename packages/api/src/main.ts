import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import setupApp from './app';
import { AppModule } from './app.module';
import { createDocument } from './swagger';

async function bootstrap() {
  const app = setupApp(await NestFactory.create(AppModule));
  SwaggerModule.setup('api/documentation', app, createDocument(app));
  await app.setGlobalPrefix('api').listen(3030);
}
bootstrap();
