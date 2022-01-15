import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
} from './constants';

const awsConfigSchema = {
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_FILE_BUCKET: Joi.string().required(),
  AWS_PRIVATE_FILE_BUCKET: Joi.string().required(),
};

const jwtConfigSchema = {
  [JWT_ACCESS_TOKEN_SECRET]: Joi.string().required(),
  [JWT_ACCESS_TOKEN_EXPIRATION_TIME]: Joi.string().required(),
  [JWT_REFRESH_TOKEN_SECRET]: Joi.string().required(),
  [JWT_REFRESH_TOKEN_EXPIRATION_TIME]: Joi.string().required(),
};

const pglConfigSchema = {
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB:
    process.env.NODE_ENV === 'production'
      ? Joi.string()
      : Joi.string().allow(''),
};

@Module({
  imports: [
    BaseConfigModule.forRoot({
      validationSchema: Joi.object({
        ...awsConfigSchema,
        ...pglConfigSchema,
        ...jwtConfigSchema,
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}

export default ConfigModule;
