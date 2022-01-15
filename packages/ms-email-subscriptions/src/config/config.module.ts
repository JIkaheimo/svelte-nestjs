import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

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
        ...pglConfigSchema,
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}

export default ConfigModule;
