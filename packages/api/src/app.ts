import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from './core/pipe/validation.pipe';

export const setupApp = (app: INestApplication): INestApplication =>
  app
    .use(cookieParser())
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

export default setupApp;
