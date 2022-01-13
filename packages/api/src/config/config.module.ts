import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';

const awsConfigSchema = {
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_FILE_BUCKET: Joi.string().required(),
  AWS_PRIVATE_FILE_BUCKET: Joi.string().required(),
};

const jwtConfigSchema = {
  JWT_SECRET: Joi.string().required(),
};

const pglConfigSchema = {
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: global.isProduction() ? Joi.string() : Joi.string().allow(''),
};

@Module({
  imports: [
    BaseConfigModule.forRoot({
      validationSchema: Joi.object({
        ...awsConfigSchema,
        ...pglConfigSchema,
        ...jwtConfigSchema,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}

export default ConfigModule;
